import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {App} from './pages/router'
import { GlobalStyles } from './styles/index.style'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles/>
    <App />
  </StrictMode>,
)
