export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="18.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="18.5"
        ry="7"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
      <circle cx="20" cy="20" r="3.2" fill="currentColor" />
      <circle cx="34" cy="15" r="1.6" fill="currentColor" />
    </svg>
  );
}
