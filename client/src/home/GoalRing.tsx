export function GoalRing({ minutes, goal }: { minutes: number; goal: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const ratio = Math.min(1, goal > 0 ? minutes / goal : 0);
  return (
    <svg role="img" aria-label={`Hôm nay: ${minutes}/${goal} phút`} viewBox="0 0 80 80" width={88} height={88}>
      <circle cx="40" cy="40" r={r} fill="none" stroke="#FFE3D3" strokeWidth="8" />
      <circle
        cx="40" cy="40" r={r} fill="none" stroke="#FF7A9A" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - ratio)} transform="rotate(-90 40 40)"
      />
      <text x="40" y="38" textAnchor="middle" fontSize="14" fontWeight="800" fill="#3B2E4A">{minutes}/{goal}</text>
      <text x="40" y="54" textAnchor="middle" fontSize="10" fill="#7D7090">phút</text>
    </svg>
  );
}
