// src/utils.ts
// Shared utilities for the transcriber tool
// Implemented in Tasks 02-04

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

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
