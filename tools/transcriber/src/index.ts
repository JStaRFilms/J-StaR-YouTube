// src/index.ts
// CLI entry point for the transcriber tool
// Implemented in Task 04

import "dotenv/config";
import { Command } from "commander";
import cliProgress from "cli-progress";
import path from "path";

import {
  getMediaInfo,
  processMediaFile,
  cleanupTempFiles,
  isVideoFile,
  isAudioFile,
  ChunkInfo,
} from "./audio.js";

import { transcribeAll, TranscribeOptions } from "./groq.js";

import {
  formatDuration,
  getOutputPath,
  saveResumeState,
  loadResumeState,
  clearResumeState,
  validateInputFile,
  saveTranscript,
  printHeader,
  printSuccess,
  printInfo,
  printError,
  ResumeState,
} from "./utils.js";

// ============================================================================
// CLI Options Type
// ============================================================================

interface CLIOptions {
  output?: string;
  model: string;
  chunkDuration: number;
  language?: string;
  resume: boolean;
  noCleanup: boolean;
}

// ============================================================================
// Global State for SIGINT Handling
// ============================================================================

let currentState: ResumeState | null = null;
let currentOutputDir: string | null = null;
let isProcessing = false;

/**
 * Save state before exit on SIGINT
 */
function handleSIGINT(): void {
  if (isProcessing && currentState && currentOutputDir) {
    console.log("\n\n⚠️  Interrupted! Saving state for resume...");
    saveResumeState(currentState, currentOutputDir)
      .then(() => {
        console.log("💾 State saved. Use --resume to continue.");
        process.exit(130); // 128 + SIGINT(2)
      })
      .catch((err) => {
        console.error("Failed to save state:", err);
        process.exit(1);
      });
  } else {
    console.log("\n\nInterrupted.");
    process.exit(130);
  }
}

// Register SIGINT handler
process.on("SIGINT", handleSIGINT);

// ============================================================================
// Progress Bar
// ============================================================================

function createProgressBar(): cliProgress.SingleBar {
  return new cliProgress.SingleBar({
    format:
      "  Transcribing |{bar}| {percentage}% | Chunk {value}/{total} | ETA: {eta}s",
    barCompleteChar: "█",
    barIncompleteChar: "░",
    hideCursor: true,
  });
}

// ============================================================================
// File Processing Pipeline
// ============================================================================

/**
 * Process a single file through the transcription pipeline
 */
async function processFile(
  filePath: string,
  options: CLIOptions,
): Promise<{ success: boolean; outputPath?: string; error?: string }> {
  const absolutePath = path.resolve(filePath);
  const baseName = path.basename(absolutePath, path.extname(absolutePath));

  // Determine output directory
  const outputDir = options.output
    ? path.resolve(options.output)
    : path.join(path.dirname(absolutePath), "transcripts");

  const outputPath = getOutputPath(absolutePath, options.output);

  console.log(`\n📄 File: ${path.basename(absolutePath)}`);

  // Check if file is supported
  if (!isVideoFile(absolutePath) && !isAudioFile(absolutePath)) {
    const error = `Unsupported file format: ${path.extname(absolutePath)}`;
    printError(error);
    return { success: false, error };
  }

  // Get media info
  let mediaInfo;
  try {
    mediaInfo = await getMediaInfo(absolutePath);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    printError(msg);
    return { success: false, error: msg };
  }

  console.log(
    `   Duration: ${formatDuration(mediaInfo.duration)} | Format: ${mediaInfo.format} (${mediaInfo.isVideo ? "video" : "audio"})`,
  );

  // Estimate chunks
  const numChunks = Math.ceil(mediaInfo.duration / options.chunkDuration);
  const chunkDisplay =
    numChunks <= 1
      ? "no chunking needed"
      : `${numChunks} × ${Math.floor(options.chunkDuration / 60)}min`;
  console.log(`   Chunks: ${chunkDisplay} | Model: ${options.model}`);

  // Check for resume state
  let resumeState: ResumeState | null = null;
  if (options.resume) {
    resumeState = await loadResumeState(absolutePath, outputDir);
    if (resumeState) {
      console.log(
        `   🔄 Resuming from chunk ${resumeState.completedChunks.length + 1}/${resumeState.totalChunks}`,
      );
    }
  }

  // Set up global state for SIGINT handler
  currentOutputDir = outputDir;

  // Initialize state if not resuming
  if (!resumeState) {
    currentState = {
      inputFile: absolutePath,
      totalChunks: numChunks,
      completedChunks: [],
      partialTranscripts: {},
      chunkPaths: [],
      startedAt: new Date().toISOString(),
    };
  } else {
    currentState = resumeState;
  }

  // Process media file (extract audio, create chunks)
  let chunks: ChunkInfo[];
  let needsCleanup = false;

  try {
    printInfo("Extracting audio...");
    const result = await processMediaFile(absolutePath, outputDir);
    chunks = result.chunks;
    needsCleanup = result.needsCleanup;

    if (chunks.length > 1) {
      printSuccess(`Audio extracted (${chunks.length} chunks created)`);
    } else {
      printSuccess("Audio ready (no chunking needed)");
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    printError(`Audio processing failed: ${msg}`);
    return { success: false, error: msg };
  }

  // Update state with chunk paths
  currentState.totalChunks = chunks.length;
  currentState.chunkPaths = chunks.map((c) => c.path);

  // Filter out already-completed chunks if resuming
  const chunksToProcess = chunks.filter(
    (chunk) => !currentState!.completedChunks.includes(chunk.index),
  );

  if (chunksToProcess.length === 0) {
    printSuccess("All chunks already transcribed!");
  } else {
    // Initialize progress bar
    const progressBar = createProgressBar();
    const completedCount = currentState.completedChunks.length;
    progressBar.start(chunks.length, completedCount);

    isProcessing = true;

    // Transcribe chunks
    try {
      const transcribeOptions: TranscribeOptions = {
        model: options.model as "whisper-large-v3" | "whisper-large-v3-turbo",
        language: options.language,
        onProgress: (completed: number, total: number, chunkText: string) => {
          progressBar.update(completed);

          // Update state after each chunk
          const chunkIndex = completed - 1;
          if (!currentState!.completedChunks.includes(chunkIndex)) {
            currentState!.completedChunks.push(chunkIndex);
            currentState!.partialTranscripts[chunkIndex] = chunkText;
          }

          // Save state after each chunk for resume capability
          saveResumeState(currentState!, outputDir).catch(() => {
            // Ignore save errors during progress
          });
        },
      };

      // Get paths for chunks to process
      const chunkPathsToProcess = chunksToProcess.map((c) => c.path);

      // Transcribe
      const result = await transcribeAll(
        chunkPathsToProcess,
        transcribeOptions,
      );

      progressBar.stop();
      isProcessing = false;

      printSuccess("Transcription complete!");

      // Merge with any existing partial transcripts
      const allTranscripts: string[] = [];
      for (let i = 0; i < chunks.length; i++) {
        if (currentState!.partialTranscripts[i]) {
          allTranscripts.push(currentState!.partialTranscripts[i]);
        }
      }

      const fullTranscript = allTranscripts.join("\n\n");

      // Save transcript
      await saveTranscript(fullTranscript, outputPath);
      printSuccess(`Saved: ${outputPath}`);
    } catch (error) {
      progressBar.stop();
      isProcessing = false;

      const msg = error instanceof Error ? error.message : String(error);
      printError(`Transcription failed: ${msg}`);

      // Save state for resume
      await saveResumeState(currentState!, outputDir);
      console.log("💾 State saved. Use --resume to continue.");

      return { success: false, error: msg };
    }
  }

  // Clean up temp files
  if (!options.noCleanup && needsCleanup) {
    printInfo("Cleaning up temp files...");
    await cleanupTempFiles(outputDir, baseName);
    printSuccess("Temp files cleaned up");
  }

  // Clear resume state on successful completion
  await clearResumeState(absolutePath, outputDir);
  currentState = null;
  currentOutputDir = null;

  return { success: true, outputPath };
}

// ============================================================================
// Main Entry Point
// ============================================================================

async function main(): Promise<void> {
  const program = new Command();

  program
    .name("transcribe")
    .description("Transcribe audio/video files using Groq Whisper API")
    .version("1.0.0")
    .argument("<files...>", "Audio or video file paths to transcribe")
    .option(
      "-o, --output <dir>",
      "Output directory (default: transcripts/ next to source)",
    )
    .option("-m, --model <model>", "Whisper model", "whisper-large-v3-turbo")
    .option(
      "--chunk-duration <sec>",
      "Chunk duration in seconds",
      (value) => parseInt(value, 10),
      600,
    )
    .option(
      "--language <lang>",
      "Language code, e.g. 'en' (default: auto-detect)",
    )
    .option("--resume", "Resume from last saved state", false)
    .option("--no-cleanup", "Keep temp files after completion", false)
    .action(async (files: string[], options: CLIOptions) => {
      printHeader("🎙️  Groq Whisper Transcriber");

      // Check for GROQ_API_KEY
      if (!process.env.GROQ_API_KEY) {
        printError("GROQ_API_KEY environment variable is not set.");
        console.log(
          "Please set it in your environment or create a .env file with: GROQ_API_KEY=your_key_here",
        );
        process.exit(1);
      }

      // Validate files exist
      const validFiles: string[] = [];
      for (const file of files) {
        try {
          const absolutePath = await validateInputFile(file);
          validFiles.push(absolutePath);
        } catch (error) {
          printError(`File not found: ${file}`);
        }
      }

      if (validFiles.length === 0) {
        printError("No valid files to process.");
        process.exit(1);
      }

      // Process each file
      let successCount = 0;
      let failCount = 0;

      for (const file of validFiles) {
        try {
          const result = await processFile(file, options);
          if (result.success) {
            successCount++;
          } else {
            failCount++;
          }
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          printError(`Unexpected error processing ${file}: ${msg}`);
          failCount++;
        }
      }

      // Summary
      console.log("\n" + "━".repeat(30));
      console.log(
        `✅ All files processed (${successCount}/${validFiles.length})`,
      );

      if (failCount > 0) {
        console.log(`❌ Failed: ${failCount}`);
        process.exit(1);
      }
    });

  await program.parseAsync();
}

// Run main
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
