import type { SVGProps } from 'react'

export const SmileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 90"
    width={90}
    height={90}
    fill="currentColor"
    {...props}
  >
    <circle cx="44.5" cy="44.5" r="44.5" fill="#FF38B6" />
    <ellipse cx="58.8646" cy="26.4775" rx="8.43127" ry="10.9025" fill="white" />
    <ellipse cx="57.9925" cy="28.9487" rx="3.19807" ry="4.07027" fill="black" />
    <ellipse cx="29.7914" cy="26.4775" rx="8.43127" ry="10.9025" fill="white" />
    <ellipse cx="31.8265" cy="28.9487" rx="3.19807" ry="4.07027" fill="black" />
    <path
      d="M64.9147 69.5033C54.9576 80.1 35.6 80.1 24.03 68.8159"
      stroke="white"
      strokeWidth="6.15391"
      strokeLinecap="round"
    />
    <path
      d="M71.3094 49.8062C58.386 63.5597 33.2618 63.5597 18.245 48.914"
      stroke="white"
      strokeWidth="7.98719"
      strokeLinecap="round"
    />
  </svg>
)
