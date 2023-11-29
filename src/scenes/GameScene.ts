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
import { WinScene } from "./WinScene";

export class GameScene extends Container implements IScene {
  private dungeon: Sprite;
  private door: Door;
  private treasure: Treasure;
  private explorer: Explorer;
  private blob: Blob;
  private blobs: Blob[] = [];
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

    // Show all sprites on GameScene
    this.addChild(
      this.dungeon,
      this.door,
      this.treasure,
      this.explorer,
      this.heatlhBar
    );

    //Add blobs!
    const numberOfBlobs = 5; // Puedes ajustar el número de blobs aquí
    const horizontalSpacing = 50;
    const dungeonWidth = this.dungeon.width;
    const dungeonHeight = this.dungeon.height;

    for (let i = 0; i < numberOfBlobs; i++) {
      this.blob = new BlobMoving(dungeonWidth, dungeonHeight); // Velocidad de animación
      this.blob.position.set(horizontalSpacing * (i + 1), 0); // Posición inicial horizontal y vertical
      this.addChild(this.blob);
      this.blobs.push(this.blob);
    }

    //Game sound
    // sound.play("Hard_NES", { loop: true });
    sound.volume("Hard_NES", 0.3);
  }

  public update(framesPassed: number): void {
    this.checkCollisions();
  }

  private checkCollisions(): void {
    const explorerBounds = this.explorer.getBounds();
    const treasureBounds = this.treasure.getBounds();
    let healthValue: number = this.heatlhBar.currentValue;
    const doorBounds = this.door.getBounds();

    this.blobs.forEach(blob => {
      const blobBounds = blob.getBounds();
      if (
        explorerBounds.x + explorerBounds.width > blobBounds.x &&
        explorerBounds.x < blobBounds.x + blobBounds.width &&
        explorerBounds.y + explorerBounds.height > blobBounds.y &&
        explorerBounds.y < blobBounds.y + blobBounds.height
      ) {
        this.explorer.alpha = 0.5;
        healthValue -= 2;
        this.heatlhBar.updateValue(healthValue);
        console.log(healthValue);
      } else {
        this.explorer.alpha = 1.0;
      }
    });

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
      Treasure.explorerTookTreasure(true);
    } else {
      Treasure.explorerTookTreasure(false);
    }

    if (
      treasureBounds.x + treasureBounds.width > doorBounds.x &&
      treasureBounds.x < doorBounds.x + doorBounds.width &&
      treasureBounds.y + treasureBounds.height > doorBounds.y &&
      treasureBounds.y < doorBounds.y + doorBounds.height
    ) {
      // Acción cuando hay colisión: Pegar el treasure del explorer
      Manager.changeScene(new WinScene());
    }
  }
}
