import { utils } from "./utils.js";

class tags {
  constructor() {
  }

  init() {
    this.events();
  }

  /**
   * Add events for tags search
   */
  events() {
    let inputTags = [];
    inputTags.push(document.querySelector("#searchIngredients"));
    inputTags.push(document.querySelector("#searchDevices"));
    inputTags.push(document.querySelector("#searchUstensils"));

    inputTags.forEach( input => {
      const event = "keyup";
      const eventFunction = function (ev) {
        const value = ev.target.value;
        const valueLength = value.length;

        if(valueLength <= 2) { return; }

        console.log("search for tags result");
      };

      const _utils = new utils();
      _utils.addListeners(input, event, eventFunction);
    });
  }
}

export { tags };