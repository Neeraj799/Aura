import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            unique: true,
        },

        instructions: {
            type: String,
            required: true,
            trim: true,
        },

        tools: [
            {
                type: String,
                trim: true,
            },
        ],

        knowledgeBases: [
            {
                type: String,
                ref: "KnowledgeBase",
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);



const Agent = mongoose.model("Agent", agentSchema);

export default Agent;