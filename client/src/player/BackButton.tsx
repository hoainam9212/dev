/** Lùi về bước trước để xem lại; bước đó hiện y như lúc rời đi và không tính điểm lại. */
export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn-soft" data-help-id="player.back" onClick={onClick}>
      ← Quay lại
    </button>
  );
}
