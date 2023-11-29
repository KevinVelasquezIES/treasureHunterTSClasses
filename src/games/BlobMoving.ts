import { Container, Ticker } from "pixi.js";
import { randomInt } from "../utils/RandomInt";
import { Blob } from "./Blob";

export class BlobMoving extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;

  private blob: Blob;
  private blobVelocity: number = randomInt(3, 6);
  private blobDirection: number = 1; // Dirección inicial del movimiento

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.blob = new Blob(this.blobVelocity);

    this.blob.x = 120; // Empezamos en 0
    this.blob.y = randomInt(32, this.screenHeight - this.blob.height * 2);
    this.addChild(this.blob);

    Ticker.shared.add(this.update, this);
  }

  private update(deltaTime: number): void {
    // Movemos el blob en base a la velocidad y dirección
    this.blob.y += this.blobVelocity * this.blobDirection * deltaTime;

    // Si el blob llega al límite inferior, cambiamos la dirección hacia arriba
    if (this.blob.y > this.screenHeight - this.blob.height * 2) {
      this.blobDirection = -1;
      this.blob.blobDown();
    }

    // Si el blob llega al límite superior, cambiamos la dirección hacia abajo
    if (this.blob.y < this.blob.height) {
      this.blobDirection = 1;
      this.blob.blobUp();
    }
  }
}
