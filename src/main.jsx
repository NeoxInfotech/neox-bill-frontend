import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { HashRouter } from "react-router-dom"
import { ContextProvider } from './context/UserContext.jsx'


export const server = "https://neox-bill-backend.onrender.com/api/v1"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </HashRouter>
  </React.StrictMode>,
)
