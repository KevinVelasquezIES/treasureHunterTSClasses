import { AnimatedSprite, Container, Texture } from "pixi.js";

export class Blob extends Container {
  constructor(velocity: number) {
    super();

    const blobFrames: Array<string> = [
      "Blob_00",
      "Blob_01",
      "Blob_02",
      "Blob_03",
      "Blob_04",
      "Blob_05",
      "Blob_06",
      "Blob_07",
      "Blob_08",
      "Blob_09",
      "Blob_10",
      "Blob_11",
    ];

    const animatedBlob: AnimatedSprite = new AnimatedSprite(
      blobFrames.map(stringy => Texture.from(stringy))
    );

    this.addChild(animatedBlob);

    // Now... what did we learn about assigning functions...
    // animatedBlob.onFrameChange = this.onBlobFrameChange.bind(this);
    animatedBlob.play();
    animatedBlob.animationSpeed = velocity / 100;
  }

  /* private onBlobFrameChange(currentFrame: any): void {
    console.log("Vegito's current frame is", currentFrame);
  } */
  blobDown() {
    console.log("Down");
  }

  blobUp() {
    console.log("Up");
  }
}
