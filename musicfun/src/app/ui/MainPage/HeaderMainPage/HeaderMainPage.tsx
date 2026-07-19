import { Login } from '@/common/components'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import s from './HeaderMainPage.module.css'
import { AuthUser } from './AuthUser'

export const HeaderMainPage = () => {
  const { data } = useGetMeQuery()

  return (
    <div className={s.container}>
      {data && <AuthUser data={data} />}
      {!data && <Login />}
    </div>
  )
}
