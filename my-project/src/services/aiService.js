/**
 * AI Service using FastAPI Backend
 * Backend URL: http://127.0.0.1:8000/ask
 */

const BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || "http://127.0.0.1:8000/ask";

/**
 * Send a message to the FastAPI backend and get AI response
 * @param {string} message - The user's message
 * @param {string} systemPrompt - Optional system prompt to guide AI behavior
 * @returns {Promise<string>} - The AI's response
 */
export async function getAIResponse(message, systemPrompt = "You are a helpful assistant.") {
    console.log("=== AI Service: Calling FastAPI Backend ===");
    console.log("Backend URL:", BACKEND_URL);
    console.log("Message:", message);
    console.log("System Prompt:", systemPrompt);

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                system_prompt: systemPrompt
            })
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend error response:", errorText);
            throw new Error(`Backend returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Backend response data:", data);

        if (data.response) {
            console.log("=== AI Response Received Successfully ===");
            return data.response;
        } else {
            throw new Error("Invalid response format from backend");
        }
    } catch (error) {
        console.error("=== AI Service Error ===");
        console.error("Error type:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        // Handle specific error types
        if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
            throw new Error("Cannot connect to AI backend. Please make sure the FastAPI server is running at http://127.0.0.1:8000");
        } else if (error.message?.includes("CORS")) {
            throw new Error("CORS error. Please check your FastAPI CORS configuration.");
        }

        throw error;
    }
}

/**
 * Stream AI response for real-time display (future enhancement)
 * For now, just uses the regular response
 */
export async function streamAIResponse(message, onChunk, systemPrompt = "You are a helpful assistant.") {
    try {
        const response = await getAIResponse(message, systemPrompt);

        // Simulate streaming by sending the full response
        if (onChunk) {
            onChunk(response, response);
        }

        return response;
    } catch (error) {
        console.error("Streaming error:", error);
        throw error;
    }
}

/**
 * Check if the AI service is properly configured
 * Tests connection to the backend
 */
export async function isAIConfigured() {
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "test",
                system_prompt: "You are a helpful assistant."
            })
        });
        return response.ok;
    } catch {
        return false;
    }
}

export default {
    getAIResponse,
    streamAIResponse,
    isAIConfigured
};
