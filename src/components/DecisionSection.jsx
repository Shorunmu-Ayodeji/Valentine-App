/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";

function Confetti({ active }) {
  const pieces = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece}
          className="absolute block rounded-sm animate-bounce"
          style={{
            left: `${(piece * 13) % 100}%`,
            top: `${(piece * 11) % 50}%`,
            width: `${4 + (piece % 4) * 2}px`,
            height: `${8 + (piece % 5) * 2}px`,
            background: piece % 2 ? "rgba(248,113,113,0.9)" : "rgba(252,165,165,0.85)",
            animationDuration: `${0.8 + (piece % 5) * 0.2}s`
          }}
        />
      ))}
    </div>
  );
}

function HeartBurst({ active }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const distance = 56 + (i % 4) * 14;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          delay: (i % 5) * 40,
          size: i % 3 === 0 ? "1.7rem" : "1.35rem"
        };
      }),
    []
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="absolute h-28 w-28 rounded-full bg-red-400/20 blur-2xl animate-pulse" />
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute select-none drop-shadow-[0_0_14px_rgba(248,113,113,0.95)]"
          style={{
            fontSize: heart.size,
            animation: "heartBurstPop 900ms cubic-bezier(0.22,1,0.36,1) forwards",
            animationDelay: `${heart.delay}ms`,
            "--tx": `${heart.x}px`,
            "--ty": `${heart.y}px`
          }}
        >
          &#10084;&#65039;
        </span>
      ))}
    </div>
  );
}

export default function DecisionSection() {
  const [choice, setChoice] = useState("");
  const [burst, setBurst] = useState(false);
  const [valentineAnswer, setValentineAnswer] = useState("");
  const [noCount, setNoCount] = useState(0);
  const [heartBurst, setHeartBurst] = useState(false);

  const yesScale = Math.min(1 + noCount * 0.18, 2.2);

  function accept() {
    setChoice("yes");
    setBurst(true);
    setTimeout(() => setBurst(false), 1300);
  }

  function scared() {
    setChoice("scared");
  }

  function chooseValentineYes() {
    setValentineAnswer("yes");
    setHeartBurst(true);
    setTimeout(() => {
      setHeartBurst(false);
      setNoCount(0);
    }, 1200);
  }

  function chooseValentineNo() {
    setValentineAnswer("no");
    setNoCount((count) => Math.min(count + 1, 3));
    setHeartBurst(true);
    setTimeout(() => {
      setHeartBurst(false);
      setNoCount(0);
      setValentineAnswer("");
    }, 1200);
  }

  return (
    <section className="relative glass-card rounded-2xl p-6 md:p-8 space-y-6 border border-red-900/40 overflow-hidden">
      <Confetti active={burst} />
      <HeartBurst active={heartBurst} />

      <h3 className="font-serif text-2xl md:text-3xl text-red-400">
        Can we choose each other properly this time?
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={accept}
          className="px-5 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-all duration-200 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] active:scale-95"
        >
          Come kiss me
        </button>

        <button
          type="button"
          onClick={scared}
          className="px-5 py-3 rounded-lg bg-red-950/50 text-red-100 border border-red-800/60 hover:bg-red-900/60 transition-all duration-200 active:scale-95"
        >
          Ohh chim
        </button>
      </div>

      {choice === "yes" && (
        <div className="space-y-4">
          <p className="text-red-200 font-sans animate-bounce drop-shadow-[0_0_12px_rgba(239,68,68,0.45)]">
            Will you be my valentine?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <button
              type="button"
              onClick={chooseValentineYes}
              style={{ transform: `scale(${yesScale})` }}
              className="px-5 py-3 rounded-lg bg-red-500 text-white font-semibold transition-all duration-300 hover:bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.5)] hover:shadow-[0_0_24px_rgba(248,113,113,0.8)]"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={chooseValentineNo}
              className="px-5 py-3 rounded-lg bg-red-950/50 text-red-100 border border-red-800/60 hover:bg-red-900/60 transition-all duration-200"
            >
              No
            </button>
          </div>

          {valentineAnswer === "yes" && (
            <p className="text-red-100 font-sans drop-shadow-[0_0_14px_rgba(248,113,113,0.95)] animate-pulse">
              i love you
            </p>
          )}
        </div>
      )}

      {choice === "scared" && <p className="text-red-200 font-sans">Be a lady nau</p>}

      <style>{`
        @keyframes heartBurstPop {
          0% {
            transform: translate(0, 0) scale(0.55);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1.04);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
