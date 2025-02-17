import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "primereact/resources/themes/md-dark-indigo/theme.css"; // Tema escuro
import "primereact/resources/primereact.min.css"; // Estilos básicos do PrimeReact
import "primeicons/primeicons.css"; // Ícones do PrimeReact

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
