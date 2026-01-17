import type { Country } from "./country"

export type Guess = {
  country: Country
  direction: string
  distance: number
  percentage: number
}
