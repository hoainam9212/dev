export type AccessoryId = 'bow' | 'glasses' | 'scarf' | 'hat' | 'crown';

/** Phụ kiện cho Mochi, mở dần theo cấp (không mua bằng XP). Sắp theo cấp tăng dần. */
export const ACCESSORIES: readonly { id: AccessoryId; name: string; level: number }[] = [
  { id: 'bow', name: 'Nơ hồng', level: 2 },
  { id: 'glasses', name: 'Kính tròn', level: 3 },
  { id: 'scarf', name: 'Khăn quàng', level: 4 },
  { id: 'hat', name: 'Mũ len', level: 6 },
  { id: 'crown', name: 'Vương miện', level: 10 },
];

export function accessoriesUnlocked(level: number): AccessoryId[] {
  return ACCESSORIES.filter((a) => a.level <= level).map((a) => a.id);
}

/** Phụ kiện vừa mở khi lên từ `prevLevel` tới `level`. */
export function newlyUnlocked(prevLevel: number, level: number): AccessoryId[] {
  return ACCESSORIES.filter((a) => a.level > prevLevel && a.level <= level).map((a) => a.id);
}
