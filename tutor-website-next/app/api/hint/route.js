import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
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
    if (!process.env.REPLICATE_API_TOKEN) {
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

    // Use Meta Llama 3 via Replicate
    const output = await replicate.run("meta/meta-llama-3-8b-instruct", {
      input: {
        prompt: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${SYSTEM_PROMPT}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${userMessage}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
        max_tokens: 200,
        temperature: 0.5,
        top_p: 0.9,
      },
    });

    // Replicate returns an array of string chunks for text models
    const hint = Array.isArray(output) ? output.join("") : String(output);

    return NextResponse.json({ hint: hint.trim() });
  } catch (err) {
    console.error("Hint API error:", err);
    return NextResponse.json(
      { error: "Failed to generate hint" },
      { status: 500 }
    );
  }
}
