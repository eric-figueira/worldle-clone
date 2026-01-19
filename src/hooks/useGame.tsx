import type { Country } from "@/domain/country";
import type { Guess } from "@/domain/guess";
import { MAX_GUESSES } from "@/lib/constants";
import { getRandomCountry } from "@/lib/countries";
import { createContext, useContext, useState, type ReactNode } from "react";

export type GameState = "restart" | "occuring" | "victory" | "defeat"

export type GameProviderState = {
  gameState: GameState,
  goal: Country | null,
  isAllowedToGuess: (guesses: Guess[]) => boolean,
  checkForNewGameState: (guesses: Guess[]) => void,
  resetGame: () => void,
}

export const GameContext = createContext<GameProviderState | undefined>(undefined)

interface GameProviderProps {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState>("occuring")
  const [goal, setGoal]           = useState<Country | null>(null)

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

  function resetGame() {
    setGameState("occuring")
    setGoal(getRandomCountry())
  }

  const value: GameProviderState = {
    gameState,
    goal,
    isAllowedToGuess,
    checkForNewGameState,
    resetGame,
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
