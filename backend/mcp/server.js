import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio, StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import { TavilySearch } from "@langchain/tavily";
import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url";


const _fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(_fileName)

dotenv.config({
    path: path.resolve(dirName, "../.env")
})

const server = new McpServer({
    name: "automate-ai-mcp-server",
    version: "1.0.0",
});

const tavilySearch = new TavilySearch({
    maxResults: 5,
    topic: "general",
    tavilyApiKey: process.env.TAVILY_API_KEY
});

server.registerTool(
    "web_search",
    {
        description: "Search the web for current information, tutorials, and news.",
        inputSchema: z.object(
            {
                query: z.string()
            }
        )
    },
    async ({ query }) => {
        try {
            const result = await tavilySearch.invoke({ query })
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result),
                    },
                ],
            };
        } catch (error) {
            console.log(error)
            return {
                content: [
                    {
                        type: "text",
                        text: "web search failed",
                    },
                ],
            };
        }
    }
)

const main = async () => {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.log("mcp server started successfully")
}

main().catch((error) => {
    console.log("mcp server error", error)
    process.exit(1)
})
