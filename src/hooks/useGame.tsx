import type { Country } from "@/domain/country";
import type { Guess } from "@/domain/guess";
import { MAX_GUESSES } from "@/lib/constants";
import { getRandomCountryWithImage } from "@/lib/countries";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type GameState = "occuring" | "victory" | "defeat"

export type GameProviderState = {
  gameState: GameState,
  goal: Country | null,
  isAllowedToGuess: (guesses: Guess[]) => boolean,
  checkForNewGameState: (guesses: Guess[]) => void,
  reset: () => void,
  restartCount: number,
}

export const GameContext = createContext<GameProviderState | undefined>(undefined)

interface GameProviderProps {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState>("occuring")
  const [goal, setGoal]           = useState<Country | null>(null)

  const [restartCount, setRestartCount] = useState<number>(0)

  function checkForNewGameState(guesses: Guess[]) {
    if (guesses.length > 0 && guesses[guesses.length - 1].country === goal) {
      setGameState("victory")
      return
    }

    if (guesses.length === MAX_GUESSES && gameState !== "victory") {
      setGameState("defeat")
      return
    }
  }

  function isAllowedToGuess(guesses: Guess[]) {
    return !(guesses.length === MAX_GUESSES || ["victory", "defeat"].includes(gameState))
  }

  function reset() {
    setRestartCount((prev) => prev + 1)
  }

  useEffect(() => {
    setGoal(getRandomCountryWithImage())
    setGameState("occuring")
  }, [restartCount])

  const value: GameProviderState = {
    gameState,
    goal,
    isAllowedToGuess,
    checkForNewGameState,
    reset,
    restartCount,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }

  return context
}
