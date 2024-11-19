import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { PrimeReactProvider } from 'primereact/api';
import { RedirectProvider } from './contexts/RedirectContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <PrimeReactProvider >
      <RedirectProvider>
      
      <App />
      </RedirectProvider>
      </PrimeReactProvider>
      
    </ThemeProvider>
    
  </StrictMode>,
)
