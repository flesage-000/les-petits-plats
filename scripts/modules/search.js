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
    /** @type {object} The input on which to trigger the event. */
    const inputSearch = document.querySelector("#mainSearch");
    /** @type {string} The user action that causes the event. */
    const event = "keyup";
    /** @type {function} The function caused by the event. */
    const eventFunction = function (ev) {
      let _utils = new utils();
      /** @type {(boolean|string)} The value of the input. If the script cannot continue its value will be "false" otherwise it contains the user's search terms. */
      let searchIsValid = _utils.checkInputValue(ev.target.value);

      /** Determines if the conditions are sufficient to continue the script. */
      if (searchIsValid === false) {
        /** Resets the value to null in the global data object. */
        result.data.manualSearch = null;
        // console.log("!! Invalid search value !!", result.data.manualSearch);
        /** Stop the script. */
        return;
      }

      /* The user has sufficiently filled in the manual search field, so the results can be filtered. */
      result.data.manualSearch = searchIsValid;
      // console.log("search for main result", result.data.manualSearch);
      /** Relaunch search results. */
      result.parser();

    };

    inputSearch.addEventListener(event, eventFunction);
  }
}

export { search };