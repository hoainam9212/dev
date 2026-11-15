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

/** Who is making sound: speech (tts.ts) or recordings (backgroundAudio.ts). Focus is kept while any of them is. */
export type AudioOwner = 'tts' | 'media';

const owners = new Set<AudioOwner>();
let held = false;
let releaseTimer: ReturnType<typeof setTimeout> | null = null;

export async function acquireAudioFocus(owner: AudioOwner = 'tts'): Promise<void> {
  owners.add(owner);
  if (releaseTimer) {
    clearTimeout(releaseTimer);
    releaseTimer = null;
  }
  if (held) return;
  held = true;
  await plugin.request().catch(() => {});
}

export function releaseAudioFocusSoon(owner: AudioOwner = 'tts'): void {
  owners.delete(owner);
  if (owners.size > 0 || !held) return;
  if (releaseTimer) clearTimeout(releaseTimer);
  releaseTimer = setTimeout(() => {
    releaseTimer = null;
    if (owners.size > 0) return;
    held = false;
    void plugin.abandon().catch(() => {});
  }, RELEASE_DELAY_MS);
}

/** The native side already stopped (Stop in the notification): forget the focus now, so the next sound asks again. */
export function forgetAudioFocus(): void {
  owners.clear();
  if (releaseTimer) clearTimeout(releaseTimer);
  releaseTimer = null;
  if (held) void plugin.abandon().catch(() => {});
  held = false;
}
