export class Health {
  constructor(
    private maxHealth: number,
    private currentHealth: number = maxHealth
  ) {}

  changeHealthBy(change: number) {
    this.currentHealth = Math.max(0, this.currentHealth + change);
  }

  get isEmpty() {
    return this.currentHealth === 0;
  }

  get currentPercentage() {
    return this.currentHealth / this.maxHealth;
  }

  get currentColour() {
    if (this.currentPercentage > 0.6) {
      return "green";
    } else if (this.currentPercentage > 0.4) {
      return "yellow";
    }
    return "red";
  }
}
