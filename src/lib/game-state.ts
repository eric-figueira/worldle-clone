export const GameState = {
  occurring: "occurring",
  victory: "victory",
  defeat: "defeat",
} as const

export type TGameState = typeof GameState[keyof typeof GameState]
