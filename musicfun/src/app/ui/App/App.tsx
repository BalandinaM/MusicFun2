import { Header, LinearProgress } from '@/common/components'
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
      {/* <ToastContainer /> */}
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App
