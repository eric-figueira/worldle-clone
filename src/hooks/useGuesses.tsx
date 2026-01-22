import { createGuess, type Guess } from "@/domain/guess";
import { findCountryWithCode } from "@/lib/countries";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useGame } from "./useGame";

type GuessesProviderState = {
  guesses: Guess[],
  registerGuess: (countryCode: string) => void,
}

export const GuessesContext = createContext<GuessesProviderState | undefined>(undefined)

interface GuessesProviderProps {
  children: ReactNode
}

export function GuessesProvider({ children }: GuessesProviderProps) {
  const { isAllowedToGuess, goal, checkForNewGameState, restartCount } = useGame()

  const [guesses, setGuesses] = useState<Guess[]>([])

  useEffect(() => {
    setGuesses([])
  }, [restartCount])

  function registerGuess(code: string) {
    if (!isAllowedToGuess(guesses)) {
      return
    }

    const country = findCountryWithCode(code)

    if (!country) {
      throw new Error('Country not found')
    }

    if (guesses.some((guess) => guess.country.code === country.code)) {
      return
    }

    const newGuess = createGuess(country, goal!)
    const newGuesses = [...guesses, newGuess]
    
    setGuesses(newGuesses)
    
    checkForNewGameState(newGuesses)
  }

  const value: GuessesProviderState = {
    guesses,
    registerGuess,
  }

  return (
    <GuessesContext.Provider value={value}>
      {children}
    </GuessesContext.Provider>
  )
}

export const useGuesses = () => {
  const context = useContext(GuessesContext)

  if (context === undefined) {
    throw new Error("useGuesses must be used within a GuessesProvider")
  }

  return context
}
