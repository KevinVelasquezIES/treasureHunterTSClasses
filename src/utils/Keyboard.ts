export class Keyboard {
  public static readonly state: Map<string, boolean> = new Map();
  public static readonly keyPressedEvent = new Event("keyPressed");
  public static readonly keyReleasedEvent = new Event("keyReleased");

  public static initialize() {
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }

  private static keyDown(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, true);
    window.dispatchEvent(
      new CustomEvent("keyChanged", {
        detail: { key: e.code, isPressed: true },
      })
    );
  }

  private static keyUp(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, false);
    window.dispatchEvent(
      new CustomEvent("keyChanged", {
        detail: { key: e.code, isPressed: false },
      })
    );
  }
}
