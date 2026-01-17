import { useGuesses } from "@/hooks/useGuesses"
import { Guess } from "./guess"

export function GuessesList() {
  const { guesses } = useGuesses()

  return (
    <ul className="space-y-1.5">
      {guesses.map((guess, i) => {
        return (
          <Guess guess={guess} key={i} />
        )
      })}
    </ul>
  )
}