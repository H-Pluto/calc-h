interface Role {
  name: string
  hp: number
  baseAttack: number
  defense: number
  critRate: number
  critDamage: number
  level: number
  normalAtkDamageBreakdown: number[]
  eAtkDamageBreakdown: number[]
  qAtkDamageBreakdown: number[]
  passiveDamageBreakdown: number[]
}

export const roles: Role[] = [
  {
    name: '测试角色',
    hp: 7000,
    baseAttack: 750,
    defense: 490,
    critRate: 0.05,
    critDamage: 1,
    level: 100,
    normalAtkDamageBreakdown: [1.2],
    eAtkDamageBreakdown: [2.9],
    qAtkDamageBreakdown: [10],
    passiveDamageBreakdown: [],
  },
]
