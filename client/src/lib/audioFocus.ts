import { registerPlugin } from '@capacitor/core';

/**
 * Android audio focus (native plugin `AudioFocus` in MainActivity's package).
 * The TTS plugin never requests focus, so music from other apps kept playing under the
 * app's speech. We take transient focus while speaking (music apps pause) and give it back
 * shortly after — the delay keeps music from resuming in the gaps between lines.
 */
export interface AudioFocusPlugin {
  /** Takes focus and starts the media-playback service, so sound keeps going with the screen off. */
  request(): Promise<void>;
  abandon(): Promise<void>;
  /** `interrupted`: another app took the audio; `stopRequested`: Stop pressed in the notification. */
  addListener(event: 'interrupted' | 'stopRequested', fn: () => void): Promise<{ remove: () => Promise<void> }>;
}

export const plugin = registerPlugin<AudioFocusPlugin>('AudioFocus');

/** How long to wait after speech ends before letting other apps' audio resume. */
export const RELEASE_DELAY_MS = 600;

let held = false;
let releaseTimer: ReturnType<typeof setTimeout> | null = null;

export async function acquireAudioFocus(): Promise<void> {
  if (releaseTimer) {
    clearTimeout(releaseTimer);
    releaseTimer = null;
  }
  if (held) return;
  held = true;
  await plugin.request().catch(() => {});
}

export function releaseAudioFocusSoon(): void {
  if (releaseTimer) clearTimeout(releaseTimer);
  releaseTimer = setTimeout(() => {
    releaseTimer = null;
    held = false;
    void plugin.abandon().catch(() => {});
  }, RELEASE_DELAY_MS);
}
