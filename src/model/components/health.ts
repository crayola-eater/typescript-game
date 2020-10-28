type HealthColour = "green" | "yellow" | "red";

export class Health {
  constructor(
    private maxHealth: number,
    private currentHealth: number = maxHealth
  ) {}

  changeHealthBy(change: number) {
    this.currentHealth = Math.max(0, this.currentHealth + change);
  }

  get isEmpty(): boolean {
    return this.currentHealth === 0;
  }

  get currentPercentage(): number {
    return this.currentHealth / this.maxHealth;
  }

  get currentColour(): HealthColour {
    if (this.currentPercentage > 0.6) {
      return "green";
    } else if (this.currentPercentage > 0.4) {
      return "yellow";
    }
    return "red";
  }
}
