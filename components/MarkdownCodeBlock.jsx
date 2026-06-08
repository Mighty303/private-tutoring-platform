"use client";

import { useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CodeBlockWithCopy({ language, children, ...props }) {
  const code = String(children).replace(/\n$/, "");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable
    }
  }, [code]);

  return (
    <div className="relative my-4 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-slate-800/95 text-slate-300 shadow-sm backdrop-blur-sm transition hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/80"
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        title={copied ? "Copied!" : "Copy"}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          paddingTop: "2.75rem",
          borderRadius: "0.5rem",
        }}
        className="my-0!"
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/**
 * react-markdown `components.code` handler: fenced blocks get Prism + copy; inline stays `<code>`.
 */
export function MarkdownCode({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  if (!inline && match) {
    return (
      <CodeBlockWithCopy language={match[1]} {...props}>
        {children}
      </CodeBlockWithCopy>
    );
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
