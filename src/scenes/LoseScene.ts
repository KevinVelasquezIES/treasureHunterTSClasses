import { Container, Sprite, Text } from "pixi.js";
import { Door } from "../games/Door";
import { IScene } from "./Manager";

export class LoseScene extends Container implements IScene {
  private dungeon: Sprite;
  private door: Door;

  constructor() {
    super();
    this.dungeon = Sprite.from("Dungeon");

    this.door = new Door();
    this.door.position.set(32, 0);

    const loseText = new Text("¡HAS MUERTO!", {
      fontSize: 50,
      fill: "#ff0000", // color del texto
      fontWeight: "bold",
      align: "center", // centra el texto horizontalmente
    });
    loseText.anchor.set(0.5, 0.5); // centra el ancla del texto
    loseText.x = 256;
    loseText.y = 256;

    this.addChild(this.dungeon, this.door, loseText);
  }
  update(framesPassed: number): void {
    throw new Error("Method not implemented.");
  }
}
