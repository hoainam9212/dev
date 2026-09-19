import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { liveQuery } from 'dexie';
import { dayKey, type KeyStats } from '@office-neko/shared';
import { db, type KeyStatRow, type TypingRun } from '../db/db';

export async function recordTypingRun(r: {
  mode: string;
  wpm: number;
  accuracy: number;
  elapsedMs: number;
  keyStats: KeyStats;
  now?: Date;
}): Promise<void> {
  const now = r.now ?? new Date();
  await db.transaction('rw', db.typingRuns, db.keyStats, db.activity, async () => {
    await db.typingRuns.add({ at: now.toISOString(), mode: r.mode, wpm: r.wpm, accuracy: r.accuracy });
    for (const [key, s] of Object.entries(r.keyStats)) {
      const prev = await db.keyStats.get(key);
      await db.keyStats.put({ key, hit: (prev?.hit ?? 0) + s.hit, miss: (prev?.miss ?? 0) + s.miss });
    }
    const day = dayKey(now);
    const act = (await db.activity.get(day)) ?? { day, minutes: 0, xp: 0 };
    await db.activity.put({ ...act, minutes: act.minutes + Math.max(1, Math.round(r.elapsedMs / 60_000)) });
  });
}

/**
 * `useTypingRuns`/`useKeyStats` chia sẻ MỘT subscription Dexie duy nhất (thay vì
 * mỗi hook tự `liveQuery` riêng, như bản đầu dùng `useLiveQuery` của
 * dexie-react-hooks). Lý do: `typingRuns` và `keyStats` thường đổi gần như cùng
 * lúc (xem `recordTypingRun`), nên hai subscription độc lập báo cập nhật thành
 * hai đợt riêng — trong test, khi ta ghi thẳng vào `db` (không qua sự kiện
 * người dùng), mỗi đợt có thể rơi ra ngoài `act()` và React log cảnh báo. Gộp
 * thành một subscription giúp Dexie dồn các đổi thay gần nhau lại, giảm số lần
 * cập nhật không đồng bộ với React — đồng thời `useSyncExternalStore` (thay vì
 * `useReducer` mà `useLiveQuery` dùng) là API đúng chuẩn React 18 cho việc đồng
 * bộ với một store nằm ngoài React.
 */
interface HubSnapshot {
  runs: TypingRun[];
  keyStats: KeyStatRow[];
}

const EMPTY_HUB: HubSnapshot = { runs: [], keyStats: [] };
let hubSnapshot: HubSnapshot = EMPTY_HUB;
const hubListeners = new Set<() => void>();
let hubSub: { unsubscribe: () => void } | null = null;

function ensureHubSubscription(): void {
  if (hubSub) return;
  const observable = liveQuery(async () => {
    const [runs, keyStats] = await Promise.all([db.typingRuns.toArray(), db.keyStats.toArray()]);
    return { runs, keyStats };
  });
  hubSub = observable.subscribe({
    next: (val) => {
      hubSnapshot = val;
      hubListeners.forEach((l) => l());
    },
    error: () => undefined,
  });
}

function useHubSnapshot(): HubSnapshot {
  const subscribe = useCallback((onStoreChange: () => void) => {
    hubListeners.add(onStoreChange);
    ensureHubSubscription();
    return () => {
      hubListeners.delete(onStoreChange);
      if (hubListeners.size === 0 && hubSub) {
        hubSub.unsubscribe();
        hubSub = null;
        hubSnapshot = EMPTY_HUB;
      }
    };
  }, []);
  const getSnapshot = useCallback(() => hubSnapshot, []);
  return useSyncExternalStore(subscribe, getSnapshot);
}

/**
 * Trả về cả hai phần dữ liệu qua MỘT lần gọi `useHubSnapshot()`. Component nào
 * cần cả `runs` lẫn `stats` (như `TypingHubPage`) nên gọi hook này thay vì gọi
 * `useTypingRuns` + `useKeyStats` riêng — gọi riêng vẫn đúng dữ liệu, nhưng tạo
 * hai lượt cập nhật rời nhau khi cả hai bảng cùng đổi.
 */
export function useTypingHub(limit = 20): { runs: TypingRun[]; stats: KeyStats } {
  const { runs, keyStats } = useHubSnapshot();
  const sortedRuns = useMemo(() => {
    const sorted = [...runs].sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
    return sorted.slice(-limit);
  }, [runs, limit]);
  const stats = useMemo(() => Object.fromEntries(keyStats.map((r) => [r.key, { hit: r.hit, miss: r.miss }])), [keyStats]);
  return { runs: sortedRuns, stats };
}

export function useTypingRuns(limit = 20): TypingRun[] {
  return useTypingHub(limit).runs;
}

export function useKeyStats(): KeyStats {
  return useTypingHub().stats;
}
