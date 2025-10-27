import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DisneyCharacters from './DisneyChar.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <DisneyCharacters/>
    </StrictMode>,
)
