import { useEffect } from "react";
import { CountryInput } from "./components/country-input";
import { CountryImage } from "./components/country-image";
import { GuessesList } from "./components/guesses-list";
import { Button } from "./components/ui/button";
import { useGame } from "./hooks/useGame";
import { useGuesses } from "./hooks/useGuesses";
import { RotateCcw } from "lucide-react";
import Confetti from 'react-confetti-boom'

export function App() {
  const { resetGame, gameState } = useGame()
  const { clearGuesses } = useGuesses()

  function reset() {
    resetGame()
    clearGuesses()
  }

  useEffect(() => {
    reset()
  }, [])

  return (
    <div className="w-full min-h-screen bg-slate-50 p-10">
      <div className="flex flex-col justify-center items-center gap-10 mx-auto max-w-xl bg-white p-8 border border-slate-200 rounded-lg">
        <div className="py-1 bg-slate-100 border-t border-b border-slate-200 w-full">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 w-full text-center">🌎 WOR<span className="text-emerald-500 font-bold">L</span>DLE <span className="text-md tracking-tighter font-normal text-slate-500 code">clone</span></h1>
        </div>

        <div className="space-y-10 w-full">
          <CountryImage />
          <div className="space-y-4">
            <CountryInput className="w-full" />
            <GuessesList />

            {["victory", "defeat"].includes(gameState) && (
              <>
                <Button onClick={reset} size={"lg"} className="w-full">
                  Jogar novamente

                  <RotateCcw className="size-4" />
                </Button>

                <Confetti particleCount={50} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
