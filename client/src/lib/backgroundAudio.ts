import { Capacitor } from '@capacitor/core';
import { acquireAudioFocus, forgetAudioFocus, plugin, releaseAudioFocusSoon } from './audioFocus';
import { stopSpeaking } from './tts';

/**
 * Sound that is not speech: book recordings play through <audio>, which never asks Android for audio focus, so
 * music from other apps kept playing under them. Every media element that starts takes the focus (other apps
 * pause; the native side also starts the media-playback service that keeps sound going with the screen off) and
 * gives it back shortly after the last one stops.
 *
 * The other way round: when another app takes the audio (a call, the user starting music) or the user presses
 * Stop in the notification, all of the app's sound stops.
 */
export function installBackgroundAudio(): () => void {
  const playing = new Set<HTMLMediaElement>();

  const finished = (m: HTMLMediaElement) => {
    if (!playing.delete(m)) return;
    if (playing.size === 0) releaseAudioFocusSoon('media');
  };
  // `play` is caught on document (media events do not bubble: capture phase). The end is watched on the element
  // itself, because an element React removes mid-play is paused after it left the page — that `pause` never
  // reaches document, and the focus (with the notification and the wake lock) would be kept for good.
  const onPlay = (e: Event) => {
    const m = e.target;
    if (!(m instanceof HTMLMediaElement) || playing.has(m)) return;
    playing.add(m);
    const done = () => {
      for (const ev of ['pause', 'ended', 'emptied'] as const) m.removeEventListener(ev, done);
      finished(m);
    };
    for (const ev of ['pause', 'ended', 'emptied'] as const) m.addEventListener(ev, done);
    void acquireAudioFocus('media');
  };
  const stopAll = () => {
    stopSpeaking();
    for (const m of new Set([...playing, ...document.querySelectorAll<HTMLMediaElement>('audio, video')])) if (!m.paused) m.pause();
  };

  document.addEventListener('play', onPlay, true);

  const handles: Promise<{ remove: () => Promise<void> } | null>[] = [];
  if (Capacitor.isNativePlatform()) {
    handles.push(plugin.addListener('interrupted', stopAll).catch(() => null));
    handles.push(
      plugin
        .addListener('stopRequested', () => {
          stopAll();
          // the service is already gone: the next sound must start it again
          playing.clear();
          forgetAudioFocus();
        })
        .catch(() => null),
    );
  }

  return () => {
    document.removeEventListener('play', onPlay, true);
    for (const h of handles) void h.then((x) => x?.remove());
  };
}
