import { LogoutIcon } from '@/common/components'
import { useLogoutMutation } from '../../api/authApi'
import s from './LogoutButton.module.css'

export const LogoutButton = () => {
  const [logout] = useLogoutMutation()

  const logoutHandler = () => logout()
  return (
    <button onClick={logoutHandler} className={s.button}>
      <LogoutIcon />
    </button>
  )
}
