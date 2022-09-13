import { utils } from "./utils.js";

class search {
  constructor(result) {
    this.tagsNode = document.querySelector(".tags");
    this._result = result;
  }

  init() {
    this.events(this._result);
  }

  /**
   * Add events for main search
   */
  events(result) {
    const inputSearch = document.querySelector("#mainSearch");
    const event = "keyup";
    const eventFunction = function (ev) {
      const value = ev.target.value.trim();
      const valueLength = value.length;

      /* In case, the search field is not sufficiently complete. */
      if (valueLength <= 2) {
        // Since the user may have deleted his search at this time, the object of the manual search must be cleared.
        result.data.manualSearch = null;
        console.log("!! Invalid search value !!", result.data.manualSearch);
        return;
      }

      /* The user has sufficiently filled in the manual search field, so the results can be filtered. */
      result.data.manualSearch = value;
      console.log("search for main result", result.data.manualSearch);
      result.parser();

    };

    const _utils = new utils();
    _utils.addListeners(inputSearch, event, eventFunction);
  }
}

export { search };