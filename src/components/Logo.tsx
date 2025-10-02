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
      <title id="logoTitle">Custom Hair Plan</title>

      <defs>
        <path id="textcircle" d="M32 2a30 30 0 1 1 0 60a30 30 0 1 1 0-60Z" />
      </defs>

      {/* Outer guide circle */}
      <circle cx="32" cy="32" r="31" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />

      {/* Stylized face and hair outline */}
      <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Hair swoops */}
        <path d="M20 25c2-7 11-12 18-10 4 1 7 4 8 8" />
        <path d="M21 27c4-5 11-7 17-5" />
        {/* Face outline */}
        <path d="M24 30c0 9 4 16 8 16s8-7 8-16" />
        {/* Jaw/chin accent */}
        <path d="M26 44c2 3 12 3 14 0" />
        {/* Ears hints */}
        <path d="M22 33c-1 2-1 4 1 5" />
        <path d="M42 33c1 2 1 4-1 5" />
      </g>

      {withText && (
        <text fill="currentColor" fontSize="6" letterSpacing="1.5" fontWeight="600">
          <textPath href="#textcircle" startOffset="0%">
            CUSTOM HAIR PLAN • CUSTOM HAIR PLAN •
          </textPath>
        </text>
      )}
    </svg>
  );
};

export default Logo;