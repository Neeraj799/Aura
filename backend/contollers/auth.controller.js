import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth"
import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
        const { token: firebaseToken } = req.body;

        if (!firebaseToken) {
            return res.status(400).json({ message: "Token not found" })
        }

        const decoded = await getAuth(app).verifyIdToken(firebaseToken);

        const user = await User.findOneAndUpdate(
            { firebaseUid: decoded.uid },
            {
                $set: {
                    name: decoded.name,
                    email: decoded.email,
                    profilePicture: decoded.picture
                },
                $setOnInsert: {
                    firebaseUid: decoded.uid
                }
            },
            {
                upsert: true,
                returnDocument: "after"

            }
        )

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: "true",
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ success: true, message: "User login succcessfully", user: user })

    } catch (error) {
        console.log("Login error", error);

        return res.status(500).json({ success: false, message: "Login error", error: error.message })

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: "true",
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ success: true, message: "Logout successfully" })





    } catch (error) {
        console.log("Logout error", error);

        return res.status(500).json({ success: false, message: "Logout error", error: error.message })

    }
}

export const me = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json(user)




    } catch (error) {
        console.log("me error", error);

        return res.status(500).json({ success: false, message: "me error", error: error.message })

    }
}