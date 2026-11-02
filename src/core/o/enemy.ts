import { Resistance } from '@/core/o/resistance.js'

export interface Enemy {
  name: string
  hp: number
  resistances: Resistance
  level: number
}

export const enemyArray: Enemy[] = [
  { name: '木桩', hp: 100000, resistances: { fire: 0.1 }, level: 100 },
]
