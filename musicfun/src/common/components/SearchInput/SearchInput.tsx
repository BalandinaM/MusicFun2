import type { ChangeEvent } from 'react'
import { SearchIcon } from '../Icons'
import s from './SearchInput.module.css'

type Props = {
  callback: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export const SearchInput = ({ callback, placeholder }: Props) => {
  return (
    <div className={s.wrap}>
      <SearchIcon className={s.icon} />
      <input
        type="search"
        className={s.input}
        onChange={callback}
        placeholder={placeholder}
      />
    </div>
  )
}
