import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly Python tutor helping a student who is stuck on a coding exercise.

RULES:
- Give exactly ONE short hint to nudge the student in the right direction.
- Do NOT give the solution or write the code for them.
- Do NOT show corrected code.
- Keep it to 1-3 sentences max.
- Reference the specific concept they need (e.g. "try using a for loop" or "check your return statement").
- If they have a bug, describe WHAT is wrong, not HOW to fix it.
- Be encouraging and casual.
- If the code is already correct, say so briefly.`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Hint service not configured" },
        { status: 503 }
      );
    }

    const { code, exerciseDescription, error: executionError } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    let userMessage = `Exercise: ${exerciseDescription || "Python coding exercise"}\n\nStudent's code:\n\`\`\`python\n${code}\n\`\`\``;

    if (executionError) {
      userMessage += `\n\nThey got this error when running it:\n${executionError}`;
    }

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.5,
    });

    const hint = message.content[0]?.text || "";

    return NextResponse.json({ hint: hint.trim() });
  } catch (err) {
    console.error("Hint API error:", err);
    return NextResponse.json(
      { error: "Failed to generate hint" },
      { status: 500 }
    );
  }
}
