const BASE_URL = "https://playground.4geeks.com/contact";

class ApiError extends Error {
    constructor(message, { status, statusText, detail, method, cause } = {}) {
        super(message, { cause });
        this.name = "ApiError";
        this.status = status;
        this.statusText = statusText;
        this.detail = detail;
        this.method = method;
    }
}

async function readErrorBody(response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

async function throwApiError(response, method) {
    const errorBody = await readErrorBody(response);

    throw new ApiError(
        errorBody?.detail || `HTTP Error in ${method}`,
        {
            status: response.status,
            statusText: response.statusText,
            detail: errorBody?.detail,
            method
        }
    );
}

async function handleResponse(response, method) {
    if (response.ok) return;

    await throwApiError(response, method);
}

export const apiGateway = {
    async get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        await handleResponse(response, "GET");
        return response.json();
    },

    async post(endpoint, bodyData = null) {
        const config = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };

        if (bodyData) {
            config.body = JSON.stringify(bodyData);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        await handleResponse(response, "POST");
        return response.json();
    },

    async put(endpoint, bodyData = null) {
        const config = {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        };

        if (bodyData) {
            config.body = JSON.stringify(bodyData);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        await handleResponse(response, "PUT");
        return response.json();
    },

    async delete(endpoint) {
        const config = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        await handleResponse(response, "DELETE");

        // API puede devolver 204 sin body
        if (response.status === 204) return;

        return response.json();
    }
};