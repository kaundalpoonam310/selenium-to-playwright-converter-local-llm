# 🔄 Selenium to Playwright Converter (Local LLM)

A premium, privacy-focused tool that uses a **Local Large Language Model (LLM)** to convert legacy Selenium Java code into modern Playwright TypeScript test specifications.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![React](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB.svg)
![Node](https://img.shields.io/badge/backend-Express%20%2B%20TypeScript-339933.svg)
![Ollama](https://img.shields.io/badge/AI-Ollama%20(CodeLlama)-white.svg)

---

## 🏗 System Architecture

The application follows a 3-tier architecture designed for privacy and speed. No code leaves your local machine.

```mermaid
graph LR
    subgraph Frontend [React Web UI]
        A["Input Editor<br/>(Java)"] -->|"POST /api/convert"| B("Backend API")
        C["Output Viewer<br/>(Playwright TS)"]
    end

    subgraph Backend [Express Server]
        B -->|"Prompt Construction"| D{"LLM Service"}
        D -->|"Response"| B
        B -->|"Write File"| E["FileSystem<br/>output/playwright/"]
        B -->|"JSON Response"| C
    end

    subgraph AI [Local LLM Layer]
        D <-->|"Ollama API"| F[("Ollama Server<br/>CodeLlama")]
    end

    style Frontend fill:#1a1b2e,stroke:#00e5ff,stroke-width:2px,color:#fff
    style Backend fill:#1a1b2e,stroke:#7000ff,stroke-width:2px,color:#fff
    style AI fill:#fff,stroke:#333,stroke-width:2px,color:#000
```

## ✨ Features

- **🔒 100% Local Privacy**: Your proprietary test code never touches the cloud. All inference is done locally via Ollama.
- **⚡ Real-Time Conversion**: Instant translation from Selenium's `WebDriver` patterns to Playwright's `Locators` and `auto-waiting`.
- **🎨 Premium UI**: A deep-space, glassmorphic dark mode designed for developer focus.
- **💾 Auto-Save**: Automatically saves generated spec files to `output/playwright` for immediate use.

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v18+)
2.  **Ollama** installed and running.
    *   Install from [ollama.com](https://ollama.com)
    *   Pull the model: `ollama pull codellama`

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd selenium-to-playwright-local-llm

# Install dependencies (Root + Frontend)
npm install
cd frontend && npm install && cd ..
```

### Configuration

Create a `.env` file in the root directory (already set up by default):

```env
LLM_API_URL=http://localhost:11434/api/generate
LLM_MODEL=codellama:latest
PORT=3001
```

### Usage

Run the full stack (Backend + Frontend) with a single command:

```bash
npm run dev
```

- **Frontend**: Open [http://localhost:5173](http://localhost:5173) to access the UI.
- **Backend**: API runs on `http://localhost:3001`.
- **Output**: Check the `output/playwright` folder for generated `.spec.ts` files.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Vanilla CSS (Variables + Theming).
- **Backend**: Express.js, TypeScript, Axios.
- **AI/ML**: Ollama API, CodeLlama (7b/13b/34b).
- **Tooling**: `concurrently`, `tsx`.

## 🤝 Contributing

1.  Fork the repo.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

*Powered by Antigravity*
