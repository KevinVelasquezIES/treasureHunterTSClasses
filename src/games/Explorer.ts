import { AnimatedSprite, Container, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";

interface ExplorerStates {
  //Estados de animacion dentro del array de frames
  up: Array<Texture>;
  down: Array<Texture>;
  left: Array<Texture>;
  right: Array<Texture>;
  moveUp: Array<Texture>;
  moveDown: Array<Texture>;
  moveLeft: Array<Texture>;
  moveLRight: Array<Texture>;
}

export class Explorer extends Container {
  private states: ExplorerStates;
  private animatedExplorer: AnimatedSprite;
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

    //Diferentes estados posibles del sprite
    this.states = {
      up: explorerFrames.slice(9).map(frame => Texture.from(frame)),
      down: explorerFrames.slice(0).map(frame => Texture.from(frame)),
      left: explorerFrames.slice(3).map(frame => Texture.from(frame)),
      right: explorerFrames.slice(6).map(frame => Texture.from(frame)),
      moveUp: explorerFrames.slice(0, 3).map(frame => Texture.from(frame)),
      moveDown: explorerFrames.slice(9, 12).map(frame => Texture.from(frame)),
      moveLeft: explorerFrames.slice(3, 6).map(frame => Texture.from(frame)),
      moveLRight: explorerFrames.slice(6, 9).map(frame => Texture.from(frame)),
    };

    //Estado de animacion inicial del sprite
    this.animatedExplorer = new AnimatedSprite(this.states.down);

    this.addChild(this.animatedExplorer);

    this.animatedExplorer.anchor.set(0.5);

    Keyboard.initialize();
  }
}
