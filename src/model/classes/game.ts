import { Player } from "../components/player";
import { ComputerPlayer } from "./computerPlayer";
import { Obstacle } from "./obstacle";
import { World } from "./world";

export class Game {
  #ctx: CanvasRenderingContext2D;

  constructor(
    private world: World,
    private players: Player[],
    private obstacles: Obstacle[],
    private canvas: HTMLCanvasElement
  ) {
    this.canvas.height = this.world.height;
    this.canvas.width = this.world.width;
    this.#ctx = this.canvas.getContext("2d")!;
  }

  get computerPlayers(): ComputerPlayer[] {
    return this.players.filter(
      (player) => player instanceof ComputerPlayer
    ) as ComputerPlayer[];
  }

  otherPlayers(playerToExclude: Player) {
    return this.players.filter((player) => player !== playerToExclude);
  }

  updatePositions() {
    for (const computerPlayer of this.computerPlayers) {
      const playerToShoot = this.players.find(
        (player) => player !== computerPlayer
      )!;
      computerPlayer.shoot({
        x: playerToShoot.center.x,
        y: playerToShoot.center.y,
      });
    }

    this.players = this.players.filter((player) => !player.health.isEmpty);

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

      for (const shot of player.shooter.shotsFired) {
        shot.move();
      }

      this.processCollisions();
    }
  }

  processCollisions() {
    for (const player of this.players) {
      player.shooter.keepShotsWhere((shot) => {
        // Does shot collide with any obstacles?
        const obstaclesShot = shot.getAllCollisionsWith(...this.obstacles);
        obstaclesShot.forEach((obstacle) =>
          obstacle.health.changeHealthBy(-shot.damage)
        );

        // Does shot collide with any players?
        const playersShot = shot.getAllCollisionsWith(
          ...this.otherPlayers(player)
        );
        playersShot.forEach((player) =>
          player.health.changeHealthBy(-shot.damage)
        );

        return (
          obstaclesShot.length === 0 &&
          playersShot.length === 0 &&
          // Has shot left the world/view scope?
          !shot.extendsBeyond(this.world)
        );
      });
    }

    this.obstacles = this.obstacles.filter(
      (obstacle) => !obstacle.health.isEmpty
    );
  }

  draw() {
    this.#ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const player of this.players) {
      player.draw(this.#ctx);

      for (const shot of player.shooter.shotsFired) {
        shot.draw(this.#ctx);
      }

      for (const obstacle of this.obstacles) {
        obstacle.draw(this.#ctx);
      }
    }
  }

  getWinnerOrNull(): Player | null {
    const remainingPlayers = this.players.filter(
      (player) => !player.health.isEmpty
    );

    return remainingPlayers.length === 1 ? remainingPlayers[0] : null;
  }

  play() {
    this.updatePositions();
    this.draw();
    const winnerOrNull = this.getWinnerOrNull();
    if (winnerOrNull) {
      return setTimeout(() => alert(`${winnerOrNull.details.name} won!`), 10);
    }

    requestAnimationFrame(this.play.bind(this));
  }
}
