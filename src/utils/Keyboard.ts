export class Keyboard {
  public static readonly state: Map<string, boolean>;
  public static initialize() {
    // The `.bind(this)` here isn't necesary as these functions won't use `this`!
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }
  private static keyDown(e: KeyboardEvent): void {
    //Keyboard.state.set(e.code, true);
    console.log("siento una presion", e);
  }
  private static keyUp(e: KeyboardEvent): void {
    //Keyboard.state.set(e.code, false);
    console.log("siento una depresion", e);
  }
}
