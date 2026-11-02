import { describe, it, expect } from 'vitest'
import { resistanceCalc } from '../src/core/o'
import { Resistance } from '../src/core/o/resistance.js'

describe('defenseCalc', () => {
  it('计算抗性', () => {
    let resistance: Resistance = { fire: 0.9 }
    let reduce: Resistance = { fire: 0.4 }
    expect(resistanceCalc(resistance, reduce).fire).toBeCloseTo(0.5)
  })
})
