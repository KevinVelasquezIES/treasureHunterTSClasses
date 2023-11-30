import { Container, Sprite, Text } from "pixi.js";
import { Door } from "../games/Door";
import { IScene } from "./Manager";
import { sound } from "@pixi/sound";

export class WinScene extends Container implements IScene {
  private dungeon: Sprite;
  private door: Door;

  constructor() {
    super();
    this.dungeon = Sprite.from("Dungeon");

    this.door = new Door();
    this.door.position.set(32, 0);

    const winText = new Text("¡HAS GANADO!", {
      fontSize: 50,
      fill: "#FFFF00", // color del texto
      fontWeight: "bold",
      align: "center", // centra el texto horizontalmente
    });
    winText.anchor.set(0.5, 0.5); // centra el ancla del texto
    winText.x = 256;
    winText.y = 256;

    this.addChild(this.dungeon, this.door, winText);

    //Game sound stop and win sound on
    sound.stop("Hard_NES");
    sound.play("Win_Sound");
    sound.volume("Win_Sound", 0.3);
  }
  update(framesPassed: number): void {
    throw new Error("Method not implemented.");
  }
}
