# Groq Whisper Transcriber

A powerful CLI tool for transcribing audio and video files using Groq's Whisper API. Features smart chunking, rate limiting, progress tracking, and resume capability.

## Features

- 🎥 **Video Support**: Extracts audio from video files (mp4, mov, mkv, etc.)
- 🧩 **Smart Chunking**: Splits large files into 10-minute chunks with overlap
- ⚡ **Groq Whisper API**: derived from OpenAI's Whisper (large-v3-turbo model)
- 🔄 **Resume Capability**: Interrupted? Just run again with `--resume`
- 🛑 **Rate Limit Handling**: Auto-pauses and retries on API limits
- 📊 **Progress Bar**: Real-time status of chunk processing

## Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set API Key**:
   Create a `.env` file in `tools/transcriber/` (or check `.env.example`):
   ```
   GROQ_API_KEY=your_key_here
   ```

## Usage

### Run via pnpm (from root)

```bash
# Transcribe a single file
pnpm transcribe "path/to/video.mp4"

# Transcribe multiple files
pnpm transcribe "video1.mp4" "audio2.mp3"
```

### Options

| Option | Description | Default |
|---|---|---|
| `-o, --output <dir>` | Output directory for transcripts | `transcripts/` next to input |
| `-m, --model <id>` | Whisper model ID | `whisper-large-v3-turbo` |
| `--resume` | Resume an interrupted job | `false` |
| `--language <code >` | Force language (e.g. `en`) | Auto-detect |
| `--no-cleanup` | Keep temp audio chunks | `false` |

### Examples

**Resume an interrupted job:**
```bash
pnpm transcribe --resume "path/to/large-video.mp4"
```

**Save to specific folder:**
```bash
pnpm transcribe -o ./my-transcripts "video.mp4"
```

**Use the larger (slower) model:**
```bash
pnpm transcribe -m whisper-large-v3 "video.mp4"
```

## How It Works

1. **Probing**: Checks file duration and format.
2. **Extraction**: If video, extracts audio to temporary MP3 (128kbps mono).
3. **Chunking**: Splits audio into 10-minute chunks with 1-second overlap.
4. **Transcription**: Sends chunks to Groq API sequentially (rate-limited).
5. **Assembly**: Concatenates chunk transcripts into a single `.txt` file.
6. **Cleanup**: Removes temporary audio files.
