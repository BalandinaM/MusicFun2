import { Path } from '@/common/routing'
import { Login } from '@/features/auth/ui'
import { NavLink } from 'react-router'
import s from './AuthorizationPage.module.css'

export const AuthorizationPage = () => {
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
