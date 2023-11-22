import { Container, Sprite } from "pixi.js";
import { IScene, Manager } from "./Manager";
import { Treasure } from "../games/Treasure";
import { Door } from "../games/Door";
import { sound } from "@pixi/sound";
import { Explorer } from "../games/Explorer";
import { Blob } from "../games/Blob";
import { BlobMoving } from "../games/BlobMoving";
import { HealthBar } from "../games/HealthBar";

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
    //Add the blob and position it on screen
    this.blob = new BlobMoving(512, 512);
    // Add the explorer sprite and position it on screen
    this.explorer = new Explorer();
    this.explorer.position.set(68, 512 / 2 - this.explorer.height / 2);
    console.log(this.explorer.position);
    //Add Health bar and position it on screen
    this.heatlhBar = new HealthBar(330, 15, 150, 10, 100);

    // Show all sprites on GameScene
    this.addChild(
      this.dungeon,
      this.door,
      this.treasure,
      this.blob,
      this.explorer,
      this.heatlhBar
    );

    //Game sound
    // sound.play("Hard_NES", { loop: true });
    sound.volume("Hard_NES", 0.3);
  }

  public checkCollisions(): void {
    // Obtener dimensiones y posiciones del Explorer y el Blob
    const explorerBounds = this.explorer.getBounds();
    const blobBounds = this.blob.getBounds();
    let healthValue: number = 100;
    console.log(healthValue);

    // Verificar si los límites (bounds) se superponen
    if (
      explorerBounds.x + explorerBounds.width > blobBounds.x &&
      explorerBounds.x < blobBounds.x + blobBounds.width &&
      explorerBounds.y + explorerBounds.height > blobBounds.y &&
      explorerBounds.y < blobBounds.y + blobBounds.height
    ) {
      // Acción cuando hay colisión: Cambiar el alpha del Explorer
      this.explorer.alpha = 0.5; // O cualquier otro valor de alpha que desees
      healthValue -= 5;
      this.heatlhBar.updateValue(healthValue);
      console.log(healthValue);
    } else {
      // Si no hay colisión, restaurar el alpha del Explorer a su valor normal
      this.explorer.alpha = 1.0;
    }
  }

  public update(framesPassed: number): void {
    this.checkCollisions();
  }
}
