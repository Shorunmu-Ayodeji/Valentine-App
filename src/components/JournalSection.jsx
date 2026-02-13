import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "bonita-journal-entries";

function formatDate(ts) {
  return new Date(ts).toLocaleString();
}

export default function JournalSection() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setEntries(parsed);
      }
    } catch {
      setEntries([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const canSave = useMemo(() => text.trim().length > 0, [text]);

  function saveEntry() {
    if (!canSave) return;
    setEntries((prev) => [
      {
        id: crypto.randomUUID(),
        content: text.trim(),
        createdAt: Date.now()
      },
      ...prev
    ]);
    setText("");
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 space-y-5 border border-red-900/40">
      <h3 className="font-serif text-2xl md:text-3xl text-red-400">Write to me when I&apos;m not there.</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a note..."
        rows={4}
        className="w-full rounded-lg bg-black/60 border border-red-900/60 p-3 text-red-100 placeholder-red-200/45 focus:outline-none focus:ring-2 focus:ring-red-500/60"
      />

      <button
        type="button"
        disabled={!canSave}
        onClick={saveEntry}
        className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium disabled:opacity-45 disabled:cursor-not-allowed hover:bg-red-500 transition-colors"
      >
        Save
      </button>

      <div className="space-y-3">
        {entries.length === 0 && <p className="text-red-200/70 text-sm">No notes yet.</p>}

        {entries.map((entry) => (
          <article key={entry.id} className="rounded-lg border border-red-900/50 bg-black/40 p-4 space-y-2">
            <p className="text-red-100 whitespace-pre-wrap">{entry.content}</p>
            <div className="flex items-center justify-between text-xs text-red-300/70">
              <span>{formatDate(entry.createdAt)}</span>
              <button
                type="button"
                onClick={() => deleteEntry(entry.id)}
                className="text-red-300 hover:text-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}