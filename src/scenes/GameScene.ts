import { Container, Sprite } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Treasure } from "../games/Treasure";
import { Door } from "../games/Door";
import { sound } from "@pixi/sound";
import { Explorer } from "../games/Explorer";
import { Blob } from "../games/Blob";
import { BlobMoving } from "../games/BlobMoving";

export class GameScene extends Container implements IScene {
  private dungeon: Sprite;
  private door: Door;
  private treasure: Treasure;
  private explorer: Explorer;
  private blob: Blob;
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
    //Add the blob and position it on screen
    this.blob = new BlobMoving(512, 512);
    // Add the explorer sprite and position it on screen
    this.explorer = new Explorer();
    this.explorer.position.set(68, 512 / 2 - this.explorer.height / 2);

    // Show all sprites on GameScene
    this.addChild(
      this.dungeon,
      this.door,
      this.treasure,
      this.blob,
      this.explorer
    );

    //Game sound
    // sound.play("Hard_NES", { loop: true });
    sound.volume("Hard_NES", 0.3);
  }

  public update(framesPassed: number): void {
    // Lets move clampy!
    /*     this.clampy.x += this.clampyVelocity * framesPassed;

    if (this.clampy.x > Manager.width) {
      this.clampy.x = Manager.width;
      this.clampyVelocity = -this.clampyVelocity;
    }

    if (this.clampy.x < 0) {
      this.clampy.x = 0;
      this.clampyVelocity = -this.clampyVelocity;
    } */
  }
}
