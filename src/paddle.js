export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 150;
    this.height = 20;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2, // middle horizontal
      y: game.gameHeight - this.height - 10 // vertical
    };

    this.maxSpeed = 7;
    this.speed = 0;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    // stop at the wall on the left
    if (this.position.x < 0) this.position.x = 0;
    // stop at the wall on the right
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}
