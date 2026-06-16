const BASE_URL = "https://playground.4geeks.com/contact";

export const apiGateway = {
    async get(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error en GET: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Gateway Error [GET]: ${error}`);
            throw error;
        }
    },

    async post(endpoint, bodyData = null) {
        try {
            const config = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            };
            if (bodyData) config.body = JSON.stringify(bodyData);

            const response = await fetch(`${BASE_URL}${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`Error en POST: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Gateway Error [POST]:", error);
            throw error;
        }
    },

    async put(endpoint, bodyData = null) {
        try {
            const config = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            };
            if (bodyData) config.body = JSON.stringify(bodyData);

            const response = await fetch(`${BASE_URL}${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`Error en PUT: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Gateway Error [PUT]:", error);
            throw error;
        }
    },

    async delete(endpoint) {
        try {
            const config = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            };

            const response = await fetch(`${BASE_URL}${endpoint}`, config);
            if (!response.ok) {
                throw new Error(`Error en DELETE: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Gateway Error [DELETE]:", error);
            throw error;
        }
    }
};