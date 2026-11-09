import api from "@/api";

export const fetchAgents = async () => {
    const response = await api.get("/api/agent");
    return response.data;
};

export const fetchAgentById = async (id) => {
    const response = await api.get(`/api/agent/${id}`);
    return response.data;
};

export const createAgent = async ({ name, knowledgeBases, instructions, tools }) => {
    try {
        const response = await api.post("/api/agent", { name, knowledgeBases, instructions, tools });
        return response.data;
    } catch (error) {
        console.log(error);
        return error
    }
}

export const deleteAgent = async (id) => {
    const response = await api.delete(`/api/agent/${id}`);
    return response.data;
};