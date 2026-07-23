import { Path } from '@/common/routing'
import type { MeResponse } from '@/features/auth/api'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { Link } from 'react-router'
import s from './AuthUser.module.css'
import Photo from '/img/Samurai.jpg'
import { LogoutIcon } from '@/common/components/Icons'

type Props = {
  data: MeResponse
}

export const AuthUser = ({ data }: Props) => {
  const [logout] = useLogoutMutation()

  const logoutHandler = () => logout()

  return (
    <div className={s.container}>
      <img
        className={s.photo}
        src={Photo} // не могу найти в документации где взять фото профиля.
        alt="User photo"
        width={34}
        height={34}
      />
      <Link to={Path.Profile} className="text-meta-underline">
        {data.login}
      </Link>

      <button onClick={logoutHandler} className={s.button}>
        <LogoutIcon />
      </button>
    </div>
  )
}
