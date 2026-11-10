import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/routes/auth.route.js"
import agentRoutes from "../backend/routes/agent.routes.js"
import chatRoutes from "../backend/routes/chat.routes.js"

dotenv.config()

const app = express()

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/agent", agentRoutes);
app.use("/api/chat", chatRoutes)

app.listen(port, () => {
    connectDb()
    console.log("Server running at port", port);

})
