const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;

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
        const { jobTitle, history, message } = req.body;

        const systemInstruction = 
        `You are Interviewer.\n
         your company is "Turner cars".\n
         you are senior of ${jobTitle}.\n
         you are interviewing person who is currently employed by same company, but Due to the insurance process redesign, management is expecting a lot of staff in the department to be re-trained into other roles.\n
         you already asked "Tell me yourself" as first question. First answer you get is answer for "Tell me yourself".\n
         skip background explaination. skip greetings.\n`;

        // Initialize the generative model with the dynamic system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: systemInstruction,
        });

        // Start a new chat session if it's the first message
        const chatSession = model.startChat({
            generationConfig,
            history: history,
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


exports.chat2 = async (req, res, next) => {
    try {
        // Extract the user input from the request body
        const { jobTitle, history, message } = req.body;

        const systemInstruction = 
        `you are ${jobTitle}.\n
         your company is "Turner cars".\n
         Due to the insurance process redesign, management is expecting a lot of staff in the department to be re-trained into other roles.\n
         you are now interviewing with senior ${jobTitle} to get another role.\n
         make sure you are acting as real person. don't use guide like [Your Name]. Think up something suitable.\n`;

        // Initialize the generative model with the dynamic system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            systemInstruction: systemInstruction,
        });

        // Start a new chat session if it's the first message
        const chatSession = model.startChat({
            generationConfig,
            history: history,
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