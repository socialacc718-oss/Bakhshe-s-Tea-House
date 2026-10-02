import React from 'react';

interface BakhsheLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BakhsheLogo: React.FC<BakhsheLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
      >
        {/* Outer Tea Leaf Body */}
        <path
          d="M50 4C50 4 12 40 12 80C12 108 32 120 50 120C68 120 88 108 88 80C88 40 50 4 50 4Z"
          fill="#184e31"
        />

        {/* Leaf Side Veins */}
        <path
          d="M50 25C42 32 30 42 22 56"
          stroke="#2d3b32"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M50 28C58 35 70 45 78 56"
          stroke="#2d3b32"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M50 42C40 50 28 62 20 78"
          stroke="#2d3b32"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M50 44C60 52 72 63 80 78"
          stroke="#2d3b32"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M50 62C42 70 32 82 25 96"
          stroke="#2d3b32"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M50 64C58 72 68 83 75 96"
          stroke="#2d3b32"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Central Stem line connecting chimney steam to leaf tip */}
        <path
          d="M48 94C47 80 52 60 50 15"
          stroke="#3d372e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Cozy House Base */}
        <g id="cozy-house">
          {/* House body & roof in warm cream */}
          <path
            d="M50 78L68 94V116H32V94L50 78Z"
            fill="#F4EFE6"
          />

          {/* Chimney on left roof slope */}
          <path
            d="M43 85V76H47V89L43 85Z"
            fill="#F4EFE6"
          />

          {/* Arched Wooden Doorway */}
          <path
            d="M45 102C45 99 47 97 50 97C53 97 55 99 55 102V116H45V102Z"
            fill="#7A4A28"
          />

          {/* 4-pane cozy window */}
          <rect x="46" y="87" width="3.5" height="3.5" rx="0.5" fill="#5E381C" />
          <rect x="50.5" y="87" width="3.5" height="3.5" rx="0.5" fill="#5E381C" />
          <rect x="46" y="91.5" width="3.5" height="3.5" rx="0.5" fill="#5E381C" />
          <rect x="50.5" y="91.5" width="3.5" height="3.5" rx="0.5" fill="#5E381C" />
        </g>
      </svg>

      {showText && (
        <div className="text-center mt-1">
          <span className="font-serif text-sm font-bold text-stone-900 tracking-normal block leading-tight">
            Bakhshe's
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-emerald-900 block -mt-0.5">
            Tea House
          </span>
        </div>
      )}
    </div>
  );
};
