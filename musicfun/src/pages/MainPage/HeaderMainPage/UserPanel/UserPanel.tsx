import { Path } from '@/common/routing'
import type { MeResponse } from '@/features/auth/api'
import { Link } from 'react-router'
import s from './UserPanel.module.css'
import Photo from '/img/Samurai.jpg'
import { LogoutButton } from '@/features/auth/ui'

type Props = {
  data: MeResponse
}

export const UserPanel = ({ data }: Props) => {
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
      <LogoutButton />
    </div>
  )
}
