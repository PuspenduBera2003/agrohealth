const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai")

router.post("/chat", async (req, res) => {
    try {
        // Initialize the Google Generative AI with the API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Retrieve the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are an agricultural expert named AgroHealth. Don't generate text that show contact agroculture experts, instead show contact AgroHealth.", });

        // Define the prompt
        const { prompt, image } = req.body;

        // Generate content using the model
        const imageResp = await fetch(
            image
        )
            .then((response) => response.arrayBuffer());

        const result = await model.generateContent([
            {
                inlineData: {
                    data: Buffer.from(imageResp).toString("base64"),
                    mimeType: "image/jpeg",
                },
            },
            `${prompt} and describe the image`,
        ]);

        // Send the response back to the client
        return res.json({ success: true, result: result.response.text() });
    } catch (error) {
        console.error("Error in /chat route:", error);

        // Handle specific error cases
        if (error.response) {
            // Errors from the API (e.g., invalid API key, bad request)
            return res.status(error.response.status).json({
                success: false,
                message: error.response.data.message || "API responded with an error",
            });
        } else if (error.request) {
            // Network-related errors (e.g., no response from API)
            return res.status(500).json({
                success: false,
                message: "No response from the AI API. Please check your network connection or API endpoint.",
            });
        } else {
            // Other unexpected errors
            return res.status(500).json({
                success: false,
                message: error.message || "An unexpected error occurred",
            });
        }
    }
});


module.exports = router;