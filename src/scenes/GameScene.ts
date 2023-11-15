import { Container, Sprite } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Treasure } from "../games/Treasure";
import { Door } from "../games/Door";
import { sound } from "@pixi/sound";

export class GameScene extends Container implements IScene {
  private dungeon: Sprite;
  private door: Door;
  private treasure: Treasure;
  constructor() {
    super();

    // Inside assets.ts we have a line that says `"Clampy from assets.ts!": "./clampy.png",`
    this.dungeon = Sprite.from("Dungeon");

    this.door = new Door();
    this.door.position.set(32, 0);
    this.treasure = new Treasure();
    this.treasure.x = 512 - this.treasure.width - 48;
    this.treasure.y = 512 / 2 - this.treasure.height / 2;

    this.addChild(this.dungeon, this.door, this.treasure);

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
