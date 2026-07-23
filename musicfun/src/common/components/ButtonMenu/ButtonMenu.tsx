import { MoreIcon } from '../Icons'
import s from './ButtonMenu.module.css'

export const ButtonMenu = () => {
  return (
    <button className={s.button}>
      <MoreIcon />
    </button>
  )
}
