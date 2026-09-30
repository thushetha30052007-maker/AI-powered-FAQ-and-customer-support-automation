const { GoogleGenAI } = require('@google/genai');

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    const err = new Error('GEMINI_API_KEY is not configured');
    err.status = 500;
    throw err;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

const generateText = async (prompt) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

const generateAnswer = (question) =>
  generateText(`Answer the following customer-support question clearly and accurately. Keep the answer concise and practical.\n\nQuestion: ${question}`);

const generateFAQ = async (topic) => {
  const text = await generateText(
    `Create one FAQ entry about the topic below. Return ONLY valid JSON with exactly these keys: question, answer, category. Category must be one of Technology, Education, Health, Banking, General.\n\nTopic: ${topic}`
  );

  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return { question: `What should I know about ${topic}?`, answer: text.trim(), category: 'General' };
  }
};

module.exports = { generateAnswer, generateFAQ };
