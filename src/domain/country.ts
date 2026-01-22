import { countries, countryCodesWithImage } from "@/lib/countries"

export interface Country {
  code: string
  name: string
  latitude: number
  longitude: number
}

export function getRandomCountryWithImage() {
  const countriesWithImage = countries.filter((country) => 
    countryCodesWithImage.some((code) => code.toUpperCase() === country.code)
  )

  const randomIndex   = Math.floor(Math.random() * countriesWithImage.length)
  const randomCountry = countriesWithImage[randomIndex]

  return randomCountry
}

export function findCountryWithCode(code: string) {
  return countries.find((country) => country.code === code)
}
