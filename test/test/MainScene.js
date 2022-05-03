import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);

    this.load.image("base_tiles", "base_tiles/tileset.png");
    this.load.tilemapTiledJSON("tilemap", "base_tiles/map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("test-tiles", "base_tiles");

    // "Ground" layer will be on top of "Background" layer
    map.createLayer("Ground", tileset, 0, 0);
    // "Ground" layer will be on top of "Background" layer

    this.treeLayer = map.createLayer("Another-stuff", tileset, 0, 0);
    this.treeLayer.setCollisionByProperty({ collide: true });
    this.matter.world.convertTilemapLayer(this.treeLayer);
    this.treeLayer.setDepth(100);

    console.log("create");
    this.player = new Player({
      scene: this,
      x: 100,
      y: 50,
      texture: "slime",
      frame: "slime-idle-0",
    });
    this.player.setScale(2);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = 0.6;
    this.cameras.main.setBounds(0, 0, 2550, 2550);
  }
  
  update() {
    this.player.update();
  }
}
