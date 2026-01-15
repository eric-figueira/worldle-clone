import { useGuesses } from "@/hooks/useGuesses"

export function CountryImage() {
  const { goal } = useGuesses()

  console.log(goal)

  if (goal === null) {
    return <span>Carregando imagem...</span>
  }

  const code = goal.code.toLowerCase()

  return (
    <img 
      src={`/countries/${code}/vector.svg`} 
      alt={goal.name} 
      className="max-w-[14rem] mx-auto"
      draggable={false}
    />
  )
}