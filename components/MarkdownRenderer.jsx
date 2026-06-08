"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { MarkdownCode } from "@/components/MarkdownCodeBlock";
import "katex/dist/katex.min.css";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        code: MarkdownCode,
        img({ src, alt, ...props }) {
          return (
            <span className="block my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || ""}
                className="rounded-lg max-w-full"
                {...props}
              />
            </span>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
