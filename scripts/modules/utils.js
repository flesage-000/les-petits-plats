export class utils {
  constructor() {}

  addListeners(input, event, eventFunction) {
    input.addEventListener(event, ev => eventFunction(ev));
  }
}
