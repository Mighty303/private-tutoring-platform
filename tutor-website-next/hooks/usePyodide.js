"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Module-level singleton so runtime persists across component remounts
let pyodideInstance = null;
let pyodideLoadingPromise = null;
let cachedPythonVersion = null;

// Queue for stdin when running code that uses input() — set before each run
let stdinQueue = [];

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
        // Set up stdin so input() works in browser — reads from stdinQueue, or prompt() when empty
        if (typeof pyodideInstance.setStdin === "function") {
          pyodideInstance.setStdin({
            stdin() {
              if (stdinQueue.length > 0) return stdinQueue.shift();
              if (typeof window !== "undefined" && typeof window.prompt === "function") {
                const val = window.prompt("Enter input:");
                return val !== null ? val : undefined;
              }
              return undefined;
            },
            isatty: false,
          });
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
  // options.inputLines: array of strings for input() calls (for browser playground)
  const runCode = useCallback(async (code, options = {}) => {
    if (!pyodideInstance) {
      setOutput([{ type: "error", text: "Python runtime not ready yet." }]);
      return;
    }

    setIsRunning(true);
    setOutput([]);
    abortRef.current = false;

    // Set stdin queue for exercises that use input()
    stdinQueue.length = 0;
    if (Array.isArray(options.inputLines) && options.inputLines.length > 0) {
      stdinQueue.push(...options.inputLines);
    }

    try {
      // Set up stdout/stderr capture + execution time guard via sys.settrace.
      // The trace function runs inside the Python interpreter loop itself, so
      // it catches infinite loops even though they block the JS main thread.
      pyodideInstance.runPython(`
import sys
import time as _time

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

_guard_counter = 0
_guard_start = _time.time()
_GUARD_LIMIT = 5

def _execution_guard(frame, event, arg):
    global _guard_counter
    _guard_counter += 1
    if _guard_counter & 0x2FFF == 0:
        if _time.time() - _guard_start > _GUARD_LIMIT:
            sys.settrace(None)
            raise RuntimeError(
                "Execution timed out (5 second limit).\\nYour code may contain an infinite loop."
            )
    return _execution_guard

sys.settrace(_execution_guard)
      `);

      await pyodideInstance.runPythonAsync(code);

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
      let cleanError = "";

      const rawMessage = err.message || "";
      const rawString = String(err);

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
          // ignore
        }
      }

      if (!cleanError) {
        cleanError =
          rawString !== "[object Object]"
            ? rawString
            : "An unknown Python error occurred.";
      }

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
    } finally {
      try {
        pyodideInstance.runPython(`
import sys
sys.settrace(None)
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
        pyodideInstance.runPython(`
import sys, time as _time

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

_guard_counter = 0
_guard_start = _time.time()
_GUARD_LIMIT = 5

def _execution_guard(frame, event, arg):
    global _guard_counter
    _guard_counter += 1
    if _guard_counter & 0x2FFF == 0:
        if _time.time() - _guard_start > _GUARD_LIMIT:
            sys.settrace(None)
            raise RuntimeError(
                "Execution timed out (5 second limit).\\nYour code may contain an infinite loop."
            )
    return _execution_guard

sys.settrace(_execution_guard)
`);

        // Output-based test: run full code with inputLines, compare stdout
        if (tc.type === "output") {
          stdinQueue.length = 0;
          if (Array.isArray(tc.inputLines) && tc.inputLines.length > 0) {
            stdinQueue.push(...tc.inputLines);
          }
          await pyodideInstance.runPythonAsync(code);
          const actual = pyodideInstance.runPython("_tc_stdout.getvalue()").trim();
          const expected = tc.expected.trim();
          const passed = actual === expected;
          results.push({ input: tc.input, expected, actual, passed });
          continue;
        }

        // Run user code to define functions
        await pyodideInstance.runPythonAsync(code);

        // Evaluate the test expression
        const isPrint = tc.input.trim().startsWith("print(");

        let actual;
        if (isPrint) {
          pyodideInstance.runPython("_tc_stdout.parts.clear()");
          await pyodideInstance.runPythonAsync(tc.input);
          actual = pyodideInstance.runPython("_tc_stdout.getvalue()").trim();
        } else {
          const val = await pyodideInstance.runPythonAsync(tc.input);
          actual = val != null ? String(val) : "None";
        }

        const passed = actual === tc.expected.trim();
        results.push({ input: tc.input, expected: tc.expected, actual, passed });
      } catch (err) {
        // Same multi-strategy extraction as runCode
        let errorText = "";
        const rawMessage = err.message || "";
        const rawString = String(err);
        const candidate = rawMessage.length > rawString.length ? rawMessage : rawString;
        const stripped = candidate.replace(/^PythonError:\s*/i, "").trim();

        if (stripped && stripped !== "PythonError" && stripped.length > 5) {
          // Extract just the last line (e.g. "NameError: name 'x' is not defined")
          const lines = stripped.split("\n").filter((l) => l.trim());
          errorText = lines[lines.length - 1] || stripped;
        }

        // Fallback: pull from Python's sys.last_value
        if (!errorText) {
          try {
            const pyErr = pyodideInstance.runPython(`
import traceback as _tb, sys as _sys
_result = ""
_err = _sys.last_value if hasattr(_sys, 'last_value') and _sys.last_value else None
if _err:
    _lines = _tb.format_exception(type(_err), _err, _err.__traceback__)
    _result = _lines[-1].strip() if _lines else ""
_result
            `);
            if (pyErr && pyErr.trim()) {
              errorText = pyErr.trim();
            }
          } catch {
            // ignore
          }
        }

        if (!errorText) {
          errorText = rawString !== "[object Object]" ? rawString : "Runtime error";
        }

        results.push({
          input: tc.input,
          expected: tc.expected,
          actual: "",
          passed: false,
          error: errorText,
        });
      } finally {
        try {
          pyodideInstance.runPython(`
import sys
sys.settrace(None)
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
