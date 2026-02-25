"use client";

import { useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "300px",
  theme = "vs-dark",
}) {
  const editorRef = useRef(null);

  const handleMount = useCallback((editor) => {
    editorRef.current = editor;
    // Focus the editor on mount
    editor.focus();
  }, []);

  const handleChange = useCallback(
    (val) => {
      if (onChange) {
        onChange(val || "");
      }
    },
    [onChange]
  );

  return (
    <div className="rounded-b-lg overflow-hidden border border-slate-700">
      <Editor
        height={height}
        defaultLanguage="python"
        value={value}
        onChange={handleChange}
        onMount={handleMount}
        theme={theme}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Menlo', monospace",
          fontLigatures: true,
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
