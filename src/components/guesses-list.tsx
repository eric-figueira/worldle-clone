import { useGuesses } from "@/hooks/useGuesses"
import { Guess } from "./guess"
import { MAX_GUESSES } from "@/lib/constants"

export function GuessesList() {
  const { guesses } = useGuesses()

  return (
    <ul className="space-y-1.5">
      {guesses.map((guess, i) => {
        return (
          <Guess guess={guess} key={i} />
        )
      })}

      {Array.from({ length: MAX_GUESSES - guesses.length }).map((_, i) => {
        return (
          <div key={i} className="w-full h-8 bg-slate-50 border-2 border-slate-100 rounded-md text-center text-sm" />
        )
      })}
    </ul>
  )
}