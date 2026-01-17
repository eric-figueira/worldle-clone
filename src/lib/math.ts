import { MAX_DISTANCE_ON_EARTH_SURFACE_IN_KM } from "./constants"

export function degreesToRadians(deg: number) {
  return (deg * 2 * Math.PI) / 360
}

export function radiansToDegrees(rad: number) {
  return (rad * 360) / (2 * Math.PI)
}

export function percentage(distance: number) {
  return 100 - Math.round(distance / MAX_DISTANCE_ON_EARTH_SURFACE_IN_KM * 100)
}
