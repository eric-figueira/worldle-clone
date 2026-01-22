import { useGame } from "@/hooks/useGame"
import { useState } from "react"

export function CountryImage() {
  const { goal } = useGame()

  const [hasError, setHasError] = useState(false)

  if (goal === null) {
    return (
      <div className="bg-gray-800/40 text-gray-700 rounded-lg px-4 py-3 w-full max-w-56 mx-auto">
        Carregando imagem...
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="bg-rose-800/30 text-red-900 rounded-lg px-4 py-3 w-full">
        Não foi possível carregar a imagem do país.
      </div>
    )
  }

  const code = goal.code.toLowerCase()

  return (
    <img 
      src={`/countries/${code}/vector.svg`} 
      alt={goal.name} 
      className="max-w-40 md:max-w-56 mx-auto"
      draggable={false}
      onError={(e) => {
        e.currentTarget.style.display = "none"
        e.currentTarget.onerror = null

        setHasError(true)
      }}
    />
  )
}
