import { useCallback, useMemo, useSyncExternalStore } from 'react';
import Dexie, { liveQuery } from 'dexie';
import { dayKey, type KeyStats } from '@office-neko/shared';
import { db, type KeyStatRow, type TypingRun } from '../db/db';

export async function recordTypingRun(r: {
  profileId: string;
  mode: string;
  wpm: number;
  accuracy: number;
  elapsedMs: number;
  keyStats: KeyStats;
  now?: Date;
}): Promise<void> {
  const now = r.now ?? new Date();
  await db.transaction('rw', db.typingRuns, db.keyPractice, db.dailyActivity, async () => {
    await db.typingRuns.add({ profileId: r.profileId, at: now.toISOString(), mode: r.mode, wpm: r.wpm, accuracy: r.accuracy });
    for (const [key, s] of Object.entries(r.keyStats)) {
      const prev = await db.keyPractice.get([r.profileId, key]);
      await db.keyPractice.put({ profileId: r.profileId, key, hit: (prev?.hit ?? 0) + s.hit, miss: (prev?.miss ?? 0) + s.miss });
    }
    const day = dayKey(now);
    const act = (await db.dailyActivity.get([r.profileId, day])) ?? { profileId: r.profileId, day, minutes: 0, xp: 0 };
    await db.dailyActivity.put({ ...act, minutes: act.minutes + Math.max(1, Math.round(r.elapsedMs / 60_000)) });
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

/** Khoá gồm cả `profileId`: hai người học không được dùng chung một snapshot. */
const hubStores = new Map<string, HubStore>();

function ensureHubSubscription(store: HubStore, profileId: string, limit: number): void {
  if (store.sub) return;
  const observable = liveQuery(async () => {
    const runsDesc = await db.typingRuns
      .where('[profileId+at]')
      .between([profileId, Dexie.minKey], [profileId, Dexie.maxKey])
      .reverse()
      .limit(limit)
      .toArray();
    const keyStats = await db.keyPractice.where('profileId').equals(profileId).toArray();
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

function useHubSnapshot(profileId: string | null, limit: number): HubSnapshot {
  const key = `${profileId ?? ''}:${limit}`;
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!profileId) return () => {};
      let store = hubStores.get(key);
      if (!store) {
        store = { snapshot: EMPTY_HUB, listeners: new Set(), sub: null };
        hubStores.set(key, store);
      }
      store.listeners.add(onStoreChange);
      ensureHubSubscription(store, profileId, limit);
      return () => {
        store!.listeners.delete(onStoreChange);
        if (store!.listeners.size === 0) {
          store!.sub?.unsubscribe();
          hubStores.delete(key);
        }
      };
    },
    [key, profileId, limit],
  );
  const getSnapshot = useCallback(() => (profileId ? (hubStores.get(key)?.snapshot ?? EMPTY_HUB) : EMPTY_HUB), [key, profileId]);
  return useSyncExternalStore(subscribe, getSnapshot);
}

/**
 * Trả về cả hai phần dữ liệu qua MỘT lần gọi `useHubSnapshot()`. Component nào
 * cần cả `runs` lẫn `stats` (như `TypingHubPage`) nên gọi hook này thay vì gọi
 * `useTypingRuns` + `useKeyStats` riêng — gọi riêng vẫn đúng dữ liệu, nhưng tạo
 * hai lượt cập nhật rời nhau khi cả hai bảng cùng đổi.
 */
export function useTypingHub(profileId: string | null, limit = 20): { runs: TypingRun[]; stats: KeyStats; error: boolean } {
  const { runs, keyStats, error } = useHubSnapshot(profileId, limit);
  const stats = useMemo(() => Object.fromEntries(keyStats.map((r) => [r.key, { hit: r.hit, miss: r.miss }])), [keyStats]);
  return { runs, stats, error };
}

export function useTypingRuns(profileId: string | null, limit = 20): TypingRun[] {
  return useTypingHub(profileId, limit).runs;
}

export function useKeyStats(profileId: string | null): KeyStats {
  return useTypingHub(profileId).stats;
}
