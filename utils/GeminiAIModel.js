const { 
    GoogleGenerativeAI, 
    HarmCategory, 
    HarmBlockThreshold 
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Ensure this is set in your .env file
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });
  
  const generationConfig = {
    temperature: 1, // Controls randomness; 1 is balanced
    topP: 0.95, // Nucleus sampling
    topK: 40, // Controls diversity
    maxOutputTokens: 8192, // Adjust based on response length needed
    responseMimeType: "text/plain", // Ensures text output
  };
  
  export const chatSession = model.startChat({
    generationConfig,
  });
  