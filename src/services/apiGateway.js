const BASE_URL = "https://playground.4geeks.com/contact";

export const apiGateway = {
    async get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`Error en GET: ${response.status} ${response.statusText}`);
        }
        return await response.json();

    },

    async post(endpoint, bodyData = null) {
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

    },

    async put(endpoint, bodyData = null) {
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

    },

    async delete(endpoint) {
        const config = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            if (response.status === 422) {
                const errorBody = await response.json()
                throw new Error(JSON.stringify(errorBody.detail));
            }
            throw new Error(`Error en DELETE: ${response.status} ${response.statusText}`);
        }

        if (response.status === 204) return;

        return await response.json();

    }
};