class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/images/board.jpg");
    this.load.image("ship", "assets/images/ship.png");
    this.load.image("saitama", "assets/images/saitama2.png");
    this.load.image("garow", "assets/images/garow.png");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}
