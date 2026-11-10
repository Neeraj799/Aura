import { MCPAdapter } from "@langchain/mcp-adapters";
import path from "node:path"
import { fileURLToPath } from "node:url";

const _fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(_fileName)
const serverPath = path.join(dirName, "server.js")



const adapter = new MCPAdapter({
    servers: {
        automate: {
            transport: "stdio",
            command: process.execPath,
            args: [serverPath]
        }
    },
});

export const getMcpTools = async () => {
    const tools = await adapter.listTools()
    console.log(tools.map((tool) => tool.name))
    return tools
}
