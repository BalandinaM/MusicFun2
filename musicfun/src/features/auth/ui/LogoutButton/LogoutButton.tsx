import { LogoutIcon } from '@/common/components'
import { useLogoutMutation } from '../../api/authApi'
import s from './LogoutButton.module.css'
import { useAppDispatch } from '@/common/hooks'
import { setIsLoggedInAC } from '../../model/authSlice'

export const LogoutButton = () => {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    logout()
    dispatch(setIsLoggedInAC({ isLoggedIn: false }))
  }
  return (
    <button onClick={logoutHandler} className={s.button}>
      <LogoutIcon />
    </button>
  )
}
