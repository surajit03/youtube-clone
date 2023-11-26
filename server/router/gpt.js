const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("../error.js");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(config);

const router = express.Router();

// Middleware
router.use(cors()); // Enable CORS
router.use(bodyParser.json()); // Parse JSON request bodies

// Endpoint for chat
router.post('/chat', async (req, res, next) => {
    const { prompt } = req.body;
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 512,
            temperature: 0,
            prompt: prompt,
        });
        res.send(completion.data.choices[0].text);
    } catch (err) {
        next(err);
    }
}); 

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err); // Log the error
    res.status(500).send("Internal Server Error"); // Send an error response
});

module.exports = router;
