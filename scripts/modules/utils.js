class utils {
  constructor() {}

  /**
   * Add event listener function.
   * @param {Object} element An HTML node.
   * @param {String} event An event to listen. For example 'click'.
   * @param {Function} eventFunction A function to execute on event.
   */
  addListeners(element, event, eventFunction) {
    element.addEventListener(event, ev => eventFunction(ev));
  }

  /**
   * To hide parent's node
   * @param {Object} element HTML node.
   */
  hideShow(element) {
    let value = "";
    let elementStyle = element.style;

    if(elementStyle.display !== "none") {
      value = "none";
    }

    elementStyle.display = value;
  }

  /**
   * Checks if length of a value is greater than 3.
   * @param {string} value The value to check.
   * @returns {(boolean|string)} "false" or the value if it is greater than 3.
   */
  checkInputValue(value) {
    /** @type {string} The cleaned value. */
    let terms = () => {
      /** @type {string} Remove leading and trailing spaces. */
      let valueTrim = value.trim();
      /** @type {string} Remove leading and trailing spaces. */
      let valueTrimTLC = valueTrim.toLowerCase();

      return valueTrimTLC;
    };

    /** @type {number} The size of the value. */
    let valueLength = terms().length;
    /** @type {(boolean|string)} The value that will be returned. "false" by default or a string if the value meets the condition. */
    let result = false;

    if (valueLength >= 3) result = terms();

    return result;
  }
}

export { utils };