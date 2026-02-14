import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "bonita-journal-entries";
const MIN_ENTRY_LENGTH = 3;
const MAX_ENTRY_LENGTH = 400;

function formatDate(ts) {
  return new Date(ts).toLocaleString();
}

export default function JournalSection() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

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

  function validateEntry(value) {
    const trimmed = value.trim();
    if (trimmed.length < MIN_ENTRY_LENGTH) {
      return `Please write at least ${MIN_ENTRY_LENGTH} characters.`;
    }
    if (trimmed.length > MAX_ENTRY_LENGTH) {
      return `Please keep entries under ${MAX_ENTRY_LENGTH} characters.`;
    }
    return "";
  }

  function saveEntry() {
    if (!canSave) return;
    const nextError = validateEntry(text);
    if (nextError) {
      setError(nextError);
      return;
    }
    setEntries((prev) => [
      {
        id: crypto.randomUUID(),
        content: text.trim(),
        createdAt: Date.now()
      },
      ...prev
    ]);
    setText("");
    setError("");
  }

  function deleteEntry(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }

  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 space-y-5 border border-red-900/40">
      <h3 className="font-serif text-2xl md:text-3xl text-red-400">Write to me when I&apos;m not there.</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveEntry();
        }}
        className="space-y-3"
      >
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="Leave a note..."
          rows={4}
          maxLength={MAX_ENTRY_LENGTH}
          aria-label="Write a note"
          className="w-full rounded-lg bg-black/60 border border-red-900/60 p-3 text-red-100 placeholder-red-200/45 focus:outline-none focus:ring-2 focus:ring-red-500/60"
        />
        <div className="flex items-center justify-between text-xs text-red-300/75">
          <span aria-live="polite">{error || `Max ${MAX_ENTRY_LENGTH} characters.`}</span>
          <span>{text.trim().length}/{MAX_ENTRY_LENGTH}</span>
        </div>
        <button
          type="submit"
          disabled={!canSave}
          className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium disabled:opacity-45 disabled:cursor-not-allowed hover:bg-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Save
        </button>
      </form>

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
                aria-label={`Delete note from ${formatDate(entry.createdAt)}`}
                className="text-red-300 hover:text-red-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
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
