import { Link, NavLink } from 'react-router'
import { Path } from '@/common/routing/Routing'
import s from './Header.module.css'
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi'
import { Login } from '../Login/Login'

export const Header = () => {
  const { data } = useGetMeQuery()

  const [logout] = useLogoutMutation()

  const logoutHandler = () => logout()

  return (
    <header className={s.container}>
      {data && (
        <div className={s.loginContainer}>
          <Link to={Path.Profile}>{data.login}</Link>

          <button onClick={logoutHandler}>logout</button>
        </div>
      )}
      {!data && <Login />}
    </header>
  )
}
