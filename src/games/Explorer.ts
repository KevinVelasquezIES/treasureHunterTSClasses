import { AnimatedSprite, Container, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { Manager } from "../scenes/Manager";

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
  private explorerVelocity: number = 3;
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

      const explorerGlobalPosition = this.animatedExplorer.getGlobalPosition();
      // console.log("explorerGlobalPosition: ", explorerGlobalPosition);

      if (explorerGlobalPosition.x < 40) {
        //Se toma 40 por 32 pixeles del borde y 8 pixeles para que el explorer no quede atravezando el muro)
        this.animatedExplorer.x =
          this.animatedExplorer.x - explorerGlobalPosition.x + 40;
        this.startAnimation(this.states.left);
      } else if (explorerGlobalPosition.x > Manager.width - 40) {
        this.animatedExplorer.x = 404; // 404 signicia 512 del canvas menos 32 del borde menos 68 de la posicion global del explorer menos 8 para que no quede atravenzado el muro
        this.startAnimation(this.states.right);
      }

      if (explorerGlobalPosition.y < 40) {
        //Se toma 40 por 32 pixeles del borde y 8 pixeles para que el explorer no quede atravezando el muro)
        this.animatedExplorer.y =
          this.animatedExplorer.y - explorerGlobalPosition.y + 40;
        this.startAnimation(this.states.up);
      } else if (explorerGlobalPosition.y > Manager.height - 42) {
        this.animatedExplorer.y = 226; // 226 signicia 512 del canvas menos 32 del borde menos 240 de la posicion global del explorer menos 10 para que no quede atravenzado el muro
        this.startAnimation(this.states.down);
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
    console.log("Explorer X,Y: ", this.animatedExplorer.getGlobalPosition());
    console.log("Explorer Local: ", this.animatedExplorer.position);
  }
}
