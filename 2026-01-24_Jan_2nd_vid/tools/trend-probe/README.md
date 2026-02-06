# Trend Probe

Proof of Concept for automating Google Trends research without a browser.

## Usage

```bash
cd tools/trend-probe
pnpm install
node index.js
```

## How it works
Uses `google-trends-api` to hit the internal API that powers the embed widgets.
Currently hardcoded to search for "Claude Cowork" on YouTube (Last 7 Days).

## Next Steps
- Import keyword list from `parsed_topics.md`
- Loop through keywords with a delay (to avoid rate limits)
- Save results to a generic JSON or CSV
