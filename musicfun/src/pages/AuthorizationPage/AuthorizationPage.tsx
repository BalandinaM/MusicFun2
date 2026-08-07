import { Path } from '@/common/routing'
import { Login } from '@/features/auth/ui'
import { Navigate, useNavigate } from 'react-router'
import s from './AuthorizationPage.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectIsLoggedIn } from '@/features/auth/model/authSlice'
import { Button } from '@/common/components'
import backgroundImage from '@/assets/images/authCover.png'
import { SmileIcon } from '../../common/components/Icons/SmileIcon'

export const AuthorizationPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  if (isLoggedIn) {
    return <Navigate to={Path.Profile} replace />
  }

  const handleContinueWithoutAuth = () => {
    navigate(Path.Main)
  }

  return (
    <div className={s.wrapAuthorizationPage}>
      <div className={s.containerImg}>
        <img
          src={backgroundImage}
          alt="Background"
          className={s.bgImage}
          width={360}
          height={340}
        />
        <SmileIcon className={s.overlay} />
      </div>
      <h1 className="text-heading-xl">Millions of Songs. Free on Musifun.</h1>
      <Login />
      <Button
        title="Continue without Sign In"
        onClick={handleContinueWithoutAuth}
      />
    </div>
  )
}
