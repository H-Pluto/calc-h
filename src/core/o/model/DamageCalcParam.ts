import { Resistance } from '@/core/o/resistance.js'

export interface CalcDamageParams {
  /** 攻击力（面板值） */
  attack: number
  /** 技能/伤害倍率 */
  multiplier: number
  /** 角色等级 */
  roleLevel: number
  /** 敌人等级 */
  enemyLevel: number
  /** 敌人抗性 */
  enemyResistance: Resistance
  /** 伤害百分比加成（小数，0.5 = +50%） */
  dmgPercentBonus: number
  /** 暴击伤害（小数，1 = 100%） */
  critDamage: number
  /** 伤害类型，1 = 火 */
  damageType: number
  /** 削抗值（小数），默认 0 */
  reduce?: Resistance
  /** 减防系数（小数，0~1），默认 0 */
  defenseReduction?: number
}

export interface CalcBaseDamageParams {
  /** 攻击力（面板值） */
  attack: number
  /** 技能/伤害倍率 */
  multiplier: number
  /** 角色等级 */
  roleLevel: number
  /** 敌人等级 */
  enemyLevel: number
  /** 敌人抗性（小数，0.1 = 10%） */
  enemyResistance: number
  /** 伤害百分比加成（小数，0.5 = +50%） */
  dmgPercentBonus: number
  /** 暴击伤害（小数，1 = 100%） */
  critDamage: number
  /** 伤害类型，1 = 火 */
  damageType: number
  /** 削抗值（小数），默认 0 */
  reduce?: number
  /** 减防系数（小数，0~1），默认 0 */
  defenseReduction?: number
}

export interface CalcRoleDamageParams {
  /** 角色名称，需能在 roles 中找到 */
  roleName: string
  /** 武器名称，需能在 weapons 中找到 */
  weaponName: string
  /** 敌人名称，需能在 enemies 中找到 */
  enemyName: string
  /** 角色等级，参与防御系数计算 */
  roleLevel: number
  /** 敌人等级，参与防御系数计算 */
  enemyLevel: number
  /** 百分比攻击力加成（小数，0.466 = +46.6%） */
  atkPercent: number
  /** 伤害百分比加成（小数，不含武器加成） */
  dmgPercentBonus: number
  /** 暴击伤害（小数，不含武器和角色自带加成） */
  critDamage: number
  /** 伤害类型，1 = 火 */
  damageType: number
  /** 削抗值（小数，0.2 = 削 20% 抗性），默认 0 */
  reduce?: number
  /** 减防系数（小数，0~1），默认 0 */
  defenseReduction?: number
}
