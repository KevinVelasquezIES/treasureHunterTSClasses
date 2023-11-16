import { Container, Ticker } from "pixi.js";
import { randomInt } from "../utils/RandomInt";
import { Blob } from "./Blob";

export class BlobMoving extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;

  private blob: Blob;
  private blobVelocity: number = randomInt(2, 6);
  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    console.log(this.screenHeight, this.screenWidth);

    this.blob = new Blob(this.blobVelocity);

    this.blob.x = 150; // we start it at 0
    this.blob.y = randomInt(32, 512 - this.blob.height * 2);
    this.addChild(this.blob);

    // See the `, this` thingy there? That is another way of binding the context!
    Ticker.shared.add(this.update, this);

    // If you want, you can do it the bind way
    // Ticker.shared.add(this.update.bind(this));
  }

  private update(deltaTime: number): void {
    this.blob.y = this.blob.y + this.blobVelocity * deltaTime;

    if (this.blob.y > this.screenHeight - this.blob.height * 2) {
      // Woah there blob, come back inside the screen!
      this.blobVelocity = -this.blobVelocity;
      this.blob.blobUp();
    }
    if (this.blob.y < this.blob.height) {
      this.blobVelocity = -this.blobVelocity;
      this.blob.blobDown();
    }
  }
}
