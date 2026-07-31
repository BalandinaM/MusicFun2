import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const PageTitle = ({ children }: Props) => (
  <h1 className={'text-heading-playlist'}>{children}</h1>
)
