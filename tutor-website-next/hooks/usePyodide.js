"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Module-level singleton so runtime persists across component remounts
let pyodideInstance = null;
let pyodideLoadingPromise = null;
let cachedPythonVersion = null;

export default function usePyodide() {
  const [isLoading, setIsLoading] = useState(!pyodideInstance);
  const [isReady, setIsReady] = useState(!!pyodideInstance);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [pythonVersion, setPythonVersion] = useState(cachedPythonVersion);
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
        // Cache the Python version string
        if (!cachedPythonVersion) {
          const ver = pyodideInstance.runPython(
            "import sys; sys.version.split()[0]"
          );
          cachedPythonVersion = ver;
        }
        setPythonVersion(cachedPythonVersion);
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
        // Extract the Python traceback from Pyodide's PythonError.
        // Pyodide wraps Python exceptions in a JS PythonError whose
        // .message is often just "PythonError".  The *real* formatted
        // traceback lives in the Python-side exception that is still
        // accessible via sys.last_traceback / the __traceback__ attr.
        let cleanError = "";

        // Strategy 1: Use Pyodide's built-in format if available
        // (err may expose .message with the full traceback in some builds)
        const rawMessage = err.message || "";
        const rawString = String(err);

        // Pick whichever is longer / more informative
        const candidate =
          rawMessage.length > rawString.length ? rawMessage : rawString;
        const stripped = candidate
          .replace(/^PythonError:\s*/i, "")
          .trim();

        if (
          stripped &&
          stripped !== "PythonError" &&
          stripped.length > 5
        ) {
          cleanError = stripped;
        }

        // Strategy 2: Pull the traceback from Python if we still
        // don't have a useful message
        if (!cleanError) {
          try {
            const tbError = pyodideInstance.runPython(`
import traceback as _tb, sys as _sys
_err = _sys.last_value if hasattr(_sys, 'last_value') else None
"".join(_tb.format_exception(type(_err), _err, _err.__traceback__)) if _err else ""
            `);
            if (tbError && tbError.trim()) {
              cleanError = tbError.trim();
            }
          } catch {
            // ignore — Python state may be unusable
          }
        }

        // Strategy 3: Absolute fallback
        if (!cleanError) {
          cleanError =
            rawString !== "[object Object]"
              ? rawString
              : "An unknown Python error occurred.";
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

  /**
   * Run a set of test cases against user code.
   * Each test case: { input: "func(args)", expected: "value" }
   * Returns: { results: [{ input, expected, actual, passed, error }], allPassed }
   */
  const runTests = useCallback(async (code, testCases) => {
    if (!pyodideInstance) {
      return { results: [], allPassed: false };
    }

    const results = [];

    for (const tc of testCases) {
      try {
        // Reset stdout for each test
        pyodideInstance.runPython(`
import sys, io
class _TC_Out:
    def __init__(self):
        self.parts = []
    def write(self, t):
        if t:
            self.parts.append(t)
    def flush(self):
        pass
    def getvalue(self):
        return "".join(self.parts)
_tc_stdout = _TC_Out()
sys.stdout = _tc_stdout
sys.stderr = _tc_stdout
`);

        // Run user code to define functions
        await pyodideInstance.runPythonAsync(code);

        // Evaluate the test expression
        // If the input looks like a print() call, capture stdout
        // Otherwise evaluate as an expression
        const isPrint = tc.input.trim().startsWith("print(");

        let actual;
        if (isPrint) {
          // Reset capture, run the print, grab stdout
          pyodideInstance.runPython("_tc_stdout.parts.clear()");
          await pyodideInstance.runPythonAsync(tc.input);
          actual = pyodideInstance.runPython("_tc_stdout.getvalue()").trim();
        } else {
          // Evaluate as expression and get repr
          const val = await pyodideInstance.runPythonAsync(tc.input);
          actual = val != null ? String(val) : "None";
        }

        const passed = actual === tc.expected.trim();
        results.push({ input: tc.input, expected: tc.expected, actual, passed });
      } catch (err) {
        const errMsg = (err.message || String(err))
          .replace(/^PythonError:\s*/i, "")
          .trim();
        // Extract just the last line (the actual error)
        const lines = errMsg.split("\n").filter((l) => l.trim());
        const short = lines[lines.length - 1] || errMsg;
        results.push({
          input: tc.input,
          expected: tc.expected,
          actual: "",
          passed: false,
          error: short,
        });
      } finally {
        try {
          pyodideInstance.runPython(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
        } catch {
          // ignore
        }
      }
    }

    const allPassed = results.length > 0 && results.every((r) => r.passed);
    return { results, allPassed };
  }, []);

  return {
    isLoading,
    isReady,
    error,
    isRunning,
    output,
    pythonVersion,
    runCode,
    clearOutput,
    runTests,
  };
}
