import api from "@/api"

export const login = async (token) => {
    try {
        const { data } = await api.post("/api/auth/login", { token })

        return data
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        const { data } = await api.post("/api/auth/logout")

        return data
    } catch (error) {
        console.log(error)
    }
}

export const me = async () => {
    try {
        const { data } = await api.get("/api/auth/me")

        return data
    } catch (error) {
        console.log(error)
    }
}