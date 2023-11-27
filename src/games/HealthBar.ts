import { Container, Graphics } from "pixi.js";

export class HealthBar extends Container {
  private background: Graphics;
  private bar: Graphics;
  private barWidth: number;
  private barHeight: number;
  private maxValue: number;
  public currentValue: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    maxValue: number
  ) {
    super();
    this.position.set(x, y);
    this.barWidth = width;
    this.barHeight = height;
    this.maxValue = maxValue;
    this.currentValue = maxValue;

    this.background = new Graphics();
    this.background.beginFill(0x000000); // Color negro del fondo
    this.background.drawRect(0, 0, this.barWidth, this.barHeight);
    this.background.endFill();
    this.addChild(this.background);

    this.bar = new Graphics();
    this.bar.beginFill(0xff0000); // Color rojo de la barra
    this.bar.drawRect(0, 0, this.calculateBarWidth(), this.barHeight);
    this.bar.endFill();
    this.addChild(this.bar);
  }

  public updateValue(newValue: number): void {
    this.currentValue = newValue;
    this.bar.width = this.calculateBarWidth();
  }

  private calculateBarWidth(): number {
    return (this.currentValue / this.maxValue) * this.barWidth;
  }
}
