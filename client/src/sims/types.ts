import type { ComponentType } from 'react';
import type { OS, SimKind, Spotlight } from '@office-neko/shared';

export interface SimProps<S> {
  initial: S;
  onState: (state: S) => void;
  os: OS;
  /** Gợi ý bậc 2 đang bật: sim có thể cuộn phần tử đích vào tầm nhìn. */
  spotlight: Spotlight | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SimDefinition<S = any, A = any> {
  kind: SimKind;
  Component: ComponentType<SimProps<S>>;
  /** Reducer thuần; test nội dung dùng để phát lại `solution` của bài. */
  reduce: (state: S, action: A) => S;
}
