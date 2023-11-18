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
      moveUp: explorerFrames.slice(9, 12).map(frame => Texture.from(frame)),
      moveDown: explorerFrames.slice(0, 3).map(frame => Texture.from(frame)),
      moveLeft: explorerFrames.slice(3, 6).map(frame => Texture.from(frame)),
      moveLRight: explorerFrames.slice(6, 9).map(frame => Texture.from(frame)),
    };

    //Estado de animacion inicial del sprite
    this.animatedExplorer = new AnimatedSprite(this.states.down);

    this.addChild(this.animatedExplorer);

    this.animatedExplorer.anchor.set(0.5);

    //Inicializacion y llamado del evento para los teclados
    Keyboard.initialize();
    window.addEventListener("keyChanged", this.handleKeyChange.bind(this));
  }

  private handleKeyChange(event: Event): void {
    const keyEvent = event as CustomEvent;
    const { key, isPressed } = keyEvent.detail as {
      key: string;
      isPressed: boolean;
    };

    if (isPressed) {
      this.handleKeyPress(key);
    } else {
      this.handleKeyRelease(key);
    }
  }

  private handleKeyPress(key: string): void {
    switch (key) {
      case "ArrowUp":
        this.startAnimation(this.states.moveUp);
        break;
      case "ArrowDown":
        this.startAnimation(this.states.moveDown);
        break;
      case "ArrowLeft":
        this.startAnimation(this.states.moveLeft);
        break;
      case "ArrowRight":
        this.startAnimation(this.states.moveLRight);
        break;
      default:
        break;
    }
  }

  private startAnimation(textures: Array<Texture>): void {
    if (
      !this.animatedExplorer.playing ||
      this.animatedExplorer.textures !== textures
    ) {
      this.animatedExplorer.textures = textures;
      this.animatedExplorer.loop = true;
      this.animatedExplorer.animationSpeed = 0.2;
      this.animatedExplorer.play();
    }
  }

  private handleKeyRelease(key: string): void {
    switch (key) {
      case "ArrowUp":
        this.startAnimation(this.states.up);
        this.animatedExplorer.stop();
        break;
      case "ArrowDown":
        this.startAnimation(this.states.down);
        this.animatedExplorer.stop();

        break;
      case "ArrowLeft":
        this.startAnimation(this.states.left);
        this.animatedExplorer.stop();

        break;
      case "ArrowRight":
        this.startAnimation(this.states.right);
        this.animatedExplorer.stop();
        break;
      default:
        break;
    }
  }
}
