import { Resistance } from '@/core/o/resistance.js'
import { roundTo } from '@/core/o/utils/calc.js'
import { roles } from '@/core/o/role.js'
import { enemies } from '@/core/o/enemy.js'
import { weapons } from '@/core/o/weapon.js'
import type { RoleDamageRes } from '@/core/o/model/RoleDamageRes.js'
import type {
  CalcBaseDamageParams,
  CalcRoleDamageParams,
  CalcDamageParams,
} from '@/core/o/model/DamageCalcParam.js'

/**
 * 攻击力计算
 * @author huaju
 * @param baseAttack 基础攻击（白值）
 * @param atkPercent 加成百分比
 * @returns 面板攻击力
 */
export function attackCalc(baseAttack: number, atkPercent: number): number {
  return roundTo(baseAttack * (1 + atkPercent))
}

/**
 * 基础伤害计算
 * @author huaju
 * @param attribute 计算属性
 * @param multiplier 计算倍率
 * @returns 基础伤害
 */
export function baseDamageCalc(attribute: number, multiplier: number): number {
  return roundTo(attribute * multiplier)
}

/**
 * 羽毛加成计算
 * @author huaju
 * @param attribute 计算属性
 * @param multiplier 计算倍率
 * @description 只计算出羽毛的增加的值
 * @returns 羽毛加成值
 */
export function featherCalc(attribute: number, multiplier: number): number {
  return roundTo(attribute * multiplier)
}

/**
 * 敌对单位防御计算
 * @author huaju
 * @param roleLevel 角色等级
 * @param enemyLevel 敌人等级
 * @param defenseReduction 减防系数(百分比小数)
 * @returns 防御值
 */
export function defenseCalc(
  roleLevel: number,
  enemyLevel: number,
  defenseReduction: number = 0,
): number {
  return roundTo(
    (roleLevel + 100) / (roleLevel + 100 + (enemyLevel + 100) * (1 - defenseReduction)),
  )
}

/**
 * 抗性计算
 * @author huaju
 * @description 减抗后的负抗性相当于增伤，但是效果减半
 * @param resistance 原始抗性
 * @param reduce 削抗值
 * @returns 最终抗性
 */
export function resistanceCalc(resistance: Resistance, reduce: Resistance): Resistance {
  let resultFire: number = resistance.fire - reduce.fire
  let result: Resistance = new Resistance(roundTo(resultFire < 0 ? resultFire / 2 : resultFire))
  return result
}

/**
 * 基本伤害计算
 * @author huaju
 * @description 公式: 攻击力 * 倍率 * (1 + 增伤) * (1 + 暴击伤害) * 防御系数 * (1 - 抗性系数)
 * @param attack 攻击力
 * @param multiplier 技能/伤害倍率
 * @param roleLevel 角色等级
 * @param enemyLevel 敌人等级
 * @param enemyResistance 敌人抗性
 * @param reduce 削抗
 * @param dmgPercentBonus 伤害加成
 * @param critDamage 暴击伤害
 * @param damageType 伤害类型
 * @param defenseReduction 减防系数(百分比小数)
 * @returns 计算后的伤害值
 */
export function calcDamage({
  attack,
  multiplier,
  roleLevel,
  enemyLevel,
  enemyResistance,
  dmgPercentBonus,
  critDamage,
  damageType,
  reduce = new Resistance(0),
  defenseReduction = 0,
}: CalcDamageParams): number {
  const resultResistance = resistanceCalc(
    enemyResistance,
    reduce ?? new Resistance(0),
  ).getResistanceType(damageType)
  if (resultResistance === undefined) throw new Error('传入的伤害类型有误')
  return roundTo(
    attack *
      multiplier *
      (1 + dmgPercentBonus) *
      (1 + critDamage) *
      defenseCalc(roleLevel, enemyLevel, defenseReduction) *
      (1 - resultResistance),
  )
}

/**
 * 基本伤害计算
 * @author huaju
 * @description 公式: 攻击力 * 倍率 * (1 + 增伤) * (1 + 暴击伤害) * 防御系数 * (1 - 抗性系数)
 * @param attack 攻击力
 * @param multiplier 技能/伤害倍率
 * @param roleLevel 角色等级
 * @param enemyLevel 敌人等级
 * @param enemyResistance 敌人抗性
 * @param reduce 削抗
 * @param dmgPercentBonus 伤害加成
 * @param critDamage 暴击伤害
 * @param damageType 伤害类型
 * @param defenseReduction 减防系数(百分比小数)
 * @returns 计算后的伤害值
 */
export function calcBaseDamage({
  attack,
  multiplier,
  roleLevel,
  enemyLevel,
  enemyResistance,
  dmgPercentBonus,
  critDamage,
  damageType,
  reduce = 0,
  defenseReduction = 0,
}: CalcBaseDamageParams): number {
  return calcDamage({
    attack: attack,
    multiplier: multiplier,
    roleLevel: roleLevel,
    enemyLevel: enemyLevel,
    enemyResistance: new Resistance(enemyResistance),
    dmgPercentBonus: dmgPercentBonus,
    critDamage: critDamage,
    damageType: damageType,
    reduce: new Resistance(reduce ?? 0),
    defenseReduction: defenseReduction,
  })
}

/**
 * 角色伤害计算
 * @description 公式: 基础攻击力 * (1 + 百分比攻击力加成) * 倍率 * (1 + 增伤) * (1 + 暴击伤害) * 防御系数 * (1 - 抗性系数)
 * @author huaju
 * @param roleName 角色名称
 * @param weaponName 武器名称
 * @param enemyName 敌人名称
 * @param roleLevel 角色等级
 * @param enemyLevel 敌人等级
 * @param atkPercent 百分比攻击力加成（小数）
 * @param reduce 削抗值（小数）
 * @param dmgPercentBonus 伤害百分比加成（小数）
 * @param critDamage 暴击伤害（小数）
 * @param damageType 伤害类型
 * @param defenseReduction 减防系数（百分比小数，0~1，默认 0）
 * @returns 角色各类型伤害结果
 */
export function calcRoleDamage({
  roleName,
  weaponName,
  enemyName,
  roleLevel,
  enemyLevel,
  atkPercent,
  dmgPercentBonus,
  critDamage,
  damageType,
  reduce = 0,
  defenseReduction = 0,
}: CalcRoleDamageParams): RoleDamageRes {
  const role = roles.find((x) => x.name === roleName)
  const weapon = weapons.find((x) => x.name === weaponName)
  const enemy = enemies.find((x) => x.name === enemyName)

  if (!role || !weapon || !enemy) {
    throw new Error('角色/武器/敌人 名称未找到')
  }

  let baseAttack = role.baseAttack + weapon.baseAttack

  let roleDamageRes: RoleDamageRes = {
    normalDamage: [],
    eDamage: [],
    qDamahe: [],
    passiveDamage: [],
  }
  role.normalAtkDamageBreakdown.forEach((multiplier) => {
    roleDamageRes.normalDamage.push(
      calcDamage({
        attack: baseAttack * (1 + atkPercent + weapon.atkPercent),
        multiplier,
        roleLevel: roleLevel,
        enemyLevel: enemyLevel,
        enemyResistance: enemy.resistances,
        dmgPercentBonus: dmgPercentBonus + weapon.dmgPercentBonus,
        critDamage: critDamage + weapon.critDamage + role.critDamage,
        damageType: damageType,
        reduce: new Resistance(reduce ?? 0),
        defenseReduction: defenseReduction,
      }),
    )
  })
  role.eAtkDamageBreakdown.forEach((multiplier) => {
    roleDamageRes.eDamage.push(
      calcDamage({
        attack: baseAttack * (1 + atkPercent + weapon.atkPercent),
        multiplier,
        roleLevel: roleLevel,
        enemyLevel: enemyLevel,
        enemyResistance: enemy.resistances,
        dmgPercentBonus: dmgPercentBonus + weapon.dmgPercentBonus,
        critDamage: critDamage + weapon.critDamage + role.critDamage,
        damageType: damageType,
        reduce: new Resistance(reduce ?? 0),
        defenseReduction: defenseReduction,
      }),
    )
  })
  role.qAtkDamageBreakdown.forEach((multiplier) => {
    roleDamageRes.qDamahe.push(
      calcDamage({
        attack: baseAttack * (1 + atkPercent + weapon.atkPercent),
        multiplier,
        roleLevel: roleLevel,
        enemyLevel: enemyLevel,
        enemyResistance: enemy.resistances,
        dmgPercentBonus: dmgPercentBonus + weapon.dmgPercentBonus,
        critDamage: critDamage + weapon.critDamage + role.critDamage,
        damageType: damageType,
        reduce: new Resistance(reduce ?? 0),
        defenseReduction: defenseReduction,
      }),
    )
  })
  role.passiveDamageBreakdown.forEach((multiplier) => {
    roleDamageRes.passiveDamage.push(
      calcDamage({
        attack: baseAttack * (1 + atkPercent + weapon.atkPercent),
        multiplier,
        roleLevel: roleLevel,
        enemyLevel: enemyLevel,
        enemyResistance: enemy.resistances,
        dmgPercentBonus: dmgPercentBonus + weapon.dmgPercentBonus,
        critDamage: critDamage + weapon.critDamage + role.critDamage,
        damageType: damageType,
        reduce: new Resistance(reduce ?? 0),
        defenseReduction: defenseReduction,
      }),
    )
  })

  return roleDamageRes
}

export { Resistance } from '@/core/o/resistance.js'
