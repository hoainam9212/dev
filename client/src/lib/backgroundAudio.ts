import { Capacitor } from '@capacitor/core';
import { acquireAudioFocus, plugin, releaseAudioFocusSoon } from './audioFocus';
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
  const media = () => [...document.querySelectorAll<HTMLMediaElement>('audio, video')];
  const onPlay = (e: Event) => {
    if (e.target instanceof HTMLMediaElement) void acquireAudioFocus();
  };
  const onStop = (e: Event) => {
    if (e.target instanceof HTMLMediaElement && media().every((m) => m.paused)) releaseAudioFocusSoon();
  };
  const stopAll = () => {
    stopSpeaking();
    for (const m of media()) if (!m.paused) m.pause();
  };

  // media events do not bubble: listen in the capture phase to see every element
  document.addEventListener('play', onPlay, true);
  document.addEventListener('pause', onStop, true);
  document.addEventListener('ended', onStop, true);

  const handles: Promise<{ remove: () => Promise<void> } | null>[] = [];
  if (Capacitor.isNativePlatform()) {
    for (const event of ['interrupted', 'stopRequested'] as const) {
      handles.push(plugin.addListener(event, stopAll).catch(() => null));
    }
  }

  return () => {
    document.removeEventListener('play', onPlay, true);
    document.removeEventListener('pause', onStop, true);
    document.removeEventListener('ended', onStop, true);
    for (const h of handles) void h.then((x) => x?.remove());
  };
}
