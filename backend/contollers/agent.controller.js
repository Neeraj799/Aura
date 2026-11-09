import Agent from "../models/agent.js";

export const createAgent = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { name, knowledgeBases, instructions, tools } =
            req.body;

        if (!name || !knowledgeBases || !instructions || !tools) {
            return res.status(400).json({
                success: false,
                message: "Agent name and instructions are required.",
            });
        }

        const existingAgent = await Agent.findOne({ name })

        if (existingAgent) {
            return res.status(400).json({ message: "Agent name already exist" })
        }

        const agent = await Agent.create({
            userId,
            name: name.trim(),
            knowledgeBases,
            instructions: instructions.trim(),
            tools,
        });

        return res.status(201).json({
            success: true,
            message: "Agent created successfully.",
            agent,
        });
    } catch (error) {
        console.error("Create agent error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create agent.",
        });
    }
};

export const getAgents = async (req, res) => {
    try {
        const userId = req.user?._id;
        const agents = await Agent.find({
            userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            agents,
        });
    } catch (error) {
        console.error("Get agents error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch agents.",
        });
    }
};

export const getAgentById = async (req, res) => {
    try {
        const agentId = req.params.id;
        const agent = await Agent.findById({
            agentId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            agent
        });
    } catch (error) {
        console.error("Get agent error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch agent.",
        });
    }
};

export const deleteAgent = async (req, res) => {
    try {
        const { agentId } = req.params.id;



        const agent = await Agent.findOneAndDelete({
            agentId

        });

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Agent deleted successfully.",
        });
    } catch (error) {
        console.error("Delete agent error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete agent.",
        });
    }
};