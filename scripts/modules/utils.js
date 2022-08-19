export class utils {
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
}
