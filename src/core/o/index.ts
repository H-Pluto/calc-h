import { Resistance } from '@/core/o/resistance.js'
import { roundTo } from '@/core/o/utils/calc.js'

/**
 * 攻击力计算
 * @author huaju
 * @param baseAttack 基础攻击（白值）
 * @param extreme 加成百分比
 * @returns 面板攻击力
 */
export function attackCalc(baseAttack: number, extreme: number) {
  return roundTo(baseAttack * (1 + extreme))
}

/**
 * 基础伤害计算
 * @author huaju
 * @param attribute 计算属性
 * @param multiplier 计算倍率
 * @returns 基础伤害
 */
export function baseDamageCalc(attribute: number, multiplier: number) {
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
export function featherCalc(attribute: number, multiplier: number) {
  return roundTo(attribute * multiplier)
}

/**
 * 敌对单位防御计算
 * @author huaju
 * @param roleLevel 角色等级
 * @param enemyLevel 敌人等级
 * @returns 防御值
 */
export function defenseCalc(roleLevel: number, enemyLevel: number) {
  return roundTo((roleLevel + 100) / (roleLevel + 100 + enemyLevel + 100))
}

/**
 * 抗性计算
 * @author huaju
 * @description 减抗后的负抗性相当于增伤，但是效果减半
 * @param resistance 原始抗性
 * @param reduce 削抗值
 * @returns 最终抗性
 */
export function resistanceCalc(resistance: Resistance, reduce: Resistance) {
  let resultFire: number = resistance.fire - reduce.fire
  let result: Resistance = {
    fire: roundTo(resultFire < 0 ? resultFire / 2 : resultFire),
  }
  return result
}
