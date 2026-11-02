export class Resistance {
  fire: number

  constructor(fire: number) {
    this.fire = fire
  }

  getResistanceType(type: number): number | undefined {
    switch (type) {
      case 1:
        return this.fire
      default:
        return undefined
    }
  }
}
