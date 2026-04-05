import { Router } from "express";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db";
import { eq } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

const SYSTEM_PROMPT = `You are the FOY Clinic AI Health Advisor — a sophisticated, empathetic, and medically-informed assistant for FOY Longevity & Wellness Clinic in Cairo, Egypt, led by Dr. Ahmed Amer.

Your role is to:
- Help visitors understand FOY's programs (Metabolic Reset, Longevity Optimization, Regeneration)
- Answer questions about longevity medicine, metabolic health, and regenerative science
- Guide interested patients toward booking a consultation with Dr. Ahmed Amer
- Provide general health education (not medical diagnoses)
- Maintain a warm, premium, physician-grade tone

Key clinic details:
- Location: 30 El-Mohandes Mohammed Hasan Helmy, El Mohandseen, Cairo, Egypt
- Contact: +20 120 002 2406 | clinic@foyclinic.com
- WhatsApp: wa.me/201200022406
- Programs: Metabolic Reset Program, Longevity Optimization Program, Regeneration Program

Always recommend a consultation with Dr. Ahmed Amer for specific medical advice. Never diagnose conditions. Keep responses concise and elegant — 2-4 sentences unless more detail is needed.`;

// Create conversation
router.post("/conversations", async (req, res) => {
  try {
    const { title } = req.body;
    const [conv] = await db.insert(conversations)
      .values({ title: title || "FOY Health Consultation" })
      .returning();
    res.status(201).json(conv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

// Get conversation with messages
router.get("/conversations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
    if (!conv) return res.status(404).json({ error: "Not found" });
    const msgs = await db.select().from(messages).where(eq(messages.conversationId, id));
    res.json({ ...conv, messages: msgs });
  } catch (err) {
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

// Send message (streaming SSE)
router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { content } = req.body;

    if (!content?.trim()) return res.status(400).json({ error: "Content required" });

    // Save user message
    await db.insert(messages).values({ conversationId: id, role: "user", content });

    // Fetch history
    const history = await db.select().from(messages).where(eq(messages.conversationId, id));

    const chatMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullResponse = "";

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        fullResponse += delta;
        res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
      }
    }

    // Persist assistant response
    await db.insert(messages).values({
      conversationId: id,
      role: "assistant",
      content: fullResponse,
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("Chat error:", err);
    res.write(`data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`);
    res.end();
  }
});

export default router;
