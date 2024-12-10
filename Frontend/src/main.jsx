import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";

import { RedirectProvider } from './contexts/RedirectContext.jsx';
import { UserProvider } from './contexts/ContextProvider.jsx';
window.global = window;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      
      <RedirectProvider>
        <UserProvider>
        <App />
        </UserProvider>
      
      
      </RedirectProvider>
      
    </ThemeProvider>
    
  </StrictMode>,
)