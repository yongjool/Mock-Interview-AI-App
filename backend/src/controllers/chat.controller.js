const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

exports.chat = async (req, res, next) => {
    try {

        // Extract the user input from the request body
        const { jobTitle, message } = req.body;

        const systemInstruction = `Always start the sentence with "As employer of Turners Car, ${jobTitle}"`;

        // Initialize the generative model with the dynamic system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: systemInstruction,
        });

        // Start a new chat session if it's the first message
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{ text: "hello\n" }],
                },
                {
                    role: "model",
                    parts: [{ text: "As employer of Turners Car, hello.\n" }],
                },
            ],
        });

        // Send the user message and get the AI's response
        const result = await chatSession.sendMessage(message);
        
        // Respond with the AI-generated text
        res.status(200).json({
            message: result.response.text(),
        });
    } catch (error) {
        next(error);
    }
};
