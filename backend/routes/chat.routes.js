import express from "express";
import protect from "../middleware/protect.js";
import { agentChat, chat } from "../contollers/chat.controller.js";





const chatRouter = express.Router();

chatRouter.post("/", protect, chat);
chatRouter.post("/agent", protect, agentChat);
export default chatRouter;
