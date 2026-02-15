// src/audio.ts
// Audio extraction and chunking using ffmpeg
// Implemented in Task 02

import { execFile } from "child_process";
import { promisify } from "util";
import { promises as fs } from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

// ============================================================================
// Constants
// ============================================================================

export const CHUNK_DURATION_SEC = 600; // 10 minutes
export const OVERLAP_SEC = 1; // 1-second overlap
export const AUDIO_BITRATE = "128k";
export const AUDIO_CHANNELS = 1; // mono
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB Groq limit
export const TEMP_DIR_NAME = ".transcriber-temp";

export const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mov",
  ".avi",
  ".mkv",
  ".flv",
  ".wmv",
  ".webm",
  ".m4v",
  ".mpg",
  ".mpeg",
];

export const AUDIO_EXTENSIONS = [
  ".mp3",
  ".wav",
  ".m4a",
  ".aac",
  ".ogg",
  ".flac",
  ".wma",
  ".opus",
];

// ============================================================================
// Types
// ============================================================================

export interface MediaInfo {
  duration: number; // seconds
  format: string; // e.g., 'mp4', 'mp3'
  isVideo: boolean;
}

export interface ChunkInfo {
  path: string; // absolute path to chunk file
  index: number; // 0-based
  startTime: number; // seconds
  duration: number; // seconds
}

export class AudioError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error,
  ) {
    super(message);
    this.name = "AudioError";
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a file is a video based on its extension
 */
export function isVideoFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}

/**
 * Check if a file is an audio based on its extension
 */
export function isAudioFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return AUDIO_EXTENSIONS.includes(ext);
}

/**
 * Get the file extension without the dot
 */
function getFormat(filePath: string): string {
  return path.extname(filePath).toLowerCase().slice(1);
}

/**
 * Ensure a directory exists, creating it if necessary
 */
async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

/**
 * Get file size in bytes
 */
async function getFileSize(filePath: string): Promise<number> {
  const stats = await fs.stat(filePath);
  return stats.size;
}

// ============================================================================
// Core Functions
// ============================================================================

/**
 * Get media information using ffprobe
 * Returns duration, format, and whether it's a video file
 */
export async function getMediaInfo(filePath: string): Promise<MediaInfo> {
  // Check file exists
  try {
    await fs.access(filePath);
  } catch {
    throw new AudioError(`File not found: ${filePath}`);
  }

  const isVideo = isVideoFile(filePath);
  const format = getFormat(filePath);

  // Use ffprobe to get duration
  try {
    const { stdout } = await execFileAsync("ffprobe", [
      "-v",
      "quiet",
      "-show_entries",
      "format=duration",
      "-of",
      "csv=p=0",
      filePath,
    ]);

    const duration = parseFloat(stdout.trim());

    if (isNaN(duration) || duration <= 0) {
      throw new AudioError(`Could not determine duration for: ${filePath}`);
    }

    return {
      duration,
      format,
      isVideo,
    };
  } catch (error) {
    if (error instanceof AudioError) {
      throw error;
    }
    throw new AudioError(
      `ffprobe failed for ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
      error instanceof Error ? error : undefined,
    );
  }
}

/**
 * Extract audio from video file to MP3 format
 * Converts to mono 128kbps MP3
 *
 * @param inputPath - Path to the input video file
 * @param outputDir - Directory to store the output audio
 * @returns Path to the extracted audio file
 */
export async function extractAudio(
  inputPath: string,
  outputDir: string,
): Promise<string> {
  // Check file exists
  try {
    await fs.access(inputPath);
  } catch {
    throw new AudioError(`Input file not found: ${inputPath}`);
  }

  // Create temp directory structure
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const tempDir = path.join(outputDir, TEMP_DIR_NAME, baseName);
  await ensureDir(tempDir);

  const outputPath = path.join(tempDir, `${baseName}.mp3`);

  // Check if file is already a small audio file that doesn't need processing
  if (isAudioFile(inputPath)) {
    const mediaInfo = await getMediaInfo(inputPath);
    const fileSize = await getFileSize(inputPath);

    // If it's already small enough and short enough, just copy it
    if (
      fileSize <= MAX_FILE_SIZE_BYTES &&
      mediaInfo.duration <= CHUNK_DURATION_SEC
    ) {
      // For MP3 files, just return the original path (no extraction needed)
      if (getFormat(inputPath) === "mp3") {
        return inputPath;
      }
      // For other audio formats, still need to convert to MP3
    }
  }

  // Extract audio using ffmpeg
  try {
    await execFileAsync("ffmpeg", [
      "-i",
      inputPath,
      "-vn", // No video
      "-ac",
      String(AUDIO_CHANNELS), // Mono
      "-ab",
      AUDIO_BITRATE, // 128kbps
      "-f",
      "mp3", // Output format
      "-y", // Overwrite output
      outputPath,
    ]);

    return outputPath;
  } catch (error) {
    throw new AudioError(
      `ffmpeg audio extraction failed for ${inputPath}: ${error instanceof Error ? error.message : String(error)}`,
      error instanceof Error ? error : undefined,
    );
  }
}

/**
 * Split an audio file into overlapping chunks
 * Each chunk has 1 second of overlap with the previous chunk
 *
 * @param audioPath - Path to the audio file to split
 * @param outputDir - Directory to store the chunks
 * @param chunkDurationSec - Duration of each chunk in seconds (default: 600 = 10 min)
 * @returns Array of ChunkInfo objects with path, index, startTime, and duration
 */
export async function splitIntoChunks(
  audioPath: string,
  outputDir: string,
  chunkDurationSec: number = CHUNK_DURATION_SEC,
): Promise<ChunkInfo[]> {
  // Check file exists
  try {
    await fs.access(audioPath);
  } catch {
    throw new AudioError(`Audio file not found: ${audioPath}`);
  }

  // Get audio info
  const mediaInfo = await getMediaInfo(audioPath);
  const totalDuration = mediaInfo.duration;

  // If audio is shorter than chunk duration, no need to split
  if (totalDuration <= chunkDurationSec) {
    return [
      {
        path: path.resolve(audioPath),
        index: 0,
        startTime: 0,
        duration: totalDuration,
      },
    ];
  }

  // Create temp directory for chunks
  const baseName = path.basename(audioPath, path.extname(audioPath));
  const tempDir = path.join(outputDir, TEMP_DIR_NAME, baseName, "chunks");
  await ensureDir(tempDir);

  const chunks: ChunkInfo[] = [];
  const chunkDurationWithOverlap = chunkDurationSec + OVERLAP_SEC;

  // Calculate number of chunks needed
  const numChunks = Math.ceil(totalDuration / chunkDurationSec);

  for (let i = 0; i < numChunks; i++) {
    const startTime = i * chunkDurationSec;
    const chunkPath = path.join(
      tempDir,
      `chunk_${String(i).padStart(3, "0")}.mp3`,
    );

    // Calculate duration for this chunk
    // Last chunk may be shorter
    const remainingDuration = totalDuration - startTime;
    const chunkDuration = Math.min(chunkDurationWithOverlap, remainingDuration);

    try {
      await execFileAsync("ffmpeg", [
        "-i",
        audioPath,
        "-ss",
        String(startTime),
        "-t",
        String(chunkDuration),
        "-c",
        "copy", // Stream copy (fast, no re-encoding)
        "-y", // Overwrite output
        chunkPath,
      ]);

      chunks.push({
        path: path.resolve(chunkPath),
        index: i,
        startTime,
        duration: chunkDuration,
      });
    } catch (error) {
      throw new AudioError(
        `ffmpeg chunking failed at chunk ${i} for ${audioPath}: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error : undefined,
      );
    }
  }

  // Sort by index (should already be sorted, but ensure consistency)
  return chunks.sort((a, b) => a.index - b.index);
}

/**
 * Clean up temporary files created during processing
 * Removes the .transcriber-temp directory for a given base file
 * Also removes the parent .transcriber-temp directory if it becomes empty
 */
export async function cleanupTempFiles(
  outputDir: string,
  baseFileName: string,
): Promise<void> {
  const tempDir = path.join(outputDir, TEMP_DIR_NAME, baseFileName);
  const parentTempDir = path.join(outputDir, TEMP_DIR_NAME);

  try {
    // Remove the specific file's temp directory
    await fs.rm(tempDir, { recursive: true, force: true });

    // Check if parent .transcriber-temp is now empty, and remove it if so
    try {
      const remainingEntries = await fs.readdir(parentTempDir);
      if (remainingEntries.length === 0) {
        await fs.rmdir(parentTempDir);
      }
    } catch {
      // Parent directory doesn't exist or can't be read - that's fine
    }
  } catch {
    // Ignore errors during cleanup
  }
}

/**
 * Process a media file for transcription
 * Handles video extraction and chunking as needed
 * Returns array of chunk paths ready for transcription
 */
export async function processMediaFile(
  inputPath: string,
  outputDir: string,
): Promise<{ chunks: ChunkInfo[]; needsCleanup: boolean }> {
  const mediaInfo = await getMediaInfo(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));

  let audioPath: string;
  let needsCleanup = false;

  // Check if file needs audio extraction
  if (mediaInfo.isVideo) {
    // Extract audio from video
    audioPath = await extractAudio(inputPath, outputDir);
    needsCleanup = true;
  } else if (isAudioFile(inputPath)) {
    const fileSize = await getFileSize(inputPath);

    // Check if audio needs conversion or is ready to use
    if (
      getFormat(inputPath) === "mp3" &&
      fileSize <= MAX_FILE_SIZE_BYTES &&
      mediaInfo.duration <= CHUNK_DURATION_SEC
    ) {
      // File is ready to use as-is
      return {
        chunks: [
          {
            path: path.resolve(inputPath),
            index: 0,
            startTime: 0,
            duration: mediaInfo.duration,
          },
        ],
        needsCleanup: false,
      };
    }

    // Need to convert or the file is large
    if (
      fileSize > MAX_FILE_SIZE_BYTES ||
      mediaInfo.duration > CHUNK_DURATION_SEC
    ) {
      // Large audio file - might still need to convert for consistent format
      audioPath = await extractAudio(inputPath, outputDir);
      needsCleanup = true;
    } else {
      // Small non-mp3 audio - convert to mp3
      audioPath = await extractAudio(inputPath, outputDir);
      needsCleanup = true;
    }
  } else {
    throw new AudioError(`Unsupported file format: ${inputPath}`);
  }

  // Split into chunks if needed
  const chunks = await splitIntoChunks(audioPath, outputDir);

  return { chunks, needsCleanup };
}
