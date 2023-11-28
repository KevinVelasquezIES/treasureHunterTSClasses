import { Container, Sprite } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Treasure } from "../games/Treasure";
import { Door } from "../games/Door";
import { sound } from "@pixi/sound";
import { Explorer } from "../games/Explorer";
import { Blob } from "../games/Blob";
import { BlobMoving } from "../games/BlobMoving";
import { HealthBar } from "../games/HealthBar";
import { LoseScene } from "./LoseScene";

export class GameScene extends Container implements IScene {
  private dungeon: Sprite;
  private door: Door;
  private treasure: Treasure;
  private explorer: Explorer;
  private blob: Blob;
  private heatlhBar: HealthBar;

  constructor() {
    super();

    // Use background dungeon sprite
    this.dungeon = Sprite.from("Dungeon");
    // Insert door sprite and position it on screen
    this.door = new Door();
    this.door.position.set(32, 0);
    // Add the treasure sprite and position it on screen
    this.treasure = new Treasure();
    this.treasure.x = 512 - this.treasure.width - 48;
    this.treasure.y = 512 / 2 - this.treasure.height / 2;
    // Add the explorer sprite and position it on screen
    this.explorer = new Explorer();
    this.explorer.position.set(68, 512 / 2 - this.explorer.height / 2);
    console.log(this.explorer.position);
    //Add Health bar and position it on screen
    this.heatlhBar = new HealthBar(330, 15, 150, 10, 100);

    //Add blobs!
    const numberOfBlobs = 5; // Puedes ajustar el número de blobs aquí
    this.blob = new BlobMoving(numberOfBlobs, 512, 512);

    // Show all sprites on GameScene
    this.addChild(
      this.dungeon,
      this.door,
      this.blob,
      this.treasure,
      this.explorer,
      this.heatlhBar
    );

    //Game sound
    // sound.play("Hard_NES", { loop: true });
    sound.volume("Hard_NES", 0.3);
  }

  public update(framesPassed: number): void {
    this.checkCollisions();
  }

  private checkCollisions(): void {
    const explorerBounds = this.explorer.getBounds();
    const blobBounds = this.blob.getBounds();
    const treasureBounds = this.treasure.getBounds();
    let healthValue: number = this.heatlhBar.currentValue;

    if (
      explorerBounds.x + explorerBounds.width > blobBounds.x &&
      explorerBounds.x < blobBounds.x + blobBounds.width &&
      explorerBounds.y + explorerBounds.height > blobBounds.y &&
      explorerBounds.y < blobBounds.y + blobBounds.height
    ) {
      this.explorer.alpha = 0.5;
      healthValue -= 1;
      this.heatlhBar.updateValue(healthValue);
      console.log(healthValue);
    } else {
      this.explorer.alpha = 1.0;
    }

    if (healthValue < 0) {
      Manager.changeScene(new LoseScene());
    }
    if (
      explorerBounds.x + explorerBounds.width > treasureBounds.x &&
      explorerBounds.x < treasureBounds.x + treasureBounds.width &&
      explorerBounds.y + explorerBounds.height > treasureBounds.y &&
      explorerBounds.y < treasureBounds.y + treasureBounds.height
    ) {
      // Acción cuando hay colisión: Pegar el treasure del explorer
      const offset = 15;
      this.treasure.x = this.explorer.position.x + offset;
      this.treasure.y = this.explorer.position.y + offset;
    }
  }
}
