import { findCountryWithCode, getRandomCountry, type Country } from "@/lib/countries";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Guess = {
  country: Country
  direction: string
  distance: number
  percentage: number
}

type GuessesProviderState = {
  guesses: Guess[],
  restart: () => void,
  registerGuess: (countryCode: string) => void,
  goal: Country | null,
}

const initialState: GuessesProviderState = {
  guesses: [],
  restart: () => null,
  registerGuess: () => null,
  goal: null,
}

export const GuessesContext = createContext<GuessesProviderState>(initialState)

interface GuessesProviderProps {
  children: ReactNode
}

export function GuessesProvider({ children }: GuessesProviderProps) {
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [goal, setGoal] = useState<Country | null>(null)

  const guessCount = guesses.length

  function restart() {
    setGuesses([])
    setGoal(getRandomCountry())
  }

  function showCountry() {}

  function registerGuess(code: string) {
    const country = findCountryWithCode(code)
  }

  const value = {
    guesses,
    restart,
    registerGuess,
    goal,
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
