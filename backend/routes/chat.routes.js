import express from "express";
import protect from "../middleware/protect.js";
import { chat } from "../contollers/chat.controller.js";





const chatRouter = express.Router();

chatRouter.post("/", protect, chat);

export default chatRouter;
