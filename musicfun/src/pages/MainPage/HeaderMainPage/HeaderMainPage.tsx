import { Login } from '@/features/auth/ui'
import s from './HeaderMainPage.module.css'
import { AuthUser } from './AuthUser'
import type { MeResponse } from '@/features/auth/api'

type Props = {
  data?: MeResponse
}

export const HeaderMainPage = ({ data }: Props) => {
  return (
    <div className={s.container}>
      {data && <AuthUser data={data} />}
      {!data && <Login />}
    </div>
  )
}
