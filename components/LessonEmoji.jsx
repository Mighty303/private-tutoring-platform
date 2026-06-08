/** Renders lesson emoji only when set; avoids empty layout gaps. */
export default function LessonEmoji({ emoji, className }) {
  if (emoji == null || String(emoji).trim() === "") return null;
  return (
    <span className={className} aria-hidden>
      {emoji}
    </span>
  );
}
