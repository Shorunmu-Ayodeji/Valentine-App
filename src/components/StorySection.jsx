import { useEffect, useState } from "react";

const lines = ["I don\'t like you.", "I love you."];

export default function StorySection() {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const [showBody, setShowBody] = useState(false);
  const activeLine = lines[phase] ?? "";
  const isTyping = typed.length < activeLine.length;

  useEffect(() => {
    let timer;

    if (phase === 0) {
      if (typed.length < lines[0].length) {
        timer = setTimeout(() => {
          setTyped(lines[0].slice(0, typed.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setPhase(1);
          setTyped("");
        }, 850);
      }
    }

    if (phase === 1) {
      if (typed.length < lines[1].length) {
        timer = setTimeout(() => {
          setTyped(lines[1].slice(0, typed.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => setShowBody(true), 300);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, typed]);

  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 space-y-4 border border-red-900/40">
      <p className="font-serif text-3xl md:text-4xl text-red-400 min-h-[3.5rem]">
        {typed}
        {isTyping && <span className="animate-pulse">|</span>}
      </p>

      {showBody && (
        <div className="space-y-3 text-red-100/85 leading-relaxed animate-fadeRise">
          <p>
            We broke things, rebuilt them, and lost our way in noise more than once.
          </p>
          <p>
            But after every storm, one truth stayed clear: chaos gets quieter when you are near.
          </p>
          <p>
            Bonita, this is me choosing peace, choosing honesty, and choosing you with open eyes.
          </p>
        </div>
      )}
    </section>
  );
}
