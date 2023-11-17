import { Container, Ticker } from "pixi.js";
import { randomInt } from "../utils/RandomInt";
import { Blob } from "./Blob";

export class BlobMoving extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;

  private blob: Blob;
  private blobVelocity: number = 3;
  private blobsArray: Blob[] = [];
  private numberOfBlobs: number = 6;
  private spacingOnBlobs: number = 48;
  private xOffsetFirtsBlob: number = 150;
  private blobVelocityY: number;
  private blobDirection: number = 1;

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    console.log(this.screenHeight, this.screenWidth);

    for (let i = 0; i < this.numberOfBlobs; i++) {
      this.blob = new Blob(this.blobVelocity);

      const x = this.spacingOnBlobs * i + this.xOffsetFirtsBlob;

      const y = randomInt(32, 512 - this.blob.height * 2);

      this.blob.x = x;
      this.blob.y = y;

      this.blobVelocityY = this.blobVelocity * this.blobDirection;

      this.blobDirection *= -1;

      // this.blobsArray.push(this.blob);

      // this.addChild(this.blob);
    }

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
    this.blobsArray.forEach(element => {
      this.blobVelocityY = this.blobVelocityY * deltaTime;

      element.y += this.blobVelocityY;

      if (element.y > this.screenHeight - element.height * 2) {
        // Woah there blob, come back inside the screen!
        this.blobVelocityY *= -1;
        element.blobDown();
      }
      if (element.y < element.height) {
        this.blobVelocityY *= -1;
        element.blobUp();
      }
    });
    this.blob.y = this.blob.y + this.blobVelocity * deltaTime;

    if (this.blob.y > this.screenHeight - this.blob.height * 2) {
      // Woah there blob, come back inside the screen!
      this.blobVelocity = -this.blobVelocity;
      this.blob.blobDown();
    }
    if (this.blob.y < this.blob.height) {
      this.blobVelocity = -this.blobVelocity;
      this.blob.blobUp();
    }
  }
}
