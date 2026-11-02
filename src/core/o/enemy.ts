import { Resistance } from '@/core/o/resistance.js'

interface Enemy {
  name: string
  hp: number
  resistances: Resistance
  level: number
}

export const enemies: Enemy[] = [
  { name: '木桩', hp: 100000, resistances: new Resistance(0.1), level: 100 },
]
