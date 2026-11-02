import { describe, it, expect } from 'vitest'
import { defenseCalc } from '../src/core/o'

describe('defenseCalc', () => {
  it('计算防御', () => {
    expect(defenseCalc(100, 100)).toBe((100 + 100) / (100 + 100 + 100 + 100))
  })
})
