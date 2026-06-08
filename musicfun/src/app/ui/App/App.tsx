import { Header, LinearProgress } from '@/common/components'
import { Routing } from '@/common/routing/Routing'
import s from './App.module.css'
import { ToastContainer } from 'react-toastify/unstyled'
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading'

function App() {
  const isGlobalLoading = useGlobalLoading()

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
