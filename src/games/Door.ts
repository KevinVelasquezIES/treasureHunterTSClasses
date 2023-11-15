import { Container, Sprite } from "pixi.js";

export class Door extends Container {
  constructor() {
    super();
    const door = Sprite.from("Door");
    this.addChild(door);
  }
}
