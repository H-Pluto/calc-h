import { describe, it, expect } from 'vitest'
import { calcBaseDamage, calcRoleDamage } from '../src/core/o'

describe('calcBaseDamage', () => {
  const baseParams = {
    attack: 1000,
    multiplier: 2,
    roleLevel: 90,
    enemyLevel: 100,
    enemyResistance: 0.1,
    dmgPercentBonus: 0.5,
    critDamage: 1,
    damageType: 1,
  }

  it('按公式计算基础伤害', () => {
    expect(calcBaseDamage(baseParams)).toBe(2630.772)
  })

  it('削抗产生负抗性时效果减半', () => {
    expect(calcBaseDamage({ ...baseParams, reduce: 0.2 })).toBe(3069.234)
  })

  it('伤害类型有误时抛出错误', () => {
    expect(() => calcBaseDamage({ ...baseParams, damageType: 2 })).toThrow('传入的伤害类型有误')
  })
})

describe('calcRoleDamage', () => {
  const roleParams = {
    roleName: '测试角色',
    weaponName: '测试武器',
    enemyName: '木桩',
    roleLevel: 90,
    enemyLevel: 100,
    atkPercent: 0.466 + 0.466 + 0.2,
    dmgPercentBonus: 0.466 + 0.15 + 0.4,
    critDamage: 1.122,
    damageType: 1,
  }

  it('计算角色各段伤害', () => {
    const result = calcRoleDamage(roleParams)
    expect(result.normalDamage).toEqual([19521.56147])
    expect(result.eDamage).toEqual([47177.10687])
    expect(result.qDamahe).toEqual([162679.67888])
    expect(result.passiveDamage).toEqual([])
  })

  it('角色/武器/敌人名称未找到时抛出错误', () => {
    expect(() => calcRoleDamage({ ...roleParams, roleName: '不存在' })).toThrow(
      '角色/武器/敌人 名称未找到',
    )
  })
})
