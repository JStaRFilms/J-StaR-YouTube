// src/groq.ts
// Groq Whisper API client for transcription with rate limiting and exponential backoff

import Groq from "groq-sdk";
import fs from "node:fs";
import path from "node:path";

// ============================================================================
// Constants
// ============================================================================

const MIN_DELAY_MS = 4000; // 4s baseline (safe for 20 req/min)
const MAX_BACKOFF_MS = 16000; // 16s max backoff
const HOURLY_AUDIO_LIMIT = 7200; // seconds (2 hours)
const AUDIO_LIMIT_THRESHOLD = 0.95; // Pause at 95% of limit

// ============================================================================
// Types
// ============================================================================

export interface TranscribeOptions {
  model?: "whisper-large-v3" | "whisper-large-v3-turbo";
  language?: string;
  onProgress?: (completed: number, total: number, chunkText: string) => void;
}

export interface TranscriptionResult {
  text: string; // full concatenated transcript
  chunks: {
    index: number;
    text: string;
    audioFile: string;
  }[];
  totalDuration: number; // audio seconds processed
  totalRequests: number;
}

export interface GroqError extends Error {
  status?: number;
}

// ============================================================================
// State Management
// ============================================================================

let audioSecondsThisHour = 0;
let hourStartTime = Date.now();
let lastRequestTime = 0;

/**
 * Reset the hourly tracking state (useful for testing)
 */
export function resetHourlyTracking(): void {
  audioSecondsThisHour = 0;
  hourStartTime = Date.now();
  lastRequestTime = 0;
}

/**
 * Get current audio seconds consumed this hour
 */
export function getAudioSecondsThisHour(): number {
  return audioSecondsThisHour;
}

// ============================================================================
// Groq Client Initialization
// ============================================================================

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (groqClient) {
    return groqClient;
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not set. " +
        "Please set it in your environment or create a .env file with: GROQ_API_KEY=your_key_here",
    );
  }

  groqClient = new Groq({ apiKey });
  return groqClient;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Sleep for a specified number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if hour window has reset and update state accordingly
 */
function checkHourWindow(): void {
  const now = Date.now();
  const hourElapsed = now - hourStartTime >= 3600000; // 1 hour in ms

  if (hourElapsed) {
    audioSecondsThisHour = 0;
    hourStartTime = now;
  }
}

/**
 * Wait until safe to make next request (rate limiting)
 */
async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_DELAY_MS) {
    await sleep(MIN_DELAY_MS - timeSinceLastRequest);
  }
}

/**
 * Get audio duration in seconds using ffprobe
 * Falls back to a reasonable estimate if duration cannot be determined
 */
async function getAudioDuration(filePath: string): Promise<number> {
  const { exec } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const execAsync = promisify(exec);

  try {
    const { stdout } = await execAsync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`,
    );
    return parseFloat(stdout.trim()) || 0;
  } catch {
    // If ffprobe fails, return 0 and let the limit tracking be approximate
    console.warn(
      `Could not determine duration for ${filePath}, limit tracking may be approximate`,
    );
    return 0;
  }
}

// ============================================================================
// Exponential Backoff with Retry
// ============================================================================

/**
 * Execute a function with exponential backoff retry on 429 errors
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 4,
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const groqError = error as GroqError;

      if (groqError.status === 429 && attempt < maxRetries) {
        const delay = Math.min(2000 * Math.pow(2, attempt), MAX_BACKOFF_MS);
        const jitter = Math.random() * 1000;
        console.warn(
          `Rate limited (429). Retrying in ${((delay + jitter) / 1000).toFixed(1)}s... (attempt ${attempt + 1}/${maxRetries})`,
        );
        await sleep(delay + jitter);
        continue;
      }

      throw error;
    }
  }

  // This should never be reached due to the throw in the catch block
  throw new Error("Max retries exceeded");
}

// ============================================================================
// Core Transcription Functions
// ============================================================================

/**
 * Transcribe a single audio chunk using Groq Whisper API
 *
 * @param filePath - Path to the audio file
 * @param model - Whisper model to use (default: whisper-large-v3-turbo)
 * @returns The transcribed text
 * @throws Error if API key is not set or transcription fails
 */
export async function transcribeChunk(
  filePath: string,
  model: string = "whisper-large-v3-turbo",
): Promise<string> {
  const groq = getGroqClient();

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`Audio file not found: ${filePath}`);
  }

  // Create transcription request
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: model,
    response_format: "verbose_json",
    language: "en",
  });

  return transcription.text;
}

/**
 * Transcribe multiple audio chunks with rate limiting and progress tracking
 *
 * @param chunkPaths - Array of paths to audio chunk files
 * @param options - Transcription options including model, language, and progress callback
 * @returns Full transcription result with text and metadata
 */
export async function transcribeAll(
  chunkPaths: string[],
  options?: TranscribeOptions,
): Promise<TranscriptionResult> {
  const model = options?.model || "whisper-large-v3-turbo";
  const onProgress = options?.onProgress;

  const result: TranscriptionResult = {
    text: "",
    chunks: [],
    totalDuration: 0,
    totalRequests: 0,
  };

  const transcriptParts: string[] = [];

  for (let i = 0; i < chunkPaths.length; i++) {
    const chunkPath = chunkPaths[i];

    // Check hour window and reset if needed
    checkHourWindow();

    // Check if approaching hourly limit
    if (audioSecondsThisHour >= HOURLY_AUDIO_LIMIT * AUDIO_LIMIT_THRESHOLD) {
      const remainingTime = 3600000 - (Date.now() - hourStartTime);
      const remainingMinutes = Math.ceil(remainingTime / 60000);
      console.warn(
        `Approaching hourly audio limit (${Math.round(audioSecondsThisHour)}s processed). Pausing for ${remainingMinutes} minute(s)...`,
      );
      await sleep(remainingTime);
      audioSecondsThisHour = 0;
      hourStartTime = Date.now();
    }

    // Wait for rate limit
    await waitForRateLimit();

    try {
      // Transcribe with retry
      const text = await withRetry(() => transcribeChunk(chunkPath, model));
      lastRequestTime = Date.now();
      result.totalRequests++;

      // Track audio duration
      const duration = await getAudioDuration(chunkPath);
      audioSecondsThisHour += duration;
      result.totalDuration += duration;

      // Store chunk result
      const chunkResult = {
        index: i,
        text: text.trim(),
        audioFile: path.basename(chunkPath),
      };
      result.chunks.push(chunkResult);
      transcriptParts.push(text.trim());

      // Update progress
      if (onProgress) {
        onProgress(i + 1, chunkPaths.length, text.trim());
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `Failed to transcribe chunk ${i + 1}/${chunkPaths.length}: ${chunkPath}`,
      );
      console.error(`Error: ${message}`);
      throw error;
    }
  }

  // Concatenate all transcripts with space separator
  result.text = transcriptParts.join(" ");

  return result;
}

// ============================================================================
// Exports for Testing
// ============================================================================

export {
  MIN_DELAY_MS,
  MAX_BACKOFF_MS,
  HOURLY_AUDIO_LIMIT,
  AUDIO_LIMIT_THRESHOLD,
};
