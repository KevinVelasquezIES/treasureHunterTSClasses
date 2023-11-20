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
  private explorerVelocity: number = 5;
  private movement: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };

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

    this.animatedExplorer = new AnimatedSprite(this.states.down);
    this.addChild(this.animatedExplorer);
    this.animatedExplorer.anchor.set(0.5);

    this.movement = { up: false, down: false, left: false, right: false };

    this.setupGameLoop();
    Keyboard.initialize();
    window.addEventListener("keyChanged", this.handleKeyChange.bind(this));
  }

  private setupGameLoop(): void {
    const update = () => {
      if (this.movement.up) {
        this.animatedExplorer.y -= this.explorerVelocity;
        this.startAnimation(this.states.moveUp);
      }
      if (this.movement.down) {
        this.animatedExplorer.y += this.explorerVelocity;
        this.startAnimation(this.states.moveDown);
      }
      if (this.movement.left) {
        this.animatedExplorer.x -= this.explorerVelocity;
        this.startAnimation(this.states.moveLeft);
      }
      if (this.movement.right) {
        this.animatedExplorer.x += this.explorerVelocity;
        this.startAnimation(this.states.moveLRight);
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  private handleKeyChange(event: Event): void {
    const keyEvent = event as CustomEvent;
    const { key, isPressed } = keyEvent.detail as {
      key: string;
      isPressed: boolean;
    };

    switch (key) {
      case "ArrowUp":
        this.movement.up = isPressed;
        break;
      case "ArrowDown":
        this.movement.down = isPressed;
        break;
      case "ArrowLeft":
        this.movement.left = isPressed;
        break;
      case "ArrowRight":
        this.movement.right = isPressed;
        break;
      default:
        break;
    }

    if (!isPressed) {
      this.handleKeyRelease(key); // Llamada al método para liberación de tecla
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
        this.animatedExplorer.textures = this.states.up;
        this.animatedExplorer.stop();
        this.movement.up = false;
        break;
      case "ArrowDown":
        this.animatedExplorer.textures = this.states.down;
        this.animatedExplorer.stop();
        this.movement.down = false;
        break;
      case "ArrowLeft":
        this.animatedExplorer.textures = this.states.left;
        this.animatedExplorer.stop();
        this.movement.left = false;
        break;
      case "ArrowRight":
        this.animatedExplorer.textures = this.states.right;
        this.animatedExplorer.stop();
        this.movement.right = false;
        break;
      default:
        break;
    }
  }
}
