const DISCORD_API = "https://discord.com/api/v10";

export async function POST(request) {
  const token = process.env.DISCORD_TOKEN;
  const channelId = process.env.DISCORD_CHANNEL_ID;

  if (!token || !channelId) {
    return Response.json(
      { error: "Discord bot is not configured. Set DISCORD_TOKEN and DISCORD_CHANNEL_ID." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { message, embed } = body;

  if (!message && !embed) {
    return Response.json(
      { error: "Provide a message or embed to send." },
      { status: 400 }
    );
  }

  if (message && message.length > 1500) {
    return Response.json(
      { error: "Message too long (max 1500 characters)." },
      { status: 400 }
    );
  }

  const payload = {};
  if (message) payload.content = message;
  if (embed) payload.embeds = [embed];

  try {
    const res = await fetch(`${DISCORD_API}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return Response.json(
        { error: err.message || `Discord API error (${res.status})` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json({
      success: true,
      messageId: data.id,
      timestamp: data.timestamp,
    });
  } catch (err) {
    return Response.json(
      { error: "Failed to reach Discord API." },
      { status: 502 }
    );
  }
}
