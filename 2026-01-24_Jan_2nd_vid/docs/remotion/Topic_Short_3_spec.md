# Video Spec: Topic Short 3 (Designer vs AI)

**Title:** Designer vs AI ($500 Story Hook)
**Duration:** ~20-25 seconds (Dynamic based on audio)
**Resolution:** 1080x1920 (9:16 Vertical)
**FPS:** 30

---

## 🎨 Aesthetic: High-Tech Light Mode (Mirror's Edge)

**Mandatory Rule:** NO DARK BACKGROUNDS.
This video uses a strict "Clean Futurism" aesthetic.

*   **Backgrounds:** Pure White (`#FFFFFF`) or Very Light Gray (`#F3F4F6`).
*   **Text:** Deep Navy/Black (`#111827`) for readability.
*   **Accents:**
    *   **Primary:** Neon Blue (`#3B82F6`) - Used for UI elements, highlights.
    *   **Secondary:** Bright Red (`#EF4444`) - Used for "Error", "Expense", "Delete".
    *   **Tertiary:** Emerald Green (`#10B981`) - Used for "Success", "Savings".
*   **Shadows:** Soft, diffused shadows (`shadow-lg`, `shadow-xl`) to create depth on white.
*   **Glassmorphism:** Frosted glass effects using white opacity (`bg-white/80 backdrop-blur-md`) with thin light borders.

---

## 🎵 Audio & Timing

*   **Voiceover:** Synced with `Topic_Short_3.mp3` (To be generated).
*   **BGM:** Upbeat, clean tech-house or minimal electronic. Low volume.

---

## 🎬 Scenes & Composition

### Scene 1: The Problem (Invoice)
*   **Time:** 0:00 - 0:05
*   **Visual:**
    *   **Background:** Clean white grid pattern (very faint).
    *   **Element:** A crisp, realistic-looking Invoice UI Card centers screen. Shadow-xl.
    *   **Text on Invoice:** "Total Due: $500.00" (Bold, prominent).
    *   **Action:**
        1.  Invoice slides in from bottom (`spring`).
        2.  A thick, rough animated Red "X" (`#EF4444`) draws vigorously over the invoice.
        3.  Camera zooms *into* the invoice until white-out.
*   **Transition:** Zoom-through to Scene 2.

### Scene 2: The Solution (System Online)
*   **Time:** 0:05 - 0:09
*   **Visual:**
    *   **Background:** White.
    *   **Element:** A 3D-style "System" Badge or Icon (Brain + Pen).
    *   **Action:**
        1.  **Clock:** A minimalist circular progress clock spins rapidly (Blue ring).
        2.  **Progress Bar:** A sleek, thin blue line fills across the screen "Generating Design System...".
        3.  **Text:** "SYSTEM ONLINE" flashes in Neon Blue (`#3B82F6`).
*   **Transition:** Quick Fade (`0.2s`).

### Scene 3: The Proof (Montage)
*   **Time:** 0:09 - 0:14
*   **Style:** Fast cuts, barely 0.5s each. High energy.
*   **Shots:**
    1.  **Color:** A grid of color swatches (Palette) pops in sequentially. Colors: Slate, Blue, Indigo.
    2.  **Type:** Text "Inter" slide left, "Playfair" slide right. They lock together.
    3.  **Spacing:** A UI Card appears. Red spacing markers (8px, 16px) blink on/off to show padding.
*   **Transition:** None (Direct cuts), then `Wipe` to Scene 4.

### Scene 4: Comparison (Garbage vs Gold)
*   **Time:** 0:14 - 0:17
*   **Visual:**
    *   **Split Screen:**
        *   **Left (Before):** "Garbage" - A messy, unstyled wireframe (Comic Sans, misalignment). Gray background.
        *   **Right (After):** "Production" - The same wireframe but beautiful, styled, shadowed. White background.
    *   **Action:** A vertical slider handle moves automatically from Left to Right, revealing the "After" version.
    *   **Text:** "GARBAGE" (Red) -> "GOLD" (Green).

### Scene 5: Hook & CTA
*   **Time:** 0:17 - End
*   **Visual:**
    *   **Action:** Coins (Golden or flat vector style) rain down from top, piling up slightly.
    *   **Graph:** A simple line graph shoots upward (Green line).
    *   **Text:** "SAVE $$$" (Big, Green, Bold).
    *   **Final Overlay:** YouTube Thumbnail appearing with a "WATCH NOW" button pulsing.
*   **Transition:** End.

---

## 🧩 Component Architecture

| Component | Responsibility | Props |
|-----------|----------------|-------|
| `TopicShort3` | Main Composition | `audioUrl` |
| `Scene1_Invoice` | Invoice card & Red X animation | `showX: boolean` |
| `Scene2_System` | Loading states & "System Online" | `progress: number` |
| `Scene3_Montage` | Rapid fire asset showcase | - |
| `Scene4_Slider` | Before/After slider effect | `sliderPosition: number` |
| `Scene5_CTA` | Savings graph & Outro | - |
| `UI_Card` | Reusable styled container (White, Shadow) | `children`, `className` |
| `Text_Neon` | Reusable text with glow effect (Dark text, colored glow) | `text`, `color` |

---

## 🛠 Asset Requirements

See `Topic_Short_3_assets.md` for strict file paths and generation rules.
