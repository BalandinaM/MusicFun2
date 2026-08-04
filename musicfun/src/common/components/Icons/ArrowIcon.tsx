import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & {
  direction?: 'down' | 'left' | 'right' | 'up'
}

export const ArrowIcon = ({ direction = 'down', style, ...props }: Props) => {
  const rotationMap = {
    down: 0,
    left: -90,
    right: 90,
    up: 180,
  } as const

  const rotation = rotationMap[direction]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 7"
      width={12}
      height={7}
      fill="currentColor"
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      {...props}
    >
      <path d="M10.8814 0.29218C10.4921 -0.0970929 9.86111 -0.0974368 9.47141 0.291411L5.5868 4.16756L1.70218 0.291411C1.31248 -0.097437 0.681452 -0.0970928 0.29218 0.29218C-0.0973934 0.681753 -0.0973932 1.31338 0.29218 1.70295L4.87969 6.29046C5.27021 6.68098 5.90338 6.68098 6.2939 6.29046L10.8814 1.70295C11.271 1.31338 11.271 0.681753 10.8814 0.29218Z" />
    </svg>
  )
}
