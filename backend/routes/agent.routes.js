import express from "express";
import { createAgent, deleteAgent, getAgentById, getAgents } from "../contollers/agent.controller.js";
import protect from "../middleware/protect.js";





const agentRouter = express.Router();



agentRouter.post("/", protect, createAgent);
agentRouter.get("/", protect, getAgents);
agentRouter.get("/:id", protect, getAgentById);
agentRouter.delete("/:id", protect, deleteAgent);

export default agentRouter;
