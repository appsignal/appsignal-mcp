#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, GetPromptRequestSchema, ListPromptsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const API_KEY = process.env.APPSIGNAL_API_KEY;
if (!API_KEY) {
    throw new Error("APPSIGNAL_API_KEY environment variable is required");
}
const ENDPOINT = process.env.APPSIGNAL_ENDPOINT || "https://appsignal.com/api/mcp";
const client = axios.create({
    baseURL: ENDPOINT,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
});
const server = new Server({
    name: "AppSignal",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
        prompts: {},
    },
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error("Getting tools");
    const response = await client.get("/tools");
    return response.data;
});
// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    console.error(`Calling tool ${name} with args:`, args);
    const response = await client.post("/tool", request.params);
    return response.data;
});
// Handle prompt execution
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    console.error(`Calling prompt ${name} with args:`, args);
    const response = await client.post("/prompt", request.params);
    return response.data;
});
// Handle prompt execution
server.setRequestHandler(ListPromptsRequestSchema, async (request) => {
    console.error(`Getting prompts: ${JSON.stringify(request.params)}`);
    const response = await client.get("/prompts");
    return response.data;
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("AppSignal MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
