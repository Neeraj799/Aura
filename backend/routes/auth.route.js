import express from "express";
import { login, logout, me } from "../contollers/auth.controller.js";
import protect from "../middleware/protect.js";

const router = express.Router()

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router