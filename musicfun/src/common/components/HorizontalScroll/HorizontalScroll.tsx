import { type ReactNode, useRef } from 'react'
import s from './HorizontalScroll.module.css'

type HorizontalScrollProps = {
  children: ReactNode
  className?: string
  gap?: number
  padding?: string
  scrollBehavior?: 'smooth' | 'auto'
}

export const HorizontalScroll = ({
  children,
  className = '',
  gap = 8,
  padding = '16px 0',
  scrollBehavior = 'smooth',
}: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLUListElement>(null)

  //   // Опционально: скролл по колесику мыши
  //   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  //     if (scrollRef.current) {
  //       scrollRef.current.scrollLeft += e.deltaY
  //     }
  //   }

  return (
    <ul
      ref={scrollRef}
      className={`${s.scrollContainer} ${className}`}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        padding: padding,
        scrollBehavior: scrollBehavior,
      }}
      //   onWheel={handleWheel}
    >
      {children}
    </ul>
  )
}
