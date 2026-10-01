import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatGroq } from '@langchain/groq';
import { DynamicTool } from '@langchain/core/tools';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';

// Load the Groq API Key from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// 1. DEFINE THE ENTERPRISE TOOLS
// ==========================================
const unlockTool = new DynamicTool({
    name: "unlock_account",
    description: "Use this tool ONLY when a user says their account is locked, expired, or needs a password reset. Input must be the user ID.",
    func: async (userId) => {
        // In a real enterprise, this runs a SQL UPDATE command.
        return `I have successfully connected to the Active Directory and unlocked the account for Employee ${userId}.`;
    }
});

const escalateTool = new DynamicTool({
    name: "escalate_ticket",
    description: "Use this tool for hardware issues (cracked screens, broken laptops), or complex requests you cannot solve. Input must be the user ID and the reason.",
    func: async (input) => {
        return `I have escalated this ticket to Level 2 Human Support. Details: ${input}.`;
    }
});

const tools = [unlockTool, escalateTool];

// ==========================================
// 2. CONFIGURE THE GROQ AI AGENT
// ==========================================
// We are using Llama-3 via Groq for lightning-fast, free inference
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-20b", 
    temperature: 0
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are an autonomous IT Support Agent for Accenture. You must use your tools to help the user. If you don't have a tool to fix it, use the escalate_ticket tool. Do not just talk to the user—take action and return the result."],
    ["human", "User ID {user_id} reports: {issue_text}"],
    ["placeholder", "{agent_scratchpad}"]
]);

const agent = createToolCallingAgent({ llm, tools, prompt });
const agentExecutor = new AgentExecutor({ agent, tools });

// ==========================================
// 3. API ENDPOINT
// ==========================================
app.post('/api/v1/agent/resolve', async (req, res) => {
    try {
        const { user_id, issue_text } = req.body;
        
        // The AI "Thinks" and executes the tool dynamically
        const result = await agentExecutor.invoke({
            user_id: user_id.toString(),
            issue_text: issue_text
        });

        res.json({
            status: "success",
            user: `Employee ${user_id}`,
            action_taken: result.output
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "error",
            message: `AI Error: Check your Groq API key. Details: ${error.message}`
        });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Node.js Agent Backend running on port ${PORT}`));