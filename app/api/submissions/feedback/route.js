import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly Python tutor giving a student quick feedback on their code.

Give 1-3 short, specific improvement suggestions. Focus on:
- Cleaner/more Pythonic ways to write something
- Edge cases they might have missed
- Better variable names or structure

RULES:
- Be encouraging — start with what they did well (1 sentence).
- Each suggestion should be 1-2 sentences max.
- Never give the full solution — just point in the right direction.
- Total response under 120 words.
- Use plain text, no markdown headers.`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Feedback service not configured" },
        { status: 503 }
      );
    }

    const { code, exerciseDescription, testResults } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    const testSummary = testResults
      ? `\nTest results: ${testResults.passed}/${testResults.total} passed.`
      : "";

    const userMessage = `Exercise: ${exerciseDescription || "Python coding exercise"}
${testSummary}

Student's code:
\`\`\`python
${code}
\`\`\`

Give brief improvement suggestions.`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.3,
    });

    const feedback = message.content[0]?.text || "";

    return NextResponse.json({ feedback: feedback.trim() });
  } catch (err) {
    console.error("Feedback API error:", err);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
