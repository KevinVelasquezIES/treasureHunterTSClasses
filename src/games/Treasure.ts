import { Container, Sprite } from "pixi.js";

export class Treasure extends Container {
  private treasure: Sprite;
  constructor() {
    super();
    this.treasure = Sprite.from("Treasure");
    this.treasure.anchor.set(0.5);
    this.addChild(this.treasure);
  }

  public followExplorer(explorerPosition: { x: number; y: number }): void {
    // Actualizar la posición del tesoro basada en la posición actual del explorador
    this.treasure.scale.set(0.8);
    this.position.set(explorerPosition.x + 15, explorerPosition.y);
  }
}
