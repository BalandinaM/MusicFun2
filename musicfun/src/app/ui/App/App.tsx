import { LinearProgress, NavMenu } from '@/common/components'
import { Routing } from '@/common/routing/Routing'
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading'
import { Toaster } from 'sonner'

function App() {
  const isGlobalLoading = useGlobalLoading()

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
