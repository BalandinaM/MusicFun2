import { Path } from '@/common/routing'
import { Login } from '@/features/auth/ui'
import { NavLink } from 'react-router'

const AuthorizationPage = () => {
  return (
    <div>
      <h1>Millions of Songs. Free on Musifun.</h1>
      <Login />
      <NavLink to={Path.Main}>Сontinue without Sign In</NavLink>
    </div>
  )
}

export default AuthorizationPage
