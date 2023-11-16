import { AnimatedSprite, Container, Texture } from "pixi.js";

export class Explorer extends Container {
  constructor() {
    super();

    const explorerFrames: Array<string> = [
      "Explorer_00",
      "Explorer_01",
      "Explorer_02",
      "Explorer_03",
      "Explorer_04",
      "Explorer_05",
      "Explorer_06",
      "Explorer_07",
      "Explorer_08",
      "Explorer_09",
      "Explorer_10",
      "Explorer_11",
    ];

    const animatedExplorer: AnimatedSprite = new AnimatedSprite(
      explorerFrames.map(stringy => Texture.from(stringy))
    );

    this.addChild(animatedExplorer);
  }
}
