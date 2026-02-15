# Task: CLI Entry Point & Orchestration

**Session ID:** orch-20260215-transcriber  
**Priority:** P0  
**Dependencies:** Tasks 02 (Audio) and 03 (Groq)  
**Assigned To:** /mode-code

---

## 📋 Objective

Implement `src/index.ts` (CLI) and `src/utils.ts` (helpers) — the main entry point that ties audio extraction, chunking, and transcription together with progress tracking and resume support.

## 🎯 Scope

**In Scope:**

- CLI argument parsing with `commander`
- Process pipeline: probe → extract → chunk → transcribe → save
- Progress bar using `cli-progress`
- Resume support: save/load partial state as `.transcriber-state.json`
- Batch file processing (multiple inputs)
- Output file naming and directory handling
- Temp file cleanup on completion + on error (graceful)
- Console logging with clear status messages

**Out of Scope:**

- Audio extraction logic (Task 02, already implemented)
- Groq API logic (Task 03, already implemented)

## 📚 Context

### CLI Interface

```
Usage: transcribe [options] <files...>

Transcribe audio/video files using Groq Whisper API

Arguments:
  files                    Audio or video file paths to transcribe

Options:
  -o, --output <dir>       Output directory (default: "transcripts/" next to source)
  -m, --model <model>      Whisper model (default: "whisper-large-v3-turbo")
  --chunk-duration <sec>   Chunk duration in seconds (default: 600)
  --language <lang>        Language code, e.g. "en" (default: auto-detect)
  --resume                 Resume from last saved state
  --no-cleanup             Keep temp files after completion
  -h, --help               Show help
```

### Pipeline Per File

```typescript
async function processFile(
  filePath: string,
  options: CLIOptions,
): Promise<void> {
  // 1. Validate file exists
  // 2. Get media info (duration, format)
  // 3. Determine output path
  // 4. Check for resume state → skip completed chunks
  // 5. Extract audio if video file
  // 6. Split into chunks if needed
  // 7. Initialize progress bar
  // 8. Transcribe chunks with progress callback
  // 9. Save transcript to .txt
  // 10. Clean up temp files
  // 11. Remove resume state file
}
```

### Progress Bar

```typescript
import cliProgress from "cli-progress";

const bar = new cliProgress.SingleBar({
  format:
    "  Transcribing |{bar}| {percentage}% | Chunk {value}/{total} | ETA: {eta}s",
  barCompleteChar: "█",
  barIncompleteChar: "░",
  hideCursor: true,
});
```

### Resume State File

Save after each chunk completes: `{outputDir}/.transcriber-state-{filename}.json`

```typescript
interface ResumeState {
  inputFile: string;
  totalChunks: number;
  completedChunks: number[];
  partialTranscripts: Record<number, string>; // index → text
  chunkPaths: string[];
  startedAt: string;
}
```

On resume:

1. Load state file
2. Skip already-completed chunk indices
3. Continue from where we left off
4. Delete state file when fully complete

### Output File Naming

```
Input:  C:\...\2026-02-06_Feb_1st_Vid\01_Footage\A-Roll\Full uncut.mp4
Output: C:\...\2026-02-06_Feb_1st_Vid\01_Footage\A-Roll\transcripts\Full uncut_transcript.txt

# Or with --output flag:
Output: <output-dir>\Full uncut_transcript.txt
```

### Console Output Example

```
🎙️  Groq Whisper Transcriber
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 File: Full uncut.mp4
   Duration: 1:26:30 | Format: mp4 (video)
   Chunks: 9 × 10min | Model: whisper-large-v3-turbo

⏳ Extracting audio...
✅ Audio extracted (128kbps mono mp3)

⏳ Splitting into 9 chunks...
✅ Chunks created

  Transcribing |████████░░░░░░░░| 50% | Chunk 5/9 | ETA: 18s

✅ Transcription complete!
📝 Saved: transcripts/Full uncut_transcript.txt
🧹 Temp files cleaned up

━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All files processed (1/1)
```

### utils.ts Functions

```typescript
// Format seconds as HH:MM:SS
export function formatDuration(seconds: number): string;

// Ensure directory exists
export function ensureDir(dirPath: string): Promise<void>;

// Generate output file path
export function getOutputPath(inputPath: string, outputDir?: string): string;

// Save/load resume state
export function saveResumeState(
  state: ResumeState,
  outputDir: string,
): Promise<void>;
export function loadResumeState(
  inputPath: string,
  outputDir: string,
): Promise<ResumeState | null>;
export function clearResumeState(
  inputPath: string,
  outputDir: string,
): Promise<void>;

// Clean up temp directory
export function cleanupTemp(tempDir: string): Promise<void>;
```

## ✅ Definition of Done

- [x] CLI parses all documented options correctly
- [x] `--help` shows usage information
- [x] Single file transcription works end-to-end
- [x] Multiple files are processed sequentially
- [x] Progress bar updates after each chunk
- [x] Resume state is saved after each chunk
- [x] `--resume` flag loads state and skips completed chunks
- [x] Output `.txt` file is created with correct naming
- [x] Temp files are cleaned up (unless `--no-cleanup`)
- [x] Graceful error handling with clear messages
- [x] `npx tsc --noEmit` passes

## 📁 Expected Artifacts

| File                             | Purpose                            |
| -------------------------------- | ---------------------------------- |
| `tools/transcriber/src/index.ts` | CLI entry + pipeline orchestration |
| `tools/transcriber/src/utils.ts` | Helper functions                   |

## 🚫 Constraints

- Load `.env` using `dotenv/config` at the top of `index.ts`
- Handle `SIGINT` gracefully (save state before exiting)
- Windows path compatibility throughout

---

_Generated by /mode-orchestrator — Session: orch-20260215-transcriber_
