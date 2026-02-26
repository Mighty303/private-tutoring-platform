import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a Python code grader. A student has submitted code for a coding exercise.
Your ONLY job is to determine whether the code would produce the correct output when run.

RULES:
- Analyze the code logic. Does it solve the problem described?
- Minor style issues do NOT matter — only correctness.
- If the code would crash with an error (NameError, TypeError, etc.), it FAILS.
- If the code produces wrong output for typical inputs, it FAILS.
- If the code is correct and would work, it PASSES.

You MUST respond with EXACTLY this JSON format and nothing else:
{"passed": true, "message": "Short 1-sentence explanation"}
or
{"passed": false, "message": "Short 1-sentence explanation of what's wrong"}`;

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Grading service not configured" },
        { status: 503 }
      );
    }

    const { code, exerciseDescription } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    const userMessage = `Exercise: ${exerciseDescription || "Python coding exercise"}

Student's code:
\`\`\`python
${code}
\`\`\`

Does this code correctly solve the exercise? Respond with JSON only.`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 150,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      temperature: 0,
    });

    const raw = message.content[0]?.text || "";

    // Parse the JSON response
    try {
      const result = JSON.parse(raw.trim());
      return NextResponse.json({
        passed: !!result.passed,
        message: result.message || "",
      });
    } catch {
      // If JSON parsing fails, try to extract intent
      const passed = raw.toLowerCase().includes('"passed": true') ||
                     raw.toLowerCase().includes('"passed":true');
      return NextResponse.json({
        passed,
        message: "Code reviewed.",
      });
    }
  } catch (err) {
    console.error("Check API error:", err);
    return NextResponse.json(
      { error: "Failed to check submission" },
      { status: 500 }
    );
  }
}
