// Kiểu cho test import `real-shots.mjs` (script Node thuần, không qua tsc).
export type ShotApp = 'word' | 'excel' | 'ppt';
export declare const SHOTS: Record<ShotApp, string[]>;
/** argv sau tên script. Không ghi app thì là 'word' (cách gọi cũ vẫn chạy). */
export declare function parseArgs(argv: string[]): { app: ShotApp; file: string };
export declare function imagesBySheet(buf: Uint8Array): { name: string; images: { ext: string; data: Uint8Array }[] }[];
