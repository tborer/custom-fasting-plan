import React from "react";

type LogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  withText?: boolean;
};

const Logo: React.FC<LogoProps> = ({ size = 40, withText = true, className, ...props }) => {
  const s = size;
  return (
    <svg
      viewBox="0 0 64 64"
      width={s}
      height={s}
      className={className}
      aria-labelledby="logoTitle"
      role="img"
      {...props}
    >
      <title id="logoTitle">Custom Fasting Plan</title>

      <defs>
        <path id="textcircle" d="M32 2a30 30 0 1 1 0 60a30 30 0 1 1 0-60Z" />
      </defs>

      {/* Outer guide circle */}
      <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />

      {/* Clock face */}
      <circle cx="32" cy="32" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />

      {/* Clock center dot */}
      <circle cx="32" cy="32" r="1.5" fill="currentColor" />

      {/* Hour hand pointing up (12 o'clock — start of fast) */}
      <line x1="32" y1="32" x2="32" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Minute/progress arc suggesting time passing */}
      <path
        d="M32 19 A13 13 0 0 1 45 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Tick marks */}
      <line x1="32" y1="19.5" x2="32" y2="21" stroke="currentColor" strokeWidth="1.2" />
      <line x1="44.5" y1="32" x2="43" y2="32" stroke="currentColor" strokeWidth="1.2" />
      <line x1="32" y1="44.5" x2="32" y2="43" stroke="currentColor" strokeWidth="1.2" />
      <line x1="19.5" y1="32" x2="21" y2="32" stroke="currentColor" strokeWidth="1.2" />

      {withText && (
        <text fill="currentColor" fontSize="5.6" letterSpacing="1.4" fontWeight="600">
          <textPath href="#textcircle" startOffset="0%">
            CUSTOM FASTING PLAN • CUSTOM FASTING PLAN •
          </textPath>
        </text>
      )}
    </svg>
  );
};

export default Logo;