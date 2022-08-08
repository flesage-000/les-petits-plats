import { utils } from "./utils.js";

class search {
  constructor() {}

  init() {
    this.events();
  }

  /**
   * Add events for main search
   */
  events() {
    const inputSearch = document.querySelector("#mainSearch");
    const event = "keyup";
    const eventFunction = function (ev) {
      const value = ev.target.value;
      const valueLength = value.length;

      if(valueLength <= 2) { return; }

      console.log("search for main result");
    };

    const _utils = new utils();
    _utils.addListeners(inputSearch, event, eventFunction);
  }
}

export { search };