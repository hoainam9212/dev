import { useEffect } from 'react';
import type { Lang } from '@nihongo/shared';
import { useSettings } from '../store/settings';
import { vi } from './vi';
import { en } from './en';

export type { Lang } from '@nihongo/shared';
export type Dict = typeof vi;

const DICTS: Record<Lang, Dict> = { vi, en };

export function useLang(): Lang {
  return useSettings((s) => s.lang);
}

export function useT(): Dict {
  return DICTS[useLang()];
}

/** For non-React callers (API errors, loaders): the language active at call time. */
export function getT(): Dict {
  return DICTS[useSettings.getState().lang];
}

/** Keeps `<html lang>` in step with the setting; call once near the root. */
export function useSyncHtmlLang(): void {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}
