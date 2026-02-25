import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
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
    if (!process.env.REPLICATE_API_TOKEN) {
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

    const output = await replicate.run("meta/meta-llama-3-8b-instruct", {
      input: {
        prompt: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${SYSTEM_PROMPT}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${userMessage}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
        max_tokens: 300,
        temperature: 0.5,
        top_p: 0.9,
      },
    });

    const answer = Array.isArray(output) ? output.join("") : String(output);

    return NextResponse.json({ answer: answer.trim() });
  } catch (err) {
    console.error("Ask API error:", err);
    return NextResponse.json(
      { error: "Failed to answer question" },
      { status: 500 }
    );
  }
}
