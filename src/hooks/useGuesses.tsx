import type { Guess } from "@/domain/guess";
import { bearing, bearingToCardinal } from "@/lib/compass";
import { findCountryWithCode } from "@/lib/countries";
import { haversine } from "@/lib/distance";
import { percentage } from "@/lib/math";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useGame } from "./useGame";

type GuessesProviderState = {
  guesses: Guess[],
  clearGuesses: () => void,
  registerGuess: (countryCode: string) => void,
}

export const GuessesContext = createContext<GuessesProviderState | undefined>(undefined)

interface GuessesProviderProps {
  children: ReactNode
}

export function GuessesProvider({ children }: GuessesProviderProps) {
  const { isAllowedToGuess, goal, checkForNewGameState } = useGame()

  const [guesses, setGuesses] = useState<Guess[]>([])

  function clearGuesses() {
    setGuesses([])
  }

  function registerGuess(code: string) {
    if (!isAllowedToGuess) {
      return
    }

    const country = findCountryWithCode(code)

    if (!country) {
      throw new Error('Country not found')
    }

    const d = haversine(country, goal!)
    const p = percentage(d)
    const b = bearing(country, goal!)
    const c = bearingToCardinal(b)

    const guess: Guess = {
      country,
      distance: d,
      percentage: p,
      direction: c,
    }

    const newGuesses = [...guesses, guess]
    setGuesses(newGuesses)
    
    checkForNewGameState(newGuesses)
  }

  const value: GuessesProviderState = {
    guesses,
    clearGuesses,
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
