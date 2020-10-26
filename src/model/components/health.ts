export class Health {
  constructor(
    public maxHealth: number,
    public currentHealth: number = maxHealth
  ) {}

  changeHealthBy(change: number) {
    this.currentHealth += change;
  }

  get isDead() {
    return this.currentHealth === 0;
  }

  get currentHealthAsPercentage() {
    return this.currentHealth / this.maxHealth;
  }
}
