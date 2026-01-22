import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { countries } from "@/lib/countries";
import { useGuesses } from "@/hooks/useGuesses";
import { useGame } from "@/hooks/useGame";
import { GameState } from "@/lib/game-state"

interface CountryInputProps {
  className?: string
}

export function CountryInput({ className }: CountryInputProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const { registerGuess } = useGuesses()
  const { gameState, restartCount } = useGame()

  React.useEffect(() => {
    setValue("")
  }, [restartCount])

  const isGameOver = gameState === GameState.victory || gameState === GameState.defeat

  function handleGuess() {
    registerGuess(value)
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex-1 justify-between overflow-hidden"
            size={"lg"}
            disabled={isGameOver}
          >
            <span className="min-w-0 flex-1 truncate text-left">
              {value
                ? countries.find((country) => country.code === value)?.name
                : "Selecione um país..."}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 md:w-xs p-0" align="start">
          <Command>
            <CommandInput placeholder="Procure um país..." className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : country.code)
                      setOpen(false)
                    }}
                  >
                    {country.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button 
        onClick={handleGuess} 
        size={"lg"} 
        disabled={isGameOver}
      >
        Adivinhar
      </Button>
    </div>
  )
}
