import { AnimatedSprite, Container, Texture } from "pixi.js";
import { blob } from "stream/consumers";

export class Blob extends Container {
  constructor() {
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

    // const blobAnimated: AnimatedSprite = new AnimatedSprite(
    //   blobFrames.map(stringy) => Texture.from(stringy));

    const blobAnimated: AnimatedSprite = new AnimatedSprite(
      blobFrames.map(stringy => Texture.from(stringy))
    );
  }
}
