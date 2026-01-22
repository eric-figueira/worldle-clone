import { getRandomCountryWithImage, type Country } from "@/domain/country";
import type { Guess } from "@/domain/guess";
import { MAX_GUESSES, PROBABILITY_OF_PICKING_ISLANDS } from "@/lib/constants";

import { GameState, type TGameState } from "@/lib/game-state";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type GameProviderState = {
  gameState: TGameState,
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
  const [gameState, setGameState] = useState<TGameState>(GameState.occurring)
  const [goal, setGoal]           = useState<Country | null>(null)

  const [restartCount, setRestartCount] = useState<number>(0)

  const alreadyPickedCountries = useRef<Set<string>>(new Set())

  function checkForNewGameState(guesses: Guess[]) {
    if (guesses.length > 0 && guesses[guesses.length - 1].country === goal) {
      setGameState(GameState.victory)
      return
    }

    if (guesses.length === MAX_GUESSES && gameState !== GameState.victory) {
      setGameState(GameState.defeat)
      return
    }
  }

  function isAllowedToGuess(guesses: Guess[]) {
    const hasReachedMaxGuesses = guesses.length === MAX_GUESSES
    const isGameOver = gameState === GameState.victory || gameState === GameState.defeat

    return !(hasReachedMaxGuesses || isGameOver)
  }

  function reset() {
    setRestartCount((prev) => prev + 1)
  }

  useEffect(() => {
    let randomCountry = getRandomCountryWithImage()

    let attempts = 0
    const maxAttempts = 1000 // prevents infinite loop

    while (
      (alreadyPickedCountries.current.has(randomCountry.code) || 
       (randomCountry.name.includes('Ilha') && Math.random() > PROBABILITY_OF_PICKING_ISLANDS)) &&
      attempts < maxAttempts
    ) {
      randomCountry = getRandomCountryWithImage()
      attempts++
    }

    alreadyPickedCountries.current.add(randomCountry.code)

    setGoal(randomCountry)
    setGameState(GameState.occurring)

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
