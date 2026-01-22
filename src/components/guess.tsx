import type { Guess } from "@/domain/guess";

const map: Record<string, string> = {
  "N": "⬆️",
  "NE": "↗️",
  "E": "➡️",
  "SE": "↘️",
  "S": "⬇️",
  "SW": "↙️",
  "W": "⬅️",
  "NW": "↖️",
}

interface GuessProps {
  guess: Guess
}

export function Guess({ guess }: GuessProps) {
  return (
    <li>
      <div className="grid grid-cols-10 gap-1 items-center">
        <div className="col-span-4 md:col-span-5 py-1 px-1 bg-slate-100 border-2 border-slate-200 rounded-md text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {guess.country.name}
        </div>
        <div className="col-span-3 md:col-span-2 py-1 px-1 bg-slate-100 border-2 border-slate-200 rounded-md text-center text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {guess.distance.toLocaleString()} km
        </div>
        <div className="col-span-2 py-1 bg-slate-100 border-2 border-slate-200 rounded-md text-center text-sm">
          {guess.percentage}%
        </div>
        <div className="py-1 bg-slate-100 border-2 border-slate-200 rounded-md text-center text-sm">
          {guess.distance === 0 ? ("🎉") : map[guess.direction]}
        </div>
      </div>
    </li>
  )
}