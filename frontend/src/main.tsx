// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/App.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContextProvider.tsx'
import SocketContextProvider from './context/SocketContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  // </StrictMode>
)
