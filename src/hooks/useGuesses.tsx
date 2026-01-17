import type { Country } from "@/domain/country";
import type { Guess } from "@/domain/guess";
import { bearing, bearingToCardinal } from "@/lib/compass";
import { findCountryWithCode, getRandomCountry } from "@/lib/countries";
import { haversine } from "@/lib/distance";
import { percentage } from "@/lib/math";
import { createContext, useContext, useState, type ReactNode } from "react";

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
