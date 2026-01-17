import type { Country } from "@/domain/country";
import { EARTH_RADIUS_IN_KM } from "./constants";
import { degreesToRadians } from "./math";

export function haversine(start: Country, end: Country) {
  const radians = {
    lat1: degreesToRadians(start.latitude),
    lon1: degreesToRadians(start.longitude),
    
    lat2: degreesToRadians(end.latitude),
    lon2: degreesToRadians(end.longitude)
  }

  const a = Math.pow(Math.sin((radians.lat2 - radians.lat1) / 2), 2)
  const b = Math.pow(Math.sin((radians.lon2 - radians.lon1) / 2), 2)
  const c = Math.cos(radians.lat1) * Math.cos(radians.lat2) * b 
  const d = Math.sqrt(a + c)

  const distance = 2 * EARTH_RADIUS_IN_KM * Math.asin(Math.sqrt(d))

  return Math.round(distance)
}
