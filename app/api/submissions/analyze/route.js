import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert Python tutor reviewing a student's code submission for a coding exercise.

Provide a concise analysis with these sections:
1. **Correctness** — Does the code solve the exercise? Are there bugs or logical errors?
2. **Code Quality** — Is the code clean, well-structured, and Pythonic? Any improvements?
3. **Common Mistakes** — Point out any beginner pitfalls (off-by-one, wrong return type, missing edge cases, etc.)
4. **Score** — Rate the submission out of 10.

RULES:
- Be specific and reference actual lines/logic from their code.
- Keep the total response under 250 words.
- Be encouraging but honest.
- Use markdown formatting for readability.`;

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.role || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Analysis service not configured" },
        { status: 503 }
      );
    }

    const { code, exerciseSlug, studentName } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    const userMessage = `Exercise: ${exerciseSlug || "Unknown exercise"}
Student: ${studentName || "Anonymous"}

Student's code:
\`\`\`python
${code}
\`\`\`

Please analyze this submission.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.4,
    });

    const analysis = message.content[0]?.text || "";

    return NextResponse.json({ analysis: analysis.trim() });
  } catch (err) {
    console.error("Analysis API error:", err);
    return NextResponse.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}
