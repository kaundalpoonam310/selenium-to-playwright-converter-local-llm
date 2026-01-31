
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const LLM_API_URL = process.env.LLM_API_URL || 'http://localhost:11434/api/generate';
const LLM_MODEL = process.env.LLM_MODEL || 'llama3';

app.use(cors());
app.use(bodyParser.json());

// Ensure output directory exists
const OUTPUT_DIR = path.join(__dirname, '../output/playwright');
await fs.mkdir(OUTPUT_DIR, { recursive: true });

app.post('/api/convert', async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    console.log('Received conversion request...');

    const prompt = `
You are an expert SDET and Software Engineer.
Convert the following Selenium Java code to Playwright TypeScript.
Prioritize READABILITY and modern Playwright patterns (e.g., Locators, auto-waiting) over strict 1:1 translation.
Do not include markdown backticks or explanations, just the code.

Selenium Java Code:
${code}
  `;

    try {
        // Adapter for Ollama
        const llmResponse = await axios.post(LLM_API_URL, {
            model: LLM_MODEL,
            prompt: prompt,
            stream: false
        });

        let convertedCode = llmResponse.data.response || llmResponse.data.choices?.[0]?.message?.content || "";

        // Clean up markdown if present
        convertedCode = convertedCode.replace(/```typescript/g, '').replace(/```/g, '').trim();

        // Save to file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `deployment-${timestamp}.spec.ts`;
        await fs.writeFile(path.join(OUTPUT_DIR, filename), convertedCode);

        console.log(`Converted code saved to ${filename}`);
        res.json({ success: true, code: convertedCode, filename });

    } catch (error: any) {
        console.error('LLM Error:', error.message);
        res.status(500).json({
            error: 'Failed to communicate with Local LLM',
            details: error.message,
            hint: 'Check if Ollama/LM Studio is running and LLM_API_URL is correct in .env'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
