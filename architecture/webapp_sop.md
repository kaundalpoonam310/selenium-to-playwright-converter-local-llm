# Architecture SOP: Converter Web App

## 1. Overview
A premium designed web application that allows users to paste Selenium Java code and convert it to Playwright TS using a Local LLM.

## 2. Structure
- **Frontend**: Vite + React (TypeScript).
  - `src/components`: UI Components (InputEditor, OutputViewer, Controls).
  - `src/styles`: Vanilla CSS with CSS Variables for theming.
- **Backend**: Express.js Server.
  - `/api/convert`: POST endpoint.
  - Handles communication with Local LLM.
  - Writes files to disk.

## 3. Data Flow
1. **User** pastes Java code into Frontend.
2. **Frontend** sends POST to `/api/convert` with `{ code: string }`.
3. **Backend** constructs Prompt: "You are an expert SDET. Convert this Selenium Java code to Playwright TS. Prioritize readability..."
4. **Backend** sends Prompt to Local LLM URL (from `.env`).
5. **Backend** receives response, saves to `output/playwright/Timestamp.spec.ts`.
6. **Backend** responds to Frontend with generated code.
7. **Frontend** displays code with syntax highlighting.

## 4. Design Guidelines
- **Theme**: Deep Space Dark Mode.
- **Colors**: Neon Accents (Cyan/Purple) on Dark Backgrounds.
- **Effects**: Glassmorphism (Backdrop Filter), Hover Glows.
