/**
 * Small reusable heart glyph. It inherits `color` from its parent so it can be
 * tinted anywhere with a Tailwind text colour class.
 */
export default function HeartShape({
  className = "",
  style,
  filled = true,
  strokeWidth = 0,
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <path
        d="M16 29c-.5 0-1-.2-1.4-.5C7.4 22.3 2.8 18.3 2.8 12.9 2.8 8.4 6.3 5 10.6 5c2.1 0 4.1.9 5.4 2.4C17.3 5.9 19.3 5 21.4 5c4.3 0 7.8 3.4 7.8 7.9 0 5.4-4.6 9.4-11.8 15.6-.4.3-.9.5-1.4.5z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
