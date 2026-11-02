interface Weapon {
  name: string
  baseAttack: number
  atkPercent: number
  hpPercentBonus: number
  defPercentBonus: number
  dmgPercentBonus: number
  critRate: number
  critDamage: number
}

export const weapons: Weapon[] = [
  {
    name: '测试武器',
    baseAttack: 600,
    atkPercent: 0.5,
    hpPercentBonus: 0.5,
    defPercentBonus: 0.8,
    dmgPercentBonus: 0.4,
    critRate: 0.2,
    critDamage: 1.2,
  },
]
