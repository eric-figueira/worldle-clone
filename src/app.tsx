import { CountryGuess } from "./components/country-guess";

export function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col justify-center items-center gap-2 max-w-3xl">
        <h1 className="text-lg font-bold tracking-tight text-slate-800">Worldle Clone</h1>
        <CountryGuess />
      </div>
    </div>
  )
}
