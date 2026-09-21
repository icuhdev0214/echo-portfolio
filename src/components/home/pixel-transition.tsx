const COLS = 24;
const ROWS = 12;

export function PixelTransition({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const delay = col * 0.014 + row * 0.01;
        return (
          <div
            key={i}
            style={{
              background: "var(--color-accent)",
              animation: `px .62s ease both`,
              animationDelay: `${delay.toFixed(3)}s`,
            }}
          />
        );
      })}
    </div>
  );
}
