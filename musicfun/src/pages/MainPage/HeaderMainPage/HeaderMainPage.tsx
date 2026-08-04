import { Login } from '@/features/auth/ui'
import s from './HeaderMainPage.module.css'
import { UserPanel } from './UserPanel'
import type { MeResponse } from '@/features/auth/api'

type Props = {
  data?: MeResponse
}

export const HeaderMainPage = ({ data }: Props) => {
  return (
    <div className={s.container}>
      {data && <UserPanel data={data} />}
      {!data && <Login />}
    </div>
  )
}
