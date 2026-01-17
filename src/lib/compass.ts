import type { Country } from "@/domain/country";
import { degreesToRadians, radiansToDegrees } from "./math";
import { DIRECTIONS } from "./constants";

export function bearing(start: Country, end: Country) {
  const radians = {
    lat1: degreesToRadians(start.latitude),
    lon1: degreesToRadians(start.longitude),
    
    lat2: degreesToRadians(end.latitude),
    lon2: degreesToRadians(end.longitude)
  }

  const y = Math.sin((radians.lon2 - radians.lon1)) * Math.cos(radians.lat2)
  const x = Math.cos(radians.lat1) * Math.sin(radians.lat2) - Math.sin(radians.lat1) * Math.cos(radians.lat2) * Math.cos((radians.lon2 - radians.lon1))

  const o = Math.atan2(y, x)
  const bearing = (radiansToDegrees(o) + 360) % 360

  return bearing
}

export function bearingToCardinal(bearing: number) {
  const index = Math.round((bearing % 360) / 45)

  return DIRECTIONS[index % DIRECTIONS.length]
}
