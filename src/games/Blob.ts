import { AnimatedSprite, Container, Texture } from "pixi.js";

interface BlobStates {
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

export class Blob extends Container {
  private states: BlobStates;
  private animatedBlob: AnimatedSprite;

  constructor(velocity: number) {
    super();

    //Array con los frames necesarios para la animacion
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

    //Diferentes estados posibles del sprite
    this.states = {
      up: blobFrames.slice(0).map(frame => Texture.from(frame)),
      down: blobFrames.slice(9).map(frame => Texture.from(frame)),
      left: blobFrames.slice(3).map(frame => Texture.from(frame)),
      right: blobFrames.slice(6).map(frame => Texture.from(frame)),
      moveUp: blobFrames.slice(0, 3).map(frame => Texture.from(frame)),
      moveDown: blobFrames.slice(9, 12).map(frame => Texture.from(frame)),
      moveLeft: blobFrames.slice(3, 6).map(frame => Texture.from(frame)),
      moveLRight: blobFrames.slice(6, 9).map(frame => Texture.from(frame)),
    };

    //Estado de animacion inicial del sprite
    this.animatedBlob = new AnimatedSprite(this.states.moveUp);
    this.addChild(this.animatedBlob);

    this.animatedBlob.play();
    this.animatedBlob.animationSpeed = velocity / 16; //Velocidad de animacion
  }

  //Metodo para cambio de estados desde texto
  changeState(newState: keyof BlobStates) {
    this.animatedBlob.textures = this.states[newState];
    this.animatedBlob.play();
  }

  blobDown() {
    // console.log("Down");
    this.changeState("moveDown"); // Cambiar al estado de movimiento
  }

  blobUp() {
    // console.log("Up");
    this.changeState("moveUp"); // Cambiar al estado de movimiento
  }
}
