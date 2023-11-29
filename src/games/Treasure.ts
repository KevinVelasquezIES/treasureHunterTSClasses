import { Container, Sprite } from "pixi.js";

export class Treasure extends Container {
  private followExplorer: boolean = false;

  constructor() {
    super();
    const treasure = Sprite.from("Treasure");
    this.addChild(treasure);
  }

  public explorerTookTreasure(took: boolean): void {
    this.followExplorer = took;
  }

  public follow(explorerGlobalPosition: PIXI.point): void {
    if (this.followExplorer) {
      this.position.copyFrom(explorerGlobalPosition);
    }
  }
}
