import utils from "./utils.js";
import tagTpl from "./templates/tag.js";

export default class tags {
  constructor(data) {
    this.data = data;
    this._tagTpl = new tagTpl();
  }

  init() {
    /** Ingredient tag research input. */
    this.searchInTagsEvent(document.querySelector("#searchIngredients"));
    /** Appliance tag research input. */
    this.searchInTagsEvent(document.querySelector("#searchAppliances"));
    /** Ustensil tag research input. */
    this.searchInTagsEvent(document.querySelector("#searchUstensils"));
  }

  /**
   * Create a link for the list of selectable tags.
   * @param {string} tagName Name of the tag to create.
   * @param {string} tagType Type of tag to create.
   */
  createLink(tagName, tagType) { // console.log("createLink\r\ntagName: typeof", typeof tagName, tagName, "\r\ntagType: typeof", typeof tagType, tagType);
    let $wrapper = this._tagTpl.list(tagName, tagType);

    this.addLinkToList($wrapper, tagType);

    return $wrapper;
  }

  /**
   * Event during manual search in the tag input.
   */
  searchInTagsEvent(input) { // console.log("searchInTagsEvent:\r\n- input", input);
    let _utils = new utils();
    /** @type {string} The user action that causes the event. */
    let event = "keyup";
    /** @type {function} The function caused by the event. */
    let func = (ev) => {
      /** @type {(boolean|string)} The value of the input. If the script cannot continue its value will be "false" otherwise it contains the user's search terms. */
      let searchIsValid = _utils.checkInputValue(ev.target.value);
      /** Determines if the conditions are sufficient to continue the script. */
      if (searchIsValid === false) {
        /** The filtering conditions are not met, so we redisplay all the tags. */
        this.searchInTags(ev.target, searchIsValid, true);
        /** Stop script. */
        return;
      }
      /** Tags are filtered. */
      this.searchInTags(ev.target, searchIsValid);
    };

    input.addEventListener(event, func);
  }

  /**
   * Whether or not to display tags depending on the content of the tag input.
   * @param {object} node The tag search input.
   * @param {string} valueToSearch The value of the input.
   * @param {boolean} reset Determine whether to display tags. Default value "false".
   */
  searchInTags(node, valueToSearch, reset = false) { // console.log("searchInTags:\r\n- node:", typeof node, node, "\r\n- valueToSearch:", typeof valueToSearch, valueToSearch, document.querySelector("#" + node.id), "\r\n- reset:", typeof reset, reset);
    /** @type {object} The tag container. */
    let tagsContainer = () => {
      /** @type {object} The tag search input. */
      let input = document.querySelector("#" + node.id);
      /** @type {object} The parent tag search input. */
      let parentNode = input.parentNode;
      /** @type {object} Parents from the list of selectable tags. */
      let tagsMainContainer = parentNode.querySelector(".tags");

      return tagsMainContainer.querySelector(".row");
    }
    /** @type {array} Container tags. */
    let tags = tagsContainer().querySelectorAll(".dropdown-item");
    /** @type {number} The length of tags array. */
    let tagsLength = tags.length;

    /** Loop to display or not the tags. */
    for (let i=0;i<tagsLength; i++) {
      if (tags[i].dataset.tagName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(valueToSearch) || reset) {
        tags[i].parentNode.style.display = "";
      } else {
        tags[i].parentNode.style.display = "none";
      }
    }
  }

  /**
   * Add the link to the list of tags.
   * @param {object} node HTML object to add to the DOM.
   * @param {string} tagType Type of tag used by the script to know where to add the HTML object.
   */
  addLinkToList(node, tagType) { // console.log("addLinkToList\r\node: typeof", typeof node, node, "\r\ntagType: typeof", typeof tagType, tagType);
    let parentNode = this.data.cssSelector.list[tagType];

    // Add link to DOM
    parentNode.appendChild(node);
  }

  /**
   * Add an event when clicking on the HTML node.
   * @param {object} node HTML node.
   */
  linkEvent(node, resultInstance) { // console.log("linkEvent\r\nnode: typeof", typeof node, node, "\r\nresultInstance:", resultInstance);

    /** @param {function} event The event that occurs when clicking on a tag to select. */
    let func = (event) => { // console.log("linkEvent event:", event, resultInstance, resultInstance.data.cssSelector);

      /** @type {object} Event node. */
      let node = event.target;
      /** @type {object} Get the tag name in the "data" attribute. */
      let tagName = node.dataset.tagName;
      /** @type {object} Get the tag type in the "data" attribute. */
      let tagType = node.dataset.tagType;

      /** Adds the selected filter to the global data object. */
      this.data.tags[tagType].selected.push(tagName);

      /** Adds the button to the list of selected tags. */
      this.addButtonToList(tagName, tagType, resultInstance);

      resultInstance.parser();
    };

    node.addEventListener("click", func);
  }

  /**
   * Adds the button to the list of selected tags.
   * @param {string} tagName The name of the tag.
   * @param {string} tagType The category of the tag.
   */
  addButtonToList(tagName, tagType, resultInstance) { // onsole.log("addButtonToList:\r\n- tagName:", typeof tagName, tagName, "\r\n- tagType:", typeof tagType, tagType);
    /** @type {object} The node to add to the DOM. */
    let $wrapper = this._tagTpl.button(tagName, tagType);
    /** @type {object} The tag button container. */
    let buttonTagsContainer = document.querySelector(".tags");

    /** Add button to the DOM. */
    buttonTagsContainer.appendChild($wrapper);

    /** Add an event on the button. */
    this.addButtonToListEvent(buttonTagsContainer.lastChild, resultInstance);
  }

  /**
   *
   * @param {*} node
   * @param {*} resultInstance
   */
  addButtonToListEvent(node, resultInstance) { // console.log("addButtonToListEvent:\r\n- node:", typeof node, node);
    /** @type {string} The user action that causes the event. */
    let event = "click";
    /** @type {function} The function caused by the event. */
    let func = (ev) => {
      /** @type {object} Event node. */
      let node = ev.target;
      /** @type {object} Get the tag name in the "data" attribute. */
      let tagName = node.dataset.tagName;
      /** @type {object} Get the tag type in the "data" attribute. */
      let tagType = node.dataset.tagType;
      /** @type {array} The array of selected tags. */
      let currentArray = this.data.tags[tagType].selected;
      /** @type {number} The length of selected tags array. */
      let currentArrayLength = currentArray.length;
      /** @type {array} The array of filtered tags. */
      let filtered = [];

      for (let i=0; i<currentArrayLength; i++) {
        if (currentArray[i] != tagName) filtered.push(currentArray[i]);
      }
      this.data.tags[tagType].selected = filtered;

      node.remove();

      resultInstance.parser();
    }
    node.addEventListener(event, func);
  }

  /**
   * Clean links list HTML nodes
   */
  nodesCleaner() {
    // Clean devices tags links list
    this.data.cssSelector.list.appliances.textContent = "";
    // Clean ingredients tags links list
    this.data.cssSelector.list.ingredients.textContent = "";
    // Clean ustensils tags links list
    this.data.cssSelector.list.ustensils.textContent = "";
  }
}