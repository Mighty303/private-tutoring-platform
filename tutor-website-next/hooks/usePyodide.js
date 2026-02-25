"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Module-level singleton so runtime persists across component remounts
let pyodideInstance = null;
let pyodideLoadingPromise = null;

export default function usePyodide() {
  const [isLoading, setIsLoading] = useState(!pyodideInstance);
  const [isReady, setIsReady] = useState(!!pyodideInstance);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const abortRef = useRef(false);

  // Load Pyodide once
  useEffect(() => {
    if (pyodideInstance) {
      setIsLoading(false);
      setIsReady(true);
      return;
    }

    async function loadRuntime() {
      // Prevent multiple simultaneous loads
      if (!pyodideLoadingPromise) {
        pyodideLoadingPromise = (async () => {
          // Inject Pyodide script
          if (!document.querySelector('script[src*="pyodide"]')) {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js";
            script.async = true;
            document.head.appendChild(script);
            await new Promise((resolve, reject) => {
              script.onload = resolve;
              script.onerror = () => reject(new Error("Failed to load Pyodide script"));
            });
          }

          const pyodide = await globalThis.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
          });

          return pyodide;
        })();
      }

      try {
        pyodideInstance = await pyodideLoadingPromise;
        setIsReady(true);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        pyodideLoadingPromise = null;
      }
    }

    loadRuntime();
  }, []);

  // Run Python code
  const runCode = useCallback(async (code) => {
    if (!pyodideInstance) {
      setOutput([{ type: "error", text: "Python runtime not ready yet." }]);
      return;
    }

    setIsRunning(true);
    setOutput([]);
    abortRef.current = false;

    try {
      // Set up stdout/stderr capture
      pyodideInstance.runPython(`
import sys
import io

class OutputCapture:
    def __init__(self):
        self.outputs = []
    def write(self, text):
        if text:
            self.outputs.append(text)
    def flush(self):
        pass
    def getvalue(self):
        return "".join(self.outputs)

_stdout_capture = OutputCapture()
_stderr_capture = OutputCapture()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
      `);

      // Execute with timeout
      const TIMEOUT = 5000; // 5 seconds

      const executionPromise = pyodideInstance.runPythonAsync(code);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("__TIMEOUT__")), TIMEOUT)
      );

      await Promise.race([executionPromise, timeoutPromise]);

      // Capture output
      const stdout = pyodideInstance.runPython("_stdout_capture.getvalue()");
      const stderr = pyodideInstance.runPython("_stderr_capture.getvalue()");

      const newOutput = [];
      if (stdout) {
        newOutput.push({ type: "stdout", text: stdout });
      }
      if (stderr) {
        newOutput.push({ type: "error", text: stderr });
      }
      if (newOutput.length === 0) {
        newOutput.push({ type: "info", text: "(No output)" });
      }
      setOutput(newOutput);
    } catch (err) {
      if (err.message === "__TIMEOUT__") {
        setOutput([
          {
            type: "error",
            text: "⏱️ Execution timed out (5 second limit).\nYour code may contain an infinite loop.",
          },
        ]);
      } else {
        // Extract the Python error message from Pyodide's PythonError
        let cleanError;

        if (err.type) {
          // Pyodide PythonError — has .type (e.g. "NameError") and .message
          // The .message includes the full traceback
          cleanError = err.message || `${err.type}: ${String(err)}`;
        } else {
          cleanError = err.message || String(err);
        }

        // Strip the "PythonError: " wrapper prefix if present
        cleanError = cleanError
          .replace(/^PythonError:\s*/, "")
          .trim();

        // If we still just have the class name with no detail, show something useful
        if (!cleanError || cleanError === "PythonError") {
          cleanError = String(err);
          if (cleanError === "[object Object]") {
            cleanError = "An unknown Python error occurred.";
          }
        }

        // Also capture any partial stdout
        let partialStdout = "";
        try {
          partialStdout = pyodideInstance.runPython("_stdout_capture.getvalue()");
        } catch {
          // ignore
        }

        const newOutput = [];
        if (partialStdout) {
          newOutput.push({ type: "stdout", text: partialStdout });
        }
        newOutput.push({ type: "error", text: cleanError });
        setOutput(newOutput);
      }
    } finally {
      // Reset stdout/stderr
      try {
        pyodideInstance.runPython(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
        `);
      } catch {
        // ignore
      }
      setIsRunning(false);
    }
  }, []);

  // Clear output
  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  return {
    isLoading,
    isReady,
    error,
    isRunning,
    output,
    runCode,
    clearOutput,
  };
}
