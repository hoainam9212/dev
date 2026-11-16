import { registerPlugin } from '@capacitor/core';

/**
 * Android audio focus (native plugin `AudioFocus` in MainActivity's package).
 * The TTS plugin never requests focus, so music from other apps kept playing under the
 * app's speech. We take transient focus while speaking (music apps pause) and give it back
 * shortly after — the delay keeps music from resuming in the gaps between lines.
 */
export interface AudioFocusPlugin {
  /**
   * Starts the media-playback service, so sound keeps going with the screen off, and takes the audio focus
   * unless `focus` is false.
   */
  request(o?: { focus?: boolean }): Promise<void>;
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
/** The playback service runs (any owner). */
let held = false;
/** The system audio focus is ours (speech only). */
let focused = false;
let releaseTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Speech takes the system audio focus. Recordings only keep the playback service on: the WebView's player takes
 * the focus itself, and taking it as well paused that player, which gave the focus back, which resumed it — the
 * Play button flickered and nothing was heard (1.6.4–1.6.7).
 */
export async function acquireAudioFocus(owner: AudioOwner = 'tts'): Promise<void> {
  owners.add(owner);
  if (releaseTimer) {
    clearTimeout(releaseTimer);
    releaseTimer = null;
  }
  const focus = owner === 'tts';
  if (held && (focused || !focus)) return;
  held = true;
  if (focus) focused = true;
  await plugin.request({ focus }).catch(() => {});
}

export function releaseAudioFocusSoon(owner: AudioOwner = 'tts'): void {
  owners.delete(owner);
  if (owners.size > 0 || !held) return;
  if (releaseTimer) clearTimeout(releaseTimer);
  releaseTimer = setTimeout(() => {
    releaseTimer = null;
    if (owners.size > 0) return;
    held = false;
    focused = false;
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
  focused = false;
}
