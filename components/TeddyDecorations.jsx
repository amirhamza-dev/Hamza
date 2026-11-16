/**
 * Original teddy bear illustrations, drawn as inline SVG so the website never
 * depends on external (and possibly copyrighted) artwork.
 *
 * Variants: "plain" | "heart" | "flowers" | "letter"
 */

const TONES = {
  caramel: { fur: "#e0b387", furDark: "#c9945f", belly: "#fff2e4" },
  blush: { fur: "#f0c3b1", furDark: "#dfa78f", belly: "#fff4ee" },
  cream: { fur: "#edcdae", furDark: "#d7ae86", belly: "#fff8ef" },
};

function Flower({ x, y, colour = "#ff9dbd", core = "#ffe37a" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-4.6"
          rx="3.1"
          ry="4.6"
          fill={colour}
          transform={`rotate(${angle})`}
          opacity="0.95"
        />
      ))}
      <circle cx="0" cy="0" r="2.1" fill={core} />
    </g>
  );
}

export function TeddyBear({
  variant = "plain",
  tone = "caramel",
  className = "",
  style,
  title = "Cute teddy bear",
}) {
  const colours = TONES[tone] ?? TONES.caramel;
  const decorative = !title;

  return (
    <svg
      viewBox="0 0 120 152"
      className={className}
      style={style}
      {...(decorative
        ? { "aria-hidden": "true", focusable: "false", role: "presentation" }
        : { role: "img", "aria-label": title })}
    >
      {/* soft ground shadow */}
      <ellipse cx="60" cy="146" rx="34" ry="5.5" fill="#e2577f" opacity="0.12" />

      {/* ears */}
      <circle cx="31" cy="27" r="14" fill={colours.furDark} />
      <circle cx="89" cy="27" r="14" fill={colours.furDark} />
      <circle cx="31" cy="27" r="7.6" fill="#ffc2d6" opacity="0.9" />
      <circle cx="89" cy="27" r="7.6" fill="#ffc2d6" opacity="0.9" />

      {/* limbs sit behind the body */}
      <ellipse cx="24" cy="98" rx="12" ry="16.5" fill={colours.furDark} transform="rotate(-22 24 98)" />
      <ellipse cx="96" cy="98" rx="12" ry="16.5" fill={colours.furDark} transform="rotate(22 96 98)" />
      <circle cx="42" cy="133" r="14.5" fill={colours.furDark} />
      <circle cx="78" cy="133" r="14.5" fill={colours.furDark} />
      <ellipse cx="42" cy="135" rx="7.4" ry="5.4" fill="#ffc2d6" opacity="0.85" />
      <ellipse cx="78" cy="135" rx="7.4" ry="5.4" fill="#ffc2d6" opacity="0.85" />

      {/* body */}
      <ellipse cx="60" cy="103" rx="32" ry="29" fill={colours.fur} />
      <ellipse cx="60" cy="109" rx="18.5" ry="16.5" fill={colours.belly} />

      {/* head */}
      <circle cx="60" cy="50" r="32" fill={colours.fur} />
      <ellipse cx="60" cy="63" rx="16.5" ry="12.6" fill={colours.belly} />
      <ellipse cx="60" cy="56.5" rx="6.4" ry="4.5" fill="#5b3a2e" />
      <path
        d="M60 61.5v4"
        stroke="#5b3a2e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M60 65.5q-4.6 4.4-8.6 1.4M60 65.5q4.6 4.4 8.6 1.4"
        stroke="#5b3a2e"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="46" cy="47" r="4" fill="#4a2f28" />
      <circle cx="74" cy="47" r="4" fill="#4a2f28" />
      <circle cx="47.4" cy="45.6" r="1.3" fill="#ffffff" opacity="0.9" />
      <circle cx="75.4" cy="45.6" r="1.3" fill="#ffffff" opacity="0.9" />
      <ellipse cx="35" cy="61" rx="6.6" ry="4.4" fill="#ff9dbd" opacity="0.45" />
      <ellipse cx="85" cy="61" rx="6.6" ry="4.4" fill="#ff9dbd" opacity="0.45" />

      {/* what the teddy is holding */}
      {variant === "heart" && (
        <g className="animate-float-soft">
          <path
            d="M60 122c-1 0-2-.4-2.8-1-11.6-9.6-19-16-19-24.3 0-6.7 5.2-11.7 11.6-11.7 3.3 0 6.4 1.5 8.4 4 2-2.5 5.1-4 8.4-4 6.4 0 11.6 5 11.6 11.7 0 8.3-7.4 14.7-19 24.3-.8.6-1.8 1-2.8 1z"
            fill="#ff6f9c"
          />
          <path
            d="M60 117.5c-.7 0-1.5-.3-2.1-.8-8.8-7.3-14.4-12.1-14.4-18.4 0-5 3.9-8.8 8.7-8.8 2.5 0 4.9 1.1 6.4 3"
            fill="#ff9dbc"
            opacity="0.55"
          />
        </g>
      )}

      {variant === "flowers" && (
        <g>
          <path
            d="M74 104c6-2 10-8 11-14M74 106c7 1 12 6 14 12M74 104c2-6 2-11 0-16"
            stroke="#8fc98d"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <Flower x="85" y="88" />
          <Flower x="89" y="119" colour="#ffb0c8" core="#ffe99a" />
          <Flower x="74" y="87" colour="#e6a6ff" core="#ffe37a" />
        </g>
      )}

      {variant === "letter" && (
        <g transform="rotate(-7 60 110)">
          <rect x="32" y="92" width="56" height="36" rx="7" fill="#fffaf4" stroke="#f6c9d8" />
          <path d="M32 99l28 17 28-17" fill="none" stroke="#f4aec4" strokeWidth="2.2" strokeLinejoin="round" />
          <path
            d="M60 116c-.4 0-.8-.2-1.1-.4-4.6-3.8-7.5-6.3-7.5-9.6 0-2.6 2-4.6 4.6-4.6 1.3 0 2.5.6 3.3 1.6.8-1 2-1.6 3.3-1.6 2.6 0 4.6 2 4.6 4.6 0 3.3-2.9 5.8-7.5 9.6-.3.2-.7.4-1.1.4z"
            fill="#ff6f9c"
            transform="translate(0 1)"
          />
        </g>
      )}
    </svg>
  );
}

/** Two little bears sitting next to each other — used on the celebration screen. */
export function TeddyDuo({ className = "" }) {
  return (
    <div className={`flex items-end justify-center gap-1 sm:gap-3 ${className}`}>
      <TeddyBear
        variant="flowers"
        tone="blush"
        className="h-28 w-auto animate-float-slow sm:h-36"
        title="Teddy bear holding flowers"
      />
      <TeddyBear
        variant="heart"
        tone="caramel"
        className="h-32 w-auto animate-float-soft sm:h-44"
        title="Teddy bear holding a pink heart"
      />
    </div>
  );
}

/** Very subtle bears that live inside the animated background. */
export function BackgroundTeddies() {
  return (
    <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
      <TeddyBear
        variant="heart"
        tone="blush"
        className="absolute bottom-8 left-4 h-40 w-auto opacity-25 animate-float-slow"
        title=""
      />
      <TeddyBear
        variant="letter"
        tone="cream"
        className="absolute bottom-16 right-6 h-36 w-auto opacity-20 animate-float-soft"
        title=""
      />
      <TeddyBear
        variant="flowers"
        tone="caramel"
        className="absolute top-24 right-16 h-28 w-auto opacity-15 animate-float-slow"
        title=""
      />
    </div>
  );
}

export default TeddyBear;
