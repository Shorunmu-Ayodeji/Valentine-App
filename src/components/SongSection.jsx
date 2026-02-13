import song from "../assets/song.mp3";

export default function SongSection() {
  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 space-y-4 border border-red-900/40">
      <h3 className="font-serif text-2xl md:text-3xl text-red-400">Our Song</h3>
      <p className="text-red-100/80">Keep this on when words are hard.</p>
      <audio controls preload="metadata" className="w-full accent-red-500" src={song}>
        Your browser does not support the audio element.
      </audio>
      <p className="text-xs text-red-300/70">
        Drop your track at <code>src/assets/song.mp3</code> and it will play here.
      </p>
    </section>
  );
}