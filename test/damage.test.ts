import { describe, it, expect } from 'vitest'
import { calcBaseDamage, calcRoleDamage } from '../src/core/o'

describe('defenseCalc', () => {
  it('伤害计算', () => {
    let result = calcBaseDamage(1700, 4, 90, 100, 0.1, 0, 0.466, 2.122, 1)
    console.log('数值计算', result)
    expect(result).toBeTypeOf('number')
  })
})

describe('defenseCalc', () => {
  it('角色伤害计算', () => {
    let result = calcRoleDamage(
      '测试角色',
      '测试武器',
      '木桩',
      90,
      100,
      0.466 + 0.466 + 0.2,
      0,
      0.466 + 0.15 + 0.4,
      1.122,
      1,
    )
    console.log('角色伤害值', result)
    expect(result).toBeTypeOf('object')
  })
})
