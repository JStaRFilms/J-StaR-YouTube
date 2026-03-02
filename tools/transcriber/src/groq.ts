// src/groq.ts
// Groq Whisper API client for transcription with rate limiting and exponential backoff

import Groq from "groq-sdk";
import fs from "node:fs";
import path from "node:path";

// ============================================================================
// Constants
// ============================================================================

const MIN_DELAY_MS = 4000; // 4s baseline (safe for 20 req/min)
const MAX_BACKOFF_MS = 300000; // 5min max backoff (Groq can ask for 2-3min waits)

// ============================================================================
// Types
// ============================================================================

export type WhisperModel = "whisper-large-v3" | "whisper-large-v3-turbo";

export interface TranscribeOptions {
  model?: WhisperModel;
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
  modelsUsed: Record<WhisperModel, number>; // track usage per model
}

export interface GroqError extends Error {
  status?: number;
}

// ============================================================================
// Model Switching State
// ============================================================================

// Track which models are currently rate-limited and when they reset
const modelRateLimits: Record<
  WhisperModel,
  { limited: boolean; resetTime: number }
> = {
  "whisper-large-v3": { limited: false, resetTime: 0 },
  "whisper-large-v3-turbo": { limited: false, resetTime: 0 },
};

/**
 * Get the alternate model
 */
function getAlternateModel(model: WhisperModel): WhisperModel {
  return model === "whisper-large-v3"
    ? "whisper-large-v3-turbo"
    : "whisper-large-v3";
}

/**
 * Check if a model is currently rate limited
 */
function isModelRateLimited(model: WhisperModel): boolean {
  const limit = modelRateLimits[model];
  if (!limit.limited) return false;

  // Check if the limit has expired
  if (Date.now() >= limit.resetTime) {
    limit.limited = false;
    return false;
  }
  return true;
}

/**
 * Mark a model as rate limited for a specific duration
 */
function setModelRateLimited(model: WhisperModel, waitTimeMs: number): void {
  modelRateLimits[model] = {
    limited: true,
    resetTime: Date.now() + waitTimeMs,
  };
}

/**
 * Get the best available model (preferring current model if not limited)
 */
function getBestModel(preferredModel: WhisperModel): WhisperModel | null {
  // If preferred model is not limited, use it
  if (!isModelRateLimited(preferredModel)) {
    return preferredModel;
  }

  // Try the alternate model
  const alternate = getAlternateModel(preferredModel);
  if (!isModelRateLimited(alternate)) {
    return alternate;
  }

  // Both are limited
  return null;
}

/**
 * Get wait time until at least one model is available
 */
function getWaitTimeForAnyModel(): {
  waitTime: number;
  model: WhisperModel;
} | null {
  const now = Date.now();

  const turboReset = modelRateLimits["whisper-large-v3-turbo"].resetTime;
  const v3Reset = modelRateLimits["whisper-large-v3"].resetTime;

  // Find the model that becomes available first
  if (turboReset <= now) {
    return { waitTime: 0, model: "whisper-large-v3-turbo" };
  }
  if (v3Reset <= now) {
    return { waitTime: 0, model: "whisper-large-v3" };
  }

  // Return the one with shorter wait
  if (turboReset < v3Reset) {
    return { waitTime: turboReset - now, model: "whisper-large-v3-turbo" };
  }
  return { waitTime: v3Reset - now, model: "whisper-large-v3" };
}

/**
 * Parse wait time from Groq 429 error message
 * Example: "Please try again in 2m30.5s" -> 150500 (ms)
 */
function parseWaitTimeFromError(errorMessage: string): number | null {
  // Match patterns like "try again in 2m30.5s" or "try again in 30.5s"
  const match = errorMessage.match(
    /try again in (\d+(?:\.\d+)?)m(\d+(?:\.\d+)?)s/i,
  );
  if (match) {
    const minutes = parseFloat(match[1]);
    const seconds = parseFloat(match[2]);
    return Math.ceil((minutes * 60 + seconds) * 1000);
  }

  // Try just seconds: "try again in 30.5s"
  const secondsMatch = errorMessage.match(/try again in (\d+(?:\.\d+)?)s/i);
  if (secondsMatch) {
    return Math.ceil(parseFloat(secondsMatch[1]) * 1000);
  }

  return null;
}

/**
 * Parse audio seconds used from Groq 429 error message
 * Example: "Used 6900, Requested 601" -> { used: 6900, requested: 601 }
 */
function parseAudioUsageFromError(
  errorMessage: string,
): { used: number; requested: number } | null {
  const match = errorMessage.match(/Used (\d+).*Requested (\d+)/i);
  if (match) {
    return {
      used: parseInt(match[1], 10),
      requested: parseInt(match[2], 10),
    };
  }
  return null;
}

// ============================================================================
// State Management
// ============================================================================

let audioSecondsThisHour = 0;
let lastRequestTime = 0;

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

// ============================================================================
// Model Switching Logic
// ============================================================================

/**
 * Error thrown when we need to switch models due to rate limiting
 */
class ModelRateLimitedError extends Error {
  model: WhisperModel;
  waitTimeMs: number;

  constructor(model: WhisperModel, waitTimeMs: number) {
    super(`Model ${model} rate limited for ${waitTimeMs}ms`);
    this.model = model;
    this.waitTimeMs = waitTimeMs;
    this.name = "ModelRateLimitedError";
  }
}

/**
 * Transcribe with model switching on rate limit
 * Returns { text, model } so caller knows which model was used
 */
async function transcribeWithFallback(
  filePath: string,
  preferredModel: WhisperModel,
): Promise<{ text: string; model: WhisperModel }> {
  // Try the preferred model first
  const model = getBestModel(preferredModel);

  if (!model) {
    // Both models are rate limited, throw to signal we need to wait
    const waitInfo = getWaitTimeForAnyModel()!;
    throw new ModelRateLimitedError(waitInfo.model, waitInfo.waitTime);
  }

  try {
    const text = await transcribeChunk(filePath, model);
    return { text, model };
  } catch (error) {
    const groqError = error as GroqError;

    if (groqError.status === 429) {
      // Mark this model as rate limited
      const errorMessage = groqError.message || "";
      const waitTime = parseWaitTimeFromError(errorMessage) || 150000; // Default 2.5min
      setModelRateLimited(model, waitTime);

      // Try the alternate model
      const alternate = getAlternateModel(model);
      if (!isModelRateLimited(alternate)) {
        console.log(`   ⚡ Switching to ${alternate} (${model} rate limited)`);
        try {
          const text = await transcribeChunk(filePath, alternate);
          return { text, model: alternate };
        } catch (altError) {
          const altGroqError = altError as GroqError;
          if (altGroqError.status === 429) {
            // Alternate is also rate limited
            const altErrorMessage = altGroqError.message || "";
            const altWaitTime =
              parseWaitTimeFromError(altErrorMessage) || 150000;
            setModelRateLimited(alternate, altWaitTime);
            throw new ModelRateLimitedError(
              alternate,
              Math.max(waitTime, altWaitTime),
            );
          }
          throw altError;
        }
      }

      // Both models are now limited
      throw new ModelRateLimitedError(model, waitTime);
    }

    throw error;
  }
}

/**
 * Sleep with a visual countdown timer and progress bar
 */
async function sleepWithCountdown(ms: number, message: string): Promise<void> {
  const startTime = Date.now();
  const totalMs = ms;
  const updateInterval = 1000; // Update every second

  // Print initial message
  process.stdout.write(`\n⏳ ${message}\n`);

  while (Date.now() - startTime < totalMs) {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, totalMs - elapsed);
    const progress = elapsed / totalMs;

    // Format remaining time
    const remainingSeconds = Math.ceil(remaining / 1000);
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

    // Create progress bar
    const barWidth = 30;
    const filledWidth = Math.floor(progress * barWidth);
    const emptyWidth = barWidth - filledWidth;
    const bar = "█".repeat(filledWidth) + "░".repeat(emptyWidth);
    const percent = Math.floor(progress * 100);

    // Update the countdown line
    process.stdout.write(`\r   [${bar}] ${percent}% | ${timeStr} remaining   `);

    await sleep(updateInterval);
  }

  // Final state - complete
  const bar = "█".repeat(30);
  process.stdout.write(`\r   [${bar}] 100% | Done!           \n\n`);
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
 * Transcribe multiple audio chunks with rate limiting, progress tracking, and model switching
 *
 * @param chunkPaths - Array of paths to audio chunk files
 * @param options - Transcription options including model, language, and progress callback
 * @returns Full transcription result with text and metadata
 */
export async function transcribeAll(
  chunkPaths: string[],
  options?: TranscribeOptions,
): Promise<TranscriptionResult> {
  const preferredModel = options?.model || "whisper-large-v3-turbo";
  const onProgress = options?.onProgress;

  const result: TranscriptionResult = {
    text: "",
    chunks: [],
    totalDuration: 0,
    totalRequests: 0,
    modelsUsed: {
      "whisper-large-v3": 0,
      "whisper-large-v3-turbo": 0,
    },
  };

  const transcriptParts: string[] = [];

  for (let i = 0; i < chunkPaths.length; i++) {
    const chunkPath = chunkPaths[i];

    // Wait for rate limit (baseline 4s between requests)
    await waitForRateLimit();

    let currentModel = preferredModel;

    // Keep trying until we succeed
    while (true) {
      try {
        // Transcribe with model switching support
        const { text, model } = await transcribeWithFallback(
          chunkPath,
          currentModel,
        );
        lastRequestTime = Date.now();
        result.totalRequests++;
        result.modelsUsed[model]++;

        // Track audio duration for local reference
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

        break; // Success, exit the retry loop
      } catch (error) {
        // Handle connection errors with retry
        if (error instanceof Error) {
          const errorMessage = error.message || "";
          const isConnectionError =
            errorMessage.includes("Connection error") ||
            errorMessage.includes("ECONNRESET") ||
            errorMessage.includes("ETIMEDOUT") ||
            errorMessage.includes("fetch failed") ||
            errorMessage.includes("network");

          if (isConnectionError) {
            console.warn(`   Connection error. Retrying in 10s...`);
            await sleep(10000);
            continue;
          }
        }

        // Handle model rate limiting (both models limited)
        if (error instanceof ModelRateLimitedError) {
          const minutes = Math.floor(error.waitTimeMs / 60000);
          const seconds = Math.floor((error.waitTimeMs % 60000) / 1000);
          await sleepWithCountdown(
            error.waitTimeMs,
            `Both models rate limited. Waiting ${minutes}m ${seconds}s...`,
          );
          continue;
        }

        // Other errors - rethrow
        const message = error instanceof Error ? error.message : String(error);
        console.error(
          `Failed to transcribe chunk ${i + 1}/${chunkPaths.length}: ${chunkPath}`,
        );
        console.error(`Error: ${message}`);
        throw error;
      }
    }
  }

  // Concatenate all transcripts with space separator
  result.text = transcriptParts.join(" ");

  // Log model usage summary
  const turboCount = result.modelsUsed["whisper-large-v3-turbo"];
  const v3Count = result.modelsUsed["whisper-large-v3"];
  if (turboCount > 0 || v3Count > 0) {
    console.log(`   📊 Models used: turbo=${turboCount}, v3=${v3Count}`);
  }

  return result;
}

// ============================================================================
// Exports for Testing
// ============================================================================

export { MIN_DELAY_MS, MAX_BACKOFF_MS };
