'use client';

import { useRef, useState } from 'react';

export function InvitationControls() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState('');
  const toggleMusic = async () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); setPlaying(false); return; }
    try { await audio.current.play(); setPlaying(true); setAudioError(''); }
    catch { setAudioError('Musik belum dapat diputar. Silakan coba kembali.'); }
  };

  return (
    <>
      <a href="#invitation" className="skip-link">Menuju undangan</a>
      <button className="music-button fixed grid place-items-center" data-reveal="right" onClick={toggleMusic} aria-label={playing ? 'Jeda musik undangan' : 'Putar musik undangan'} aria-pressed={playing}>
        {playing ? <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true"><path d="M3 2h4v14H3zM10 2h4v14h-4z" /></svg> : <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true"><path d="M3 1v16l12-8z" /></svg>}
      </button>
      <audio ref={audio} src="/audio/wedding.mp3" preload="none" loop />
      <span className="sr-only" role="status">{audioError}</span>
    </>
  );
}
