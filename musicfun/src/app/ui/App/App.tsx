import { Header, LinearProgress, NavMenu } from '@/common/components'
import { Routing } from '@/common/routing/Routing'
import s from './App.module.css'
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading'
import { Toaster } from 'sonner'

function App() {
  const isGlobalLoading = useGlobalLoading()

  return (
    <div className="container">
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <NavMenu />
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App
