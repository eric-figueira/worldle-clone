import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { GuessesProvider } from './hooks/useGuesses'
import { GameProvider } from './hooks/useGame'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <GuessesProvider>
        <App />
      </GuessesProvider>
    </GameProvider>
  </StrictMode>,
)
