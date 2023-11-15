import { Container, Sprite } from "pixi.js";

export class Treasure extends Container {
  constructor() {
    super();
    const treasure = Sprite.from("Treasure");
    this.addChild(treasure);
  }
}
