import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import agentReducer from "./agentSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        agent: agentReducer
    }
})