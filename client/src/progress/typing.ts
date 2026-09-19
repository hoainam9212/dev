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
 * `useTypingRuns`/`useKeyStats` chia sẻ MỘT subscription Dexie duy nhất cho mỗi
 * `limit` (thay vì mỗi hook tự `liveQuery` riêng, như bản đầu dùng `useLiveQuery`
 * của dexie-react-hooks). Lý do: `typingRuns` và `keyStats` thường đổi gần như
 * cùng lúc (xem `recordTypingRun`), nên hai subscription độc lập báo cập nhật
 * thành hai đợt riêng — trong test, khi ta ghi thẳng vào `db` (không qua sự
 * kiện người dùng), mỗi đợt có thể rơi ra ngoài `act()` và React log cảnh báo.
 * Gộp thành một subscription giúp Dexie dồn các đổi thay gần nhau lại, giảm số
 * lần cập nhật không đồng bộ với React — đồng thời `useSyncExternalStore`
 * (thay vì `useReducer` mà `useLiveQuery` dùng) là API đúng chuẩn React 18 cho
 * việc đồng bộ với một store nằm ngoài React.
 *
 * Việc lấy `typingRuns` vẫn giới hạn ở tầng DB (`orderBy('at').reverse().limit(limit)`,
 * giống bản gốc dùng `useLiveQuery`) chứ không tải cả bảng rồi lọc/sắp ở JS —
 * số dòng `keyStats` vốn nhỏ (≤ số phím trên bàn phím) nên lấy cả bảng là ổn.
 */
interface HubSnapshot {
  runs: TypingRun[];
  keyStats: KeyStatRow[];
  /** `true` khi lần đọc `db` gần nhất lỗi — dữ liệu hiển thị là bản cũ gần nhất còn dùng được. */
  error: boolean;
}

const EMPTY_HUB: HubSnapshot = { runs: [], keyStats: [], error: false };

interface HubStore {
  snapshot: HubSnapshot;
  listeners: Set<() => void>;
  sub: { unsubscribe: () => void } | null;
}

const hubStores = new Map<number, HubStore>();

function ensureHubSubscription(store: HubStore, limit: number): void {
  if (store.sub) return;
  const observable = liveQuery(async () => {
    const runsDesc = await db.typingRuns.orderBy('at').reverse().limit(limit).toArray();
    const keyStats = await db.keyStats.toArray();
    return { runs: [...runsDesc].reverse(), keyStats };
  });
  store.sub = observable.subscribe({
    next: (val) => {
      store.snapshot = { ...val, error: false };
      store.listeners.forEach((l) => l());
    },
    error: (e) => {
      // Không được nuốt lỗi lặng lẽ: log để còn biết IndexedDB/Dexie hỏng, và
      // báo cho UI qua cờ `error` (giữ nguyên dữ liệu cũ gần nhất để hiển thị).
      console.error('typing hub liveQuery failed', e);
      store.snapshot = { ...store.snapshot, error: true };
      store.listeners.forEach((l) => l());
    },
  });
}

function useHubSnapshot(limit: number): HubSnapshot {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      let store = hubStores.get(limit);
      if (!store) {
        store = { snapshot: EMPTY_HUB, listeners: new Set(), sub: null };
        hubStores.set(limit, store);
      }
      store.listeners.add(onStoreChange);
      ensureHubSubscription(store, limit);
      return () => {
        store!.listeners.delete(onStoreChange);
        if (store!.listeners.size === 0) {
          store!.sub?.unsubscribe();
          hubStores.delete(limit);
        }
      };
    },
    [limit],
  );
  const getSnapshot = useCallback(() => hubStores.get(limit)?.snapshot ?? EMPTY_HUB, [limit]);
  return useSyncExternalStore(subscribe, getSnapshot);
}

/**
 * Trả về cả hai phần dữ liệu qua MỘT lần gọi `useHubSnapshot()`. Component nào
 * cần cả `runs` lẫn `stats` (như `TypingHubPage`) nên gọi hook này thay vì gọi
 * `useTypingRuns` + `useKeyStats` riêng — gọi riêng vẫn đúng dữ liệu, nhưng tạo
 * hai lượt cập nhật rời nhau khi cả hai bảng cùng đổi.
 */
export function useTypingHub(limit = 20): { runs: TypingRun[]; stats: KeyStats; error: boolean } {
  const { runs, keyStats, error } = useHubSnapshot(limit);
  const stats = useMemo(() => Object.fromEntries(keyStats.map((r) => [r.key, { hit: r.hit, miss: r.miss }])), [keyStats]);
  return { runs, stats, error };
}

export function useTypingRuns(limit = 20): TypingRun[] {
  return useTypingHub(limit).runs;
}

export function useKeyStats(): KeyStats {
  return useTypingHub().stats;
}
