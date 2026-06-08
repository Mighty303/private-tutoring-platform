import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly Python tutor. A student is working on a coding exercise and has a question.

RULES:
- Answer questions about the EXERCISE, the CONCEPTS, or PYTHON in general.
- Explain concepts, clarify what the exercise is asking, define terms, explain how a Python feature works.
- Do NOT give the solution or write working code that solves the exercise.
- Do NOT show corrected versions of their code.
- Do NOT write the function body for them.
- You CAN show tiny syntax examples for general Python concepts (e.g. "a for loop looks like: for x in list:") as long as it doesn't solve the exercise.
- Keep answers concise — 2-4 sentences max.
- Be encouraging, casual, and supportive.
- If the student is asking you to solve it for them, politely decline and offer to clarify the concept instead.`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Ask service not configured" },
        { status: 503 }
      );
    }

    const { question, exerciseDescription, code } = await request.json();

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "No question provided" },
        { status: 400 }
      );
    }

    let userMessage = `Exercise:\n${exerciseDescription || "A Python coding exercise."}\n\n`;

    if (code) {
      userMessage += `Student's current code:\n\`\`\`python\n${code}\n\`\`\`\n\n`;
    }

    userMessage += `Student's question: ${question.trim()}`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.5,
    });

    const answer = message.content[0]?.text || "";

    return NextResponse.json({ answer: answer.trim() });
  } catch (err) {
    console.error("Ask API error:", err);
    return NextResponse.json(
      { error: "Failed to answer question" },
      { status: 500 }
    );
  }
}
