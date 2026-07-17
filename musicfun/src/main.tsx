import { createRoot } from 'react-dom/client'
import './common/styles/global.css'
import './common/styles/typography.css'
import './common/styles/variables.css'

import App from './app/ui/App/App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './app/model/store.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
