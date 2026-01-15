import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { GuessesProvider } from './hooks/useGuesses'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuessesProvider>
      <App />
    </GuessesProvider>
  </StrictMode>,
)
