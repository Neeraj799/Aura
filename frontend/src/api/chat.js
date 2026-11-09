import api from "@/api"

export const chat = async (message) => {
    try {
        const { data } = await api.post("/api/chat", { message })
        console.log(data)

        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
