import React from "react"

type AlmaLogoProps = {
  className?: string
  width?: number | string
  height?: number | string
}

export default function AlmaLogo({
  className = "text-current h-6 w-auto",
  width,
  height,
}: AlmaLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 14 200 32"
      fill="currentColor"
      className={className}
      width={width}
      height={height}
      aria-label="Alma Logo"
    >
      <g transform="translate(0,60) scale(0.1,-0.1)">
        <path d="M608 408 c7 -7 12 -37 12 -67 0 -79 23 -101 104 -101 69 0 90 -9 84 -36 -5 -27 -46 -38 -112 -30 -46 6 -66 15 -94 41 -35 32 -37 36 -40 110 -3 58 -1 80 9 86 18 12 23 11 37 -3z m-188 -17 c17 -32 13 -187 -6 -205 -19 -20 -19 -20 -38 0 -11 11 -16 35 -16 80 0 35 -3 64 -6 64 -4 0 -62 -34 -130 -76 -126 -77 -159 -87 -159 -46 0 17 28 39 145 111 150 93 191 107 210 72z m675 -36 c47 -30 90 -55 95 -55 5 0 50 25 98 55 136 84 155 75 150 -78 l-3 -92 -27 -3 -28 -3 0 75 c0 42 -3 76 -7 76 -5 0 -44 -23 -88 -50 -44 -28 -87 -50 -95 -50 -8 0 -50 23 -93 50 -43 28 -80 50 -82 50 -2 0 -5 -33 -7 -72 -3 -71 -4 -73 -30 -76 l-28 -3 0 103 c0 151 14 158 145 73z m690 -38 c82 -51 151 -100 153 -109 2 -9 -5 -21 -16 -27 -15 -8 -42 5 -148 69 -71 44 -132 80 -136 80 -5 0 -8 -33 -8 -74 0 -78 -8 -92 -42 -74 -15 7 -18 23 -18 106 0 154 10 155 215 29z" />
      </g>
    </svg>
  )
}
