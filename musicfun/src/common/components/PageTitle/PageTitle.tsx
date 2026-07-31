import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const PageTitle = ({ children, className = '' }: Props) => (
  <h1 className={`text-heading-playlist ${className}`.trim()}>{children}</h1>
)
