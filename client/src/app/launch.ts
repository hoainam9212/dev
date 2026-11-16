// Shortcuts on the phone's home screen (long-press the app icon): "Continue", "My BJT books", "Review today".
// The native plugin `Launch` (MainActivity's package) hands over the route of the shortcut that opened the app,
// or that was tapped while it was already open.
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor, registerPlugin } from '@capacitor/core';

interface LaunchPlugin {
  /** The route of the shortcut that started the app, once; then empty. */
  take(): Promise<{ route?: string }>;
  addListener(event: 'route', fn: (e: { route?: string }) => void): Promise<{ remove: () => Promise<void> }>;
}

export const launchPlugin = registerPlugin<LaunchPlugin>('Launch');

/** Only app routes, never an address from outside. */
const safe = (r: string | undefined) => (r && /^\/[a-z/]*$/.test(r) ? r : undefined);

export function useLaunchRoutes(): void {
  const navigate = useNavigate();
  // `navigate` changes with every page; the launch route must be taken once, the listener added once
  const nav = useRef(navigate);
  nav.current = navigate;
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const go = (r: string | undefined) => {
      const route = safe(r);
      if (route) nav.current(route);
    };
    void launchPlugin
      .take()
      .then((x) => go(x.route))
      .catch(() => {});
    const handle = launchPlugin.addListener('route', (e) => go(e.route)).catch(() => null);
    return () => void handle.then((h) => h?.remove());
  }, []);
}
