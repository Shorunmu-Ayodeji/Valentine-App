import { useEffect, useMemo, useState } from "react";

const CORRECT_PASSCODE = "1724";
const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function PasscodeGate({ onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  const [message, setMessage] = useState("");

  const masked = useMemo(() => "?".repeat(input.length), [input]);

  function triggerError() {
    setError(true);
    setMessage("Wrong passcode. Try again.");
    setInput("");
    setTimeout(() => setError(false), 460);
  }

  function appendDigit(digit) {
    setPressedKey(digit);
    setTimeout(() => setPressedKey(null), 120);

    if (input.length >= CORRECT_PASSCODE.length) {
      return;
    }

    const next = `${input}${digit}`;
    setInput(next);
    setMessage("");

    if (next.length === CORRECT_PASSCODE.length) {
      if (next === CORRECT_PASSCODE) {
        setMessage("Unlocked.");
        setTimeout(onSuccess, 420);
      } else {
        setTimeout(triggerError, 220);
      }
    }
  }

  function clearInput() {
    setPressedKey("clear");
    setTimeout(() => setPressedKey(null), 120);
    setInput("");
    setMessage("");
  }

  function backspaceInput() {
    setPressedKey("backspace");
    setTimeout(() => setPressedKey(null), 120);
    setInput((prev) => prev.slice(0, -1));
    setMessage("");
  }

  useEffect(() => {
    function handleKeydown(event) {
      const { key } = event;
      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        appendDigit(Number(key));
        return;
      }
      if (key === "Backspace") {
        event.preventDefault();
        backspaceInput();
        return;
      }
      if (key === "Delete" || key === "Escape") {
        event.preventDefault();
        clearInput();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [input]);

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center px-4 bg-black overflow-hidden ${
        error ? "animate-shake animate-flashRed" : ""
      }`}
    >
      <div className="absolute inset-0 animate-heartbeat bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.24),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl glass-card shadow-[0_0_40px_rgba(239,68,68,0.2)] p-6 md:p-8 text-center space-y-6 border border-red-900/50">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-red-500 animate-flickerGlow">Private Access</h2>
          <p className="text-red-100/80 font-sans">Only Bonita can enter.</p>
          <p className="text-red-300/70 text-sm font-sans">Hint: A number that means something to us.</p>
        </div>

        <div
          aria-live="polite"
          className="h-10 rounded-lg border border-red-900/60 bg-black/50 flex items-center justify-center text-red-400 text-2xl dot-mask shadow-red-500/50 shadow-inner"
        >
          {masked || "----"}
        </div>
        <p aria-live="polite" className="text-sm text-red-300/75 min-h-5">
          {message}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {KEYS.slice(0, 9).map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => appendDigit(digit)}
              aria-label={`Enter ${digit}`}
              className={`rounded-lg py-3 font-semibold text-red-100 bg-red-950/40 border border-red-800/60 transition-all duration-150 active:scale-95 hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                pressedKey === digit ? "scale-95 shadow-[0_0_18px_rgba(239,68,68,0.55)]" : ""
              }`}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={backspaceInput}
            aria-label="Backspace"
            className={`rounded-lg py-3 text-sm font-semibold text-red-100 bg-red-950/30 border border-red-800/60 transition-all duration-150 active:scale-95 hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              pressedKey === "backspace" ? "scale-95 shadow-[0_0_18px_rgba(239,68,68,0.55)]" : ""
            }`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => appendDigit(0)}
            aria-label="Enter 0"
            className={`rounded-lg py-3 font-semibold text-red-100 bg-red-950/40 border border-red-800/60 transition-all duration-150 active:scale-95 hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              pressedKey === 0 ? "scale-95 shadow-[0_0_18px_rgba(239,68,68,0.55)]" : ""
            }`}
          >
            0
          </button>
          <button
            type="button"
            onClick={clearInput}
            aria-label="Clear input"
            className={`rounded-lg py-3 text-sm font-semibold text-red-100 bg-red-950/30 border border-red-800/60 transition-all duration-150 active:scale-95 hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              pressedKey === "clear" ? "scale-95 shadow-[0_0_18px_rgba(239,68,68,0.55)]" : ""
            }`}
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
