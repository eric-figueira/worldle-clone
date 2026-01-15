import { EARTH_RADIUS_IN_KM, MAX_DISTANCE_ON_EARTH_SURFACE_IN_KM } from "./constants";
import type { Country } from "./countries";

export function haversine(from: Country, to: Country) {
  const radians = {
    fromLatitude: degreesToRadians(from.latitude),
    fromLongitude: degreesToRadians(from.longitude),
    toLatitude: degreesToRadians(to.latitude),
    toLongitude: degreesToRadians(to.longitude)
  }

  const a = Math.pow(Math.sin((radians.toLatitude - radians.fromLatitude) / 2), 2)
  const b = Math.pow(Math.sin((radians.toLongitude - radians.fromLongitude) / 2), 2)
  const c = Math.cos(radians.fromLatitude) * Math.cos(radians.toLatitude) * b 
  const d = Math.sqrt(a + c)

  const distance = 2 * EARTH_RADIUS_IN_KM * Math.asin(Math.sqrt(d))

  return distance
}

export function degreesToRadians(deg: number) {
  return (deg * 2 * Math.PI) / 360
}

export function percentage(distance: number) {
  return Math.round(distance / MAX_DISTANCE_ON_EARTH_SURFACE_IN_KM) * 100
}
