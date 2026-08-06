import { Path } from '@/common/routing'
import { Login } from '@/features/auth/ui'
import { NavLink, Navigate } from 'react-router'
import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn } from '@/features/auth/model/authSlice'
import s from './AuthorizationPage.module.css'

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
