
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LLM_API_URL = process.env.LLM_API_URL || 'http://localhost:11434/api/generate';
const MODEL_NAME = process.env.LLM_MODEL || 'llama3'; // Default to llama3, user can change

async function checkLLMConnection() {
  console.log(`Checking LLM connection at ${LLM_API_URL}...`);
  try {
    // This payload format is for Ollama. Adjust if using OpenAI-compatible API (LM Studio, etc.)
    const response = await axios.post(LLM_API_URL, {
      model: MODEL_NAME,
      prompt: "Hello, are you ready to convert some code?",
      stream: false
    });

    if (response.status === 200) {
      console.log("✅ LLM Connection Successful!");
      console.log("Response:", response.data.response || response.data);
    } else {
      console.error(`❌ Received status ${response.status}`);
    }
  } catch (error: any) {
    console.error("❌ Failed to connect to LLM.");
    if (error.code === 'ECONNREFUSED') {
      console.error("Connection refused. Is the LLM server running?");
    } else {
      console.error(error.message);
    }
    console.log("\nIf you are using a different provider (e.g., LM Studio), set LLM_API_URL in .env");
    console.log("Example for LM Studio (OpenAI compatible): http://localhost:1234/v1/chat/completions");
  }
}

checkLLMConnection();
