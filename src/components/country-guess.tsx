import { useState } from "react";
import { Button } from "./ui/button";

export function CountryGuess() {
  const [guesses, setGuesses] = useState<undefined[]>([])

  return (
    <div className="border border-slate-100 rounded-lg p-3">
      <Button>Hello bitch</Button>
    </div>
  )
}