import { HumanMessage } from "@langchain/core/messages";
import chatGraph from "../utils/chatGraph.js";
import Agent from "../models/agent.js";
import { createAgentGraph } from "../utils/agentGraph.js";

export const chat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "message required" })
        }

        const threadId = (req.user._id).toString()

        const data = await chatGraph.invoke({
            messages: [
                new HumanMessage(message)
            ]
        }, {
            configurable: { thread_id: threadId }
        })

        const lastMessage = data.messages[data.messages.length - 1].content

        return res.status(200).json({ aiResponse: lastMessage })
    } catch (error) {
        return res.status(500).json({ message: `Chat controller error ${error}` })
    }
}

export const agentChat = async (req, res) => {
    try {
        const { message, agent } = req.body;

        if (!message) {
            return res.status(400).json({ message: "message required" })
        }

        const threadId = (req.user._id).toString()
        const existingAgent = await Agent.findOne({ name: agent })

        if (!existingAgent) {
            return res.status(400).json({ message: "Agent not found" })
        }

        const agentGraph = await createAgentGraph(existingAgent, req.user._id)
        const result = await agentGraph.invoke({
            messages: [
                new HumanMessage(message)
            ]
        }, {
            configurable: { thread_id: threadId }, recursionLimit: 5

        })

        const lastMessage = result.messages[result.messages.length - 1].content

        return res.status(200).json({ aiResponse: lastMessage })
    } catch (error) {
        return res.status(500).json({ message: `Agent chat controller error ${error}` })
    }
}