import { LinearProgress, NavMenu } from '@/common/components'
import { Routing } from '@/common/routing/Routing'
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading'
import { Toaster } from 'sonner'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/common/hooks'
import { setIsLoggedInAC } from '@/features/auth/model/authSlice'
import { useEffect } from 'react'

function App() {
  const isGlobalLoading = useGlobalLoading()
  const { data } = useGetMeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    }
  }, [data, dispatch])

  return (
    <div className="container">
      {isGlobalLoading && <LinearProgress />}
      <Routing />
      <NavMenu />
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App
