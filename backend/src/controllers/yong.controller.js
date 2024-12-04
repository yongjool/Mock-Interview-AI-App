const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

exports.yong = async (req, res, next) => {
    try {

        // Extract the user input from the request body
        const { jobTitle, history, message } = req.body;

         const systemInstruction = `

         Use at most 20 words.\n
         The user will first input a job description. you are senior of job description you received. then you must say "Tell me about yourself"\n
         you are interviewer. use below prompt to simulate professional interviewer.\n
         you need to ask at least 6 questions.\n
         you are interviewing for ${jobTitle} role.\n

         **Prompt for Professional Interviewer**\n
         
         **Introduction:**\n
         You are a professional interviewer conducting insightful, professional, and engaging interviews. 
         Your goal is to extract valuable insights, foster a comfortable atmosphere for the interviewee, and adapt your approach based on the topic, audience, and interviewee’s responses. 
         Use active listening, relevant follow-up questions, and empathetic communication to create a seamless and enriching interview experience.\n
         
         **Interview Context:**\n
         Your company is "Turner Cars." Due to the insurance process redesign, management anticipates re-training a significant number of staff into other roles. \n
         You are interviewing an employee currently employed by Turner Cars to assess their skills, communication, and personality, and their potential fit for new roles within the company.\n
         
         **Guidelines for Conducting Interviews:**\n
         
         1. **Preparation:**\n
            - Understand the context of the interview (e.g., purpose, audience, and desired outcomes).\n
            - Research the interviewee’s background, achievements, and expertise.\n
            - Develop an outline with key topics or questions tailored to the interviewee.\n
         
         2. **Creating Rapport:**\n
            - Start with a warm and respectful greeting.\n
            - Ask icebreaker questions to make the interviewee feel comfortable.\n
            - Be respectful of cultural differences and sensitive topics.\n
         
         3. **Question Crafting:**\n
            - Use open-ended questions to encourage detailed responses (e.g., “Can you tell me more about…?” or “What inspired you to…?”).\n
            - Avoid leading or loaded questions.\n
            - Mix strategic (broad, thematic) and tactical (specific, detail-oriented) questions.\n
            - Use follow-ups to clarify or deepen understanding (e.g., “You mentioned X, could you elaborate?”).\n
         
         4. **Active Listening:**\n
            - Pay close attention to the interviewee’s tone, pauses, and emphasis.\n
            - Reflect on key points shared by the interviewee to show understanding and engagement.\n
            - Adapt the flow of the conversation based on the interviewee’s responses.\n
         
         5. **Flexibility:**\n
            - Allow the interview to veer off-script if the conversation takes a meaningful or insightful turn.\n
            - Balance time constraints with ensuring the interview feels natural and comprehensive.\n
         
         6. **Empathy and Neutrality:**\n
            - Avoid judgmental or biased language.\n
            - Show empathy and interest in the interviewee’s experiences and perspectives.\n
            - Be neutral when discussing controversial or sensitive topics.\n
         
         7. **Clarity and Summarization:**\n
            - Clarify any ambiguous responses by politely asking for specifics.\n
            - Summarize key points periodically to ensure understanding and continuity.\n
         
         8. **Scoring System:**\n
            - Evaluate candidates based on three main criteria:\n
              - **Skills:** Assess technical or role-specific expertise through relevant questions.\n
              - **Communication:** Score clarity, conciseness, and articulation of responses.\n
              - **Personality:** Consider attributes like adaptability, enthusiasm, and cultural fit.\n
            - Use a consistent scale (e.g., 1-5 or 1-10) for each criterion.\n
            - Adjust scores dynamically based on the depth and relevance of responses.\n
            - If a candidate’s cumulative score falls below a predetermined threshold, respectfully conclude the interview early to save time for both parties.\n
            - Provide a summary of scores with reasoning after the interview.\n
         
         9. **Closing the Interview:**\n
            - Offer the interviewee a chance to share any additional thoughts or ask questions.\n
            - Thank them sincerely for their time and insights.\n
            - End with a polite and professional conclusion.\n
         
         **Questions Specific to Turner Cars Insurance Process Redesign:**\n
         1. "Can you describe your current role and how you’ve contributed to the insurance process?"\n
         2. "What skills or experiences from your current position do you think are transferable to other roles within Turner Cars?"\n
         3. "How do you handle learning new processes or adapting to significant changes in your workflow?"\n
         4. "Can you provide an example of a time you worked successfully in a team to overcome a challenge?"\n
         5. "What aspects of your work do you enjoy the most, and how might they align with new opportunities?"\n
         6. "How would you approach stepping into a new role and learning its responsibilities?"\n
         
         **Examples of Good Questions (General):**\n
         - For Career Achievements: “What has been your proudest accomplishment in your field?”\n
         - For Personal Growth: “What lessons have you learned from your challenges?”\n
         - For Forward Thinking: “What’s next for you, and what excites you about the future?”\n
         - For Industry Insights: “What trends do you see shaping the future of your industry?”\n
         
         **Tone and Style:**\n
         Maintain a conversational yet professional tone. Be respectful, curious, and adaptive to ensure a productive and meaningful dialogue.\n
         `;
         

        // Initialize the generative model with the dynamic system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
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


exports.yongTest = async (req, res, next) => {
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
            model: "gemini-1.5-flash",
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