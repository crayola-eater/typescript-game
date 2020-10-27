interface ControlMap {
  [control: string]: boolean;
}

type inputHandler = (
  input: string,
  newState: boolean,
  e: MouseEvent | KeyboardEvent
) => void;

export class Controls {
  inputs: ControlMap;
  #onInput: inputHandler;

  constructor(canvas: HTMLCanvasElement, window: Window) {
    // Might be worth setting this object up as a proxy?
    this.inputs = {
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      LMB: false,
    };
    this.#onInput = (input, newValue) => console.log({ input, newValue });

    const clickListener = (e: MouseEvent) => {
      if (0 === e.button) {
        this.inputs.LMB = e.type === "mousedown";
        this.#onInput("LMB", this.inputs.LMB, e);
      }
    };

    const keyListener = (e: KeyboardEvent) => {
      const { code } = e;
      if (this.inputs.hasOwnProperty(code)) {
        this.inputs[code] = e.type === "keydown";
        this.#onInput(code, this.inputs[code], e);
      }
    };

    canvas.addEventListener("mouseup", clickListener);
    canvas.addEventListener("mousedown", clickListener);
    window.addEventListener("keyup", keyListener);
    window.addEventListener("keydown", keyListener);
  }

  set onInputHandler(newHandler: inputHandler) {
    this.#onInput = newHandler;
  }
}
