// src/utils.ts
// Shared utilities for the transcriber tool
// Implemented in Tasks 02-04

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { createInterface } from "readline";

// ============================================================================
// Types
// ============================================================================

export interface ResumeState {
  inputFile: string;
  totalChunks: number;
  completedChunks: number[];
  partialTranscripts: Record<number, string>; // index → text
  chunkPaths: string[];
  startedAt: string;
}

export type FileStatus = "completed" | "failed" | "interrupted" | "in_progress";

export interface FileHistoryEntry {
  inputFile: string;
  status: FileStatus;
  outputPath: string;
  completedAt?: string;
  startedAt: string;
  fileSize: number;
  fileModified: string;
  errorMessage?: string;
}

export interface TranscriberHistory {
  version: number;
  lastUpdated: string;
  files: Record<string, FileHistoryEntry>;
}

// ============================================================================
// Constants
// ============================================================================

const HISTORY_VERSION = 1;
const HISTORY_FILE_NAME = ".transcriber-history.json";

// ============================================================================
// Duration Formatting
// ============================================================================

/**
 * Format seconds as HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// ============================================================================
// Directory Management
// ============================================================================

/**
 * Ensure a directory exists, creating it if necessary
 */
export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
}

/**
 * Get the path to the centralized history file
 * Located in the transcriber tool's data directory
 */
function getHistoryFilePath(): string {
  // Store in the transcriber's data directory
  const toolDir = path.resolve(process.cwd(), "tools", "transcriber");
  const dataDir = path.join(toolDir, "data");
  return path.join(dataDir, HISTORY_FILE_NAME);
}

/**
 * Load the transcriber history from disk
 */
export async function loadHistory(): Promise<TranscriberHistory> {
  const historyPath = getHistoryFilePath();

  try {
    const content = await fs.readFile(historyPath, "utf-8");
    const history = JSON.parse(content) as TranscriberHistory;

    // Migrate if needed (future versions)
    if (history.version !== HISTORY_VERSION) {
      // Handle migrations here in the future
    }

    return history;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // Return empty history
      return {
        version: HISTORY_VERSION,
        lastUpdated: new Date().toISOString(),
        files: {},
      };
    }
    throw error;
  }
}

/**
 * Save the transcriber history to disk
 */
export async function saveHistory(history: TranscriberHistory): Promise<void> {
  const historyPath = getHistoryFilePath();
  const dataDir = path.dirname(historyPath);

  await ensureDir(dataDir);
  history.lastUpdated = new Date().toISOString();
  await fs.writeFile(historyPath, JSON.stringify(history, null, 2), "utf-8");
}

/**
 * Generate a unique key for a file (based on absolute path + size + modified time)
 */
async function getFileKey(inputPath: string): Promise<string> {
  const absPath = path.resolve(inputPath);
  const hash = crypto
    .createHash("md5")
    .update(absPath)
    .digest("hex")
    .slice(0, 16);
  return hash;
}

/**
 * Get file metadata for history entry
 */
async function getFileMetadata(
  inputPath: string,
): Promise<{ size: number; modified: string }> {
  try {
    const stats = await fs.stat(inputPath);
    return {
      size: stats.size,
      modified: stats.mtime.toISOString(),
    };
  } catch {
    return { size: 0, modified: "" };
  }
}

/**
 * Get history entry for a file
 */
export async function getFileHistory(
  inputPath: string,
): Promise<FileHistoryEntry | null> {
  const history = await loadHistory();
  const key = await getFileKey(inputPath);
  return history.files[key] || null;
}

/**
 * Check if a file has already been transcribed (completed status)
 */
export async function isFileCompleted(inputPath: string): Promise<boolean> {
  const entry = await getFileHistory(inputPath);
  return entry?.status === "completed";
}

/**
 * Update history entry for a file
 */
export async function updateFileHistory(
  inputPath: string,
  status: FileStatus,
  outputPath: string,
  errorMessage?: string,
): Promise<void> {
  const history = await loadHistory();
  const key = await getFileKey(inputPath);
  const metadata = await getFileMetadata(inputPath);

  const existing = history.files[key];

  history.files[key] = {
    inputFile: path.resolve(inputPath),
    status,
    outputPath,
    startedAt: existing?.startedAt || new Date().toISOString(),
    completedAt:
      status === "completed" ? new Date().toISOString() : existing?.completedAt,
    fileSize: metadata.size,
    fileModified: metadata.modified,
    errorMessage: status === "failed" ? errorMessage : undefined,
  };

  await saveHistory(history);
}

/**
 * Prompt user to confirm re-transcription of already completed file
 */
export async function promptReTranscribe(inputPath: string): Promise<boolean> {
  const entry = await getFileHistory(inputPath);

  if (!entry || entry.status !== "completed") {
    return true; // No history, allow transcription
  }

  const completedDate = new Date(entry.completedAt!).toLocaleDateString();

  console.log(`\n⚠️  This file was already transcribed on ${completedDate}`);
  console.log(`   Output: ${entry.outputPath}`);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("\n   Re-transcribe anyway? (y/N): ", (answer) => {
      rl.close();
      const confirm = answer.toLowerCase().trim() === "y";
      if (!confirm) {
        console.log("   Skipping file.");
      }
      resolve(confirm);
    });
  });
}

// ============================================================================
// Output Path Generation
// ============================================================================

/**
 * Generate output file path for transcript
 *
 * Default behavior: creates transcripts/ folder next to source file
 * With --output flag: uses specified output directory
 */
export function getOutputPath(inputPath: string, outputDir?: string): string {
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const dir = outputDir || path.join(path.dirname(inputPath), "transcripts");
  return path.join(dir, `${baseName}_transcript.txt`);
}

// ============================================================================
// Resume State Management
// ============================================================================

/**
 * Generate a unique state filename for an input file
 */
function getStateFileName(inputPath: string): string {
  // Use a hash of the absolute path to create a unique but consistent filename
  const absPath = path.resolve(inputPath);
  const hash = crypto
    .createHash("md5")
    .update(absPath)
    .digest("hex")
    .slice(0, 8);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  // Sanitize basename for filesystem
  const safeBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50);
  return `.transcriber-state-${safeBaseName}-${hash}.json`;
}

/**
 * Save resume state to a file
 */
export async function saveResumeState(
  state: ResumeState,
  outputDir: string,
): Promise<void> {
  const stateFileName = getStateFileName(state.inputFile);
  const statePath = path.join(outputDir, stateFileName);
  await ensureDir(outputDir);
  await fs.writeFile(statePath, JSON.stringify(state, null, 2), "utf-8");
}

/**
 * Load resume state from a file
 * Returns null if no state file exists
 */
export async function loadResumeState(
  inputPath: string,
  outputDir: string,
): Promise<ResumeState | null> {
  const stateFileName = getStateFileName(inputPath);
  const statePath = path.join(outputDir, stateFileName);

  try {
    const content = await fs.readFile(statePath, "utf-8");
    return JSON.parse(content) as ResumeState;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

/**
 * Clear (delete) resume state file
 */
export async function clearResumeState(
  inputPath: string,
  outputDir: string,
): Promise<void> {
  const stateFileName = getStateFileName(inputPath);
  const statePath = path.join(outputDir, stateFileName);

  try {
    await fs.unlink(statePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
    // File doesn't exist, that's fine
  }
}

// ============================================================================
// Temp File Cleanup
// ============================================================================

/**
 * Clean up temp directory recursively
 */
export async function cleanupTemp(tempDir: string): Promise<void> {
  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch (error) {
    // Ignore errors during cleanup - temp files may not exist
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      // Log but don't throw - cleanup failures shouldn't break the workflow
      console.warn(`Warning: Could not clean up temp directory: ${tempDir}`);
    }
  }
}

// ============================================================================
// File Validation
// ============================================================================

/**
 * Check if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate that a file exists and is readable
 */
export async function validateInputFile(filePath: string): Promise<string> {
  const absolutePath = path.resolve(filePath);

  try {
    await fs.access(absolutePath, fs.constants.R_OK);
  } catch {
    throw new Error(`File not found or not readable: ${filePath}`);
  }

  return absolutePath;
}

// ============================================================================
// Transcript Output
// ============================================================================

/**
 * Save transcript to a text file
 */
export async function saveTranscript(
  transcript: string,
  outputPath: string,
): Promise<void> {
  const dir = path.dirname(outputPath);
  await ensureDir(dir);
  await fs.writeFile(outputPath, transcript, "utf-8");
}

// ============================================================================
// Console Output Helpers
// ============================================================================

/**
 * Print a section header
 */
export function printHeader(title: string): void {
  console.log("");
  console.log(title);
  console.log("━".repeat(30));
}

/**
 * Print a success message with checkmark
 */
export function printSuccess(message: string): void {
  console.log(`✅ ${message}`);
}

/**
 * Print an info/progress message
 */
export function printInfo(message: string): void {
  console.log(`⏳ ${message}`);
}

/**
 * Print an error message
 */
export function printError(message: string): void {
  console.error(`❌ ${message}`);
}
