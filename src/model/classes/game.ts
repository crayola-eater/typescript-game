import { Player } from "../interfaces/player";
import { Obstacle } from "./obstacle";
import { World } from "./world";

export class Game {
  #ctx: CanvasRenderingContext2D;
  #isRunning: boolean;

  constructor(
    private world: World,
    private players: Player[],
    private obstacles: Obstacle[],
    private canvas: HTMLCanvasElement
  ) {
    this.canvas.height = this.world.height;
    this.canvas.width = this.world.width;
    this.#ctx = this.canvas.getContext("2d")!;
    this.#isRunning = false;
  }

  otherPlayers(playerToExclude: Player) {
    return this.players.filter((player) => player !== playerToExclude);
  }

  /**
   * TODO: Put "draw"/"render" method on "Shape" class
   * and have all subclasses (Shot, MovableShape, HumanPlayer,
   * ComputerPlayer) override with their implementation
   * (depending on how they want to be rendered on the canvas).
   * Then the caller can just call "draw" method and the classes
   * themselves can be responsible for how they're represented.
   */
  play() {
    this.#ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const player of this.players) {
      player.move();

      // TODO: this is quadratic behaviour (and will scale poorly), but might not have enough
      // objects/comparisons to warrant a more efficient structure
      // e.g quadtree, octotree.
      if (
        player.extendsBeyond(this.world) ||
        player.collidesWithAny(...this.otherPlayers(player)) ||
        player.collidesWithAny(...this.obstacles)
      ) {
        player.moveBack();
      }

      // Player sprite
      this.#ctx.fillStyle = "red";
      this.#ctx.fillRect(player.x, player.y, player.width, player.height);

      // Player HP bar
      this.#ctx.fillStyle = player.health.currentColour;
      this.#ctx.fillRect(
        player.x,
        player.y - 40,
        player.health.currentPercentage * player.width,
        20
      );
      this.#ctx.strokeStyle = "black";
      this.#ctx.lineWidth = 2;
      this.#ctx.strokeRect(player.x, player.y - 40, player.width, 20);

      // Update
      for (const shot of player.shooter.shotsFired) {
        shot.move();

        // Has shot left the world/view scope
        if (shot.extendsBeyond(this.world)) {
          // TODO: Isn't this problematic? Shouldn't remove elements from what
          // we're iterating over.
          player.shooter.remove(shot);
          continue;
        }

        // Does shot collide with any obstacles?
        const obstaclesShot = shot.getAllCollisionsWith(...this.obstacles);
        obstaclesShot.forEach((obstacle) =>
          obstacle.health.changeHealthBy(-shot.damage)
        );

        // Does shot collide with any players?
        const playersShot = shot.getAllCollisionsWith(
          ...this.otherPlayers(player)
        );
        for (const player of playersShot) {
          player.health.changeHealthBy(-shot.damage);
          if (player.health.isEmpty) {
            this.#isRunning = false;
            return alert(`${player} lost!`);
          }
        }

        if (obstaclesShot.length > 0 || playersShot.length > 0) {
          // TODO: Isn't this problematic? Shouldn't remove elements from what
          // we're iterating over.
          player.shooter.remove(shot);
          continue;
        }

        this.#ctx.fillStyle = "goldenrod";
        this.#ctx.fillRect(shot.x, shot.y, 7, 7);
      }

      for (const obstacle of this.obstacles) {
        // Obstacle
        this.#ctx.fillStyle = "#704300";
        this.#ctx.fillRect(
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        );

        // Obstacle HP bar
        this.#ctx.fillStyle = obstacle.health.currentColour;
        this.#ctx.fillRect(
          obstacle.x,
          obstacle.y - 40,
          obstacle.health.currentPercentage * obstacle.width,
          20
        );
        this.#ctx.strokeStyle = "black";
        this.#ctx.lineWidth = 2;
        this.#ctx.strokeRect(obstacle.x, obstacle.y - 40, obstacle.width, 20);
      }
    }

    requestAnimationFrame(this.play.bind(this));
  }
}
