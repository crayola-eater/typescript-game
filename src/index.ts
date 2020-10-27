import { defaultConfig } from "./defaultGameSetup";

const game = {
  ...defaultConfig,
};

const { world, players, obstacles } = defaultConfig;
const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
canvas.height = world.height;
canvas.width = world.width;

/**
 * TODO: Put "draw"/"render" method on "Shape" class
 * and have all subclasses (Shot, MovableShape, HumanPlayer,
 * ComputerPlayer) override with their implementation
 * (depending on how they want to be rendered on the canvas).
 * Then the caller can just call "draw" method and the classes
 * themselves can be responsible for how they're represented.
 */
const update = async () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const obstacle of obstacles) {
    // Obstacle
    ctx.fillStyle = "#704300";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    const { currentHealth } = obstacle.health;

    // Obstacle HP bar
    ctx.fillStyle =
      currentHealth > 60 ? "green" : currentHealth > 40 ? "yellow" : "red";
    ctx.fillRect(
      obstacle.x,
      obstacle.y - 40,
      obstacle.health.currentHealthAsPercentage * obstacle.width,
      20
    );
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(obstacle.x, obstacle.y - 40, obstacle.width, 20);
  }

  for (const player of players) {
    player.move();

    // TODO: this is quadratic behaviour (and will scale poorly), but might not have enough
    // objects/comparisons to warrant a more efficient structure
    // e.g quadtree, octotree.
    if (player.extendsBeyond(world) || player.collidesWithAny(...obstacles)) {
      player.moveBack();
    }

    const { currentHealth } = player.health;

    // Player sprite
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Player HP bar
    ctx.fillStyle =
      currentHealth > 60 ? "green" : currentHealth > 40 ? "yellow" : "red";
    ctx.fillRect(
      player.x,
      player.y - 40,
      player.health.currentHealthAsPercentage * player.width,
      20
    );
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y - 40, player.width, 20);

    // Update
    for (const shot of player.shooter.shotsFired) {
      shot.move();

      if (
        // Check if shot has left the world/scope of view
        shot.extendsBeyond(world) ||
        // Check if shot collides with obstacles?
        shot.collidesWithAny(...obstacles) ||
        // TODO: Need a convenience method here
        // Check if shot collides with player?
        shot.collidesWithAny(...players.filter((p) => p !== player))
      ) {
        // console.log("shot collided with", shot);
        player.shooter.remove(shot);
      }

      ctx.fillStyle = "goldenrod";
      ctx.fillRect(shot.x, shot.y, 7, 7);
    }
  }

  // await new Promise((resolve) => setTimeout(resolve, 1e3));
  requestAnimationFrame(update);
};

update();
