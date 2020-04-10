import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("image_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.size = 16;
    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 200 };
    this.speed = { x: 4, y: -2 }; // y as - the balls goes down to up, positive is top to bottom
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
      this.speed.x = -this.speed.x;

    // wall on top
    if (this.position.y < 0) this.speed.y = -this.speed.y;

    // bottom of wall
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // // top or button floor
    // if (this.position.y + this.size > this.gameHeight || this.position.y < 0)
    //   this.speed.y = -this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
