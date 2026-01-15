import { useEffect } from "react";
import { CountryGuess } from "./components/countries-combobox";
import { CountryImage } from "./components/country-image";
import { useGuesses } from "./hooks/useGuesses";

export function App() {
  const { restart } = useGuesses()

  useEffect(() => {
    restart()
  }, [])

  return (
    <div className="w-full min-h-screen bg-slate-50 p-10">
      <div className="flex flex-col justify-center items-center gap-10 mx-auto max-w-xl bg-white p-8 border border-slate-200 rounded-lg">
        <div className="py-1 bg-slate-100 border-t border-b border-slate-200 w-full">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 w-full text-center">Worldle Clone</h1>
        </div>

        <div className="space-y-10 w-full">
          <CountryImage />
          <CountryGuess className="w-full" />
        </div>
      </div>
    </div>
  )
}
