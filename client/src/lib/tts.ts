export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

/** Speak Japanese text with the browser TTS. Returns false when unsupported. */
export function speak(text: string, opts: { rate?: number; lang?: string } = {}): boolean {
  if (!canSpeak()) return false;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang ?? 'ja-JP';
  u.rate = opts.rate ?? 0.9;
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang.replace('_', '-').toLowerCase().startsWith('ja'));
  if (voice) u.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
  return true;
}
