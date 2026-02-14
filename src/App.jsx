import { useEffect, useState } from "react";
import PasscodeGate from "./components/PasscodeGate";
import StorySection from "./components/StorySection";
import DecisionSection from "./components/DecisionSection";
import SongSection from "./components/SongSection";
import JournalSection from "./components/JournalSection";

const INTRO_DURATION = 3000;
const UNLOCKED_STORAGE_KEY = "bonita-site-unlocked";

function IntroScreen() {
  return (
    <section className="bg-black text-red-500 text-6xl md:text-7xl font-bold flex items-center justify-center h-screen animate-pulse overflow-hidden">
      <h1 className="animate-cinematicZoom drop-shadow-[0_0_22px_rgba(239,68,68,0.7)] tracking-[0.2em] text-center px-4">
        NETFLIX
      </h1>
    </section>
  );
}

function WelcomeOverlay({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-40 bg-black/95 flex items-center justify-center transition-opacity duration-1000">
      <p className="text-4xl md:text-6xl text-red-500 font-bold animate-pulse drop-shadow-[0_0_24px_rgba(239,68,68,0.7)] text-center px-4">
        Welcome, Bonita <span className="inline-block animate-pulse">&#10084;&#65039;</span>
      </p>
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((id) => {
        const left = (id * 17) % 100;
        const delay = `${(id % 7) * 0.4}s`;
        const size = `${10 + (id % 4) * 6}px`;
        return (
          <span
            key={id}
            className="absolute rounded-full bg-red-500/20 blur-[1px] animate-bounce"
            style={{
              left: `${left}%`,
              top: `${(id * 29) % 100}%`,
              width: size,
              height: size,
              animationDuration: `${2 + (id % 5) * 0.6}s`,
              animationDelay: delay
            }}
          />
        );
      })}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState(() => {
    const unlocked = localStorage.getItem(UNLOCKED_STORAGE_KEY) === "true";
    return unlocked ? "main" : "intro";
  });
  const [isUnlocked, setIsUnlocked] = useState(() => localStorage.getItem(UNLOCKED_STORAGE_KEY) === "true");

  useEffect(() => {
    if (stage !== "intro") return undefined;
    const timer = setTimeout(() => setStage(isUnlocked ? "main" : "gate"), INTRO_DURATION);
    return () => clearTimeout(timer);
  }, [stage, isUnlocked]);

  return (
    <main className="relative min-h-screen bg-black text-red-100 font-sans">
      {stage === "intro" && <IntroScreen />}

      {stage === "gate" && !isUnlocked && (
        <PasscodeGate
          onSuccess={() => {
            localStorage.setItem(UNLOCKED_STORAGE_KEY, "true");
            setIsUnlocked(true);
            setStage("welcome");
          }}
        />
      )}

      {stage === "welcome" && <WelcomeOverlay onDone={() => setStage("main")} />}

      {stage === "main" && (
        <div className="relative isolate px-4 py-14 md:py-20">
          <div className="absolute inset-0 -z-10 animate-heartbeat bg-[radial-gradient(circle_at_center,rgba(127,29,29,0.22),transparent_55%)]" />
          <FloatingParticles />

          <section className="mx-auto max-w-4xl space-y-8 transition-opacity duration-1000 opacity-100">
            <header className="text-center space-y-4 animate-fadeRise">
              <h1 className="text-4xl md:text-6xl font-serif text-red-500 drop-shadow-[0_0_16px_rgba(239,68,68,0.45)]">
                I Don&apos;t Like You
              </h1>
              <p className="text-red-200/80 font-sans">A private reel for Bonita.</p>
              <button
                type="button"
                onClick={() => setStage("intro")}
                className="inline-flex px-3 py-1.5 rounded-md border border-red-800/70 bg-red-950/30 text-red-200 text-sm hover:bg-red-900/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Replay intro
              </button>
            </header>

            <StorySection />
            <DecisionSection />
            <SongSection />
            <JournalSection />
          </section>
        </div>
      )}
    </main>
  );
}
