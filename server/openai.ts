import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
}) : null;

interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  platforms: string[];
  tags: string[];
}

interface AutoReplyRequest {
  message: string;
  platform: string;
  knowledgeBase: KnowledgeBaseEntry[];
  context?: {
    userProfile?: any;
    conversationHistory?: string[];
  };
}

export async function generateAutoReply(request: AutoReplyRequest): Promise<{
  reply: string;
  confidence: number;
  usedKnowledge: string[];
}> {
  if (!openai) {
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to enable auto-reply functionality.");
  }

  const { message, platform, knowledgeBase, context } = request;

  // Filter knowledge base entries relevant to the platform
  const relevantKnowledge = knowledgeBase.filter(entry => 
    entry.platforms.includes("all") || entry.platforms.includes(platform)
  );

  // Create knowledge context for the AI
  const knowledgeContext = relevantKnowledge.map(entry => 
    `Title: ${entry.title}\nCategory: ${entry.category}\nContent: ${entry.content}\nTags: ${entry.tags.join(", ")}`
  ).join("\n\n");

  const systemPrompt = `You are an AI assistant helping with automated customer service responses for social media platforms. 

Your role:
- Respond professionally and helpfully to customer messages
- Use the provided knowledge base to give accurate information
- Maintain a consistent brand voice
- Keep responses concise but informative
- Adapt tone slightly for each platform (${platform})

Knowledge Base:
${knowledgeContext}

Guidelines:
- Only use information from the knowledge base provided
- If you don't have enough information to answer, politely direct them to contact support
- Keep responses friendly and professional
- For ${platform}, maintain platform-appropriate tone and length
- Include relevant details but avoid overwhelming the customer
- Always be helpful and solution-oriented

Please respond to the customer message using only the knowledge base information provided.`;

  const userPrompt = `Customer Message: "${message}"

Please provide an appropriate response based on the knowledge base. Respond in JSON format:
{
  "reply": "your response here",
  "confidence": 0.95,
  "usedKnowledge": ["knowledge entry titles used"]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      reply: result.reply || "Thank you for your message. Our team will get back to you soon.",
      confidence: result.confidence || 0.5,
      usedKnowledge: result.usedKnowledge || []
    };
  } catch (error) {
    console.error("Auto-reply generation failed:", error);
    throw new Error("Failed to generate auto-reply: " + (error as Error).message);
  }
}

export async function analyzeMessage(message: string): Promise<{
  intent: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  sentiment: 'positive' | 'neutral' | 'negative';
}> {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const prompt = `Analyze this customer message and classify it:

Message: "${message}"

Provide analysis in JSON format:
{
  "intent": "question|complaint|compliment|request|other",
  "category": "pricing|support|features|technical|general",
  "urgency": "low|medium|high",
  "sentiment": "positive|neutral|negative"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 200
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Message analysis failed:", error);
    return {
      intent: "other",
      category: "general", 
      urgency: "medium",
      sentiment: "neutral"
    };
  }
}

export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}