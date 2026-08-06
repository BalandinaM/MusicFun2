import { Path } from '@/common/routing'
import { Login } from '@/features/auth/ui'
import { Navigate, NavLink } from 'react-router'
import s from './AuthorizationPage.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn } from '@/features/auth/model/authSlice'

export const AuthorizationPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={Path.Profile} replace />
  }
  return (
    <div className={s.wrapAuthorizationPage}>
      <h1 className="text-heading-xl">Millions of Songs. Free on Musifun.</h1>
      <Login />
      <NavLink to={Path.Main} className={s.link}>
        Сontinue without Sign In
      </NavLink>
    </div>
  )
}
