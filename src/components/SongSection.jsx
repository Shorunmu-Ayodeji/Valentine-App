export default function SongSection() {
  const spotifyTrackUrl = "https://open.spotify.com/track/6i2G4Ja3zhut9wYABPzxBy";

  return (
    <section className="glass-card rounded-2xl p-6 md:p-8 space-y-4 border border-red-900/40">
      <h3 className="font-serif text-2xl md:text-3xl text-red-400">Our Song</h3>
      <p className="text-red-100/80">Dance Alone - Preston Pablo, Qing Madi, Nonso Amadi.</p>
      <iframe
        title="Dance Alone - Spotify"
        src="https://open.spotify.com/embed/track/6i2G4Ja3zhut9wYABPzxBy?utm_source=generator"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
      />
      <p className="text-sm text-red-200/75">
        If the player does not load,{" "}
        <a
          href={spotifyTrackUrl}
          target="_blank"
          rel="noreferrer"
          className="text-red-300 underline underline-offset-2 hover:text-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
        >
          Open in Spotify
        </a>
        .
      </p>
    </section>
  );
}
