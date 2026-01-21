import { haversine } from "@/lib/distance"
import type { Country } from "./country"
import { percentage } from "@/lib/math"
import { bearing, bearingToCardinal } from "@/lib/compass"

export type Guess = {
  country: Country
  direction: string
  distance: number
  percentage: number
}

export function createGuess(guessedCountry: Country, goalCountry: Country) {
  const distance = haversine(guessedCountry, goalCountry)
  const distancePercentage = percentage(distance)
  const bearingAngle = bearing(guessedCountry, goalCountry)
  const cardinal = bearingToCardinal(bearingAngle)

  const guess: Guess = {
    country: guessedCountry,
    distance,
    percentage: distancePercentage,
    direction: cardinal,
  }

  return guess
}
