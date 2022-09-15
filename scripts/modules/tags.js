import { utils } from "./utils.js";
import { tagTpl } from "./templates/tag.js";
import { result } from "./result.js";

class tags {
  constructor(data) {
    this.data = data;
    this._tagTpl = new tagTpl();

    // this._data = data;
    // this.tags = {
    //   toSelect: {
    //     "devices": [],
    //     "ingredients": [],
    //     "ustensils": []
    //   },
    //   selected: {
    //     "devices": [],
    //     "ingredients": [],
    //     "ustensils": []
    //   }
    // };
    // this._utils = new utils();
    // this.$selectedTagContainer = document.querySelector(".container > .tags");
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

    /** Loop to display or not the tags. */
    tags.forEach(tag => {
      if (tag.dataset.tagName.toLowerCase().includes(valueToSearch) || reset) {
        tag.parentNode.style.display = "";
      } else {
        tag.parentNode.style.display = "none";
      }
    });
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
  addButtonToList(tagName, tagType, resultInstance) { // console.log("addButtonToList:\r\n- tagName:", typeof tagName, tagName, "\r\n- tagType:", typeof tagType, tagType);
    /** @type {object} The node to add to the DOM. */
    let $wrapper = this._tagTpl.button(tagName, tagType);
    /** @type {object} The tag button container. */
    let buttonTagsContainer = document.querySelector(".tags");

    /** Add button to the DOM. */
    buttonTagsContainer.appendChild($wrapper);

    /** Add an event on the button. */
    this.addButtonToListEvent(buttonTagsContainer.lastChild, resultInstance);
  }

  addButtonToListEvent(node, resultInstance) { // console.log("addButtonToListEvent:\r\n- node:", typeof node, node);
    let func = (ev) => {

      /** @type {object} Event node. */
      let node = ev.target;
      /** @type {object} Get the tag name in the "data" attribute. */
      let tagName = node.dataset.tagName;
      /** @type {object} Get the tag type in the "data" attribute. */
      let tagType = node.dataset.tagType;

      /** @type {array} The array of selected tags. */
      let currentArray = this.data.tags[tagType].selected;
      /** @type {array} The array of selected tags without the deleted tag. */
      let filtered = currentArray.filter(tag => {
        return tag != tagName;
      });

      currentArray = filtered;

      node.remove();

      resultInstance.parser();
    }
    node.addEventListener("click", func);
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
































  /**
   * Add events for tags search
   */
  eventTagsToSelect(tagName) {
    const tagNameCamelCase = tagName[0].toUpperCase() + tagName.slice(1);
    const tagId = `#search${tagNameCamelCase}`;
    const $tagInput = document.querySelector(tagId);
    const event = "keyup";
    const eventFunction = (ev) => {
      const value = ev.target.value;
      const valueLength = value.length;
      const cssSelector = `.${tagName} .tags .row .col`;
      const elements = document.querySelectorAll(cssSelector);

      elements.forEach(element => {
        const regex = new RegExp(value, "i");
        const elementSelected = element.querySelector("a").dataset.selected;

        switch(true) {
          case elementSelected == "true":
            break;
          case valueLength <= 2 || valueLength >= 3 && regex.test(element.textContent):
            element.style.display = "";
            break;
          default:
            element.style.display = "none";
        }
      });
      this.tags.toSelect[tagName].filter(string => string.includes(value));

    };

    const _utils = new utils();
    _utils.addListeners($tagInput, event, eventFunction);
  }

  /**
   * Action ti do when tag button is clicked.
   * @param {Object} element A HTML node
   */
  eventTagsSelected(element) {
    const tagLink = element.querySelector("a");
    const eventFunction = (ev) => {
      ev.preventDefault();

      const link = ev.target;
      const tagName = link.dataset.tagName;
      const tagType = link.dataset.tagType;
      const _tagTpl = new tagTpl();
      const tag = _tagTpl.button(tagName, tagType);
      this.$selectedTagContainer.appendChild(tag);
      this.addTagSelectedToArray(tagType, tagName);

      const newTag = this.$selectedTagContainer.lastChild;
      this.removeSelectedTag(newTag);

      link.dataset.selected = true;
      this._utils.hideShow(link.parentNode);

      // Refresh results
      const _result = new result(this);
      _result.generateCard(this.tags.selected);
    };

    this._utils.addListeners(tagLink, "click", eventFunction );
  }

  /**
   * Add tags to the appropriate array.
   * @param {Object or string} items The array or string to inject into the tag array.
   * @param {String} tagType The name of the tag.
   */
  updateList(items, tagType) {
    switch(tagType) {
      case "ingredients":
        for(const ingredient of items) {
          this.updateTags(ingredient.ingredient, this.tags.toSelect.ingredients);
        }
        break;
      case "devices":
        for(const device of items) {
          this.updateTags(device, this.tags.toSelect.devices);
        }
        break;
      case "ustensils":
        for(const ustensil of items) {
          this.updateTags(ustensil, this.tags.toSelect.ustensils);
        }
        break;
      default:
        console.warn("Unknown 'tagType' => ", tagType);
    }
  }

  /**
   * Update the tag array.
   * @param {String} item Tag to add
   * @param {Object} tags Array of tags
   * @returns
   */
  updateTags(item, tags) {
    if (tags.includes(item)) { return; }
    tags.push(item);
    tags.sort((a, b) => a.localeCompare(b));
  }

  /**
   * Add tags in DOM.
   */
  add(filter) {
    const _tagTpl = new tagTpl();

    for(let tagsCollection in this.tags.toSelect) {
      const cssSelector = `.${tagsCollection} .tags .row`;
      const $wrapper = document.querySelector(cssSelector);
      const $fragment = document.createDocumentFragment();

      this.tags.toSelect[tagsCollection].forEach((items, key, array) => {
        if (!$wrapper.hasChildNodes()) {
          const tpl = _tagTpl.list(items, tagsCollection);
          $fragment.appendChild(tpl);
          this.eventTagsSelected(tpl);
        } else {
           console.log("this.tags.selected", this.tags.selected, this.tags.toSelect, items);
          // this.eventTagsToSelect(items);
        }

        if(array.length - 1 === key) {
          this.eventTagsToSelect(tagsCollection);
        }
      });

      $wrapper.appendChild($fragment);
    }
  }

  /**
   * To remove a selected tag then toggle "data-selected" value on tag in tag list.
   * @param {Object} tag A HTML node.
   */
  removeSelectedTag(tag) {
    const eventFunction = (ev) => {
      ev.preventDefault();
      console.log("ev", ev.target.dataset);
      const tagName = ev.target.dataset.tagName;
      const tagType = ev.target.dataset.tagType;
      this.dataSelectedToggle(tagType, tagName);
      this.removeTagSelectedToArray(tagType, tagName);

      ev.target.remove();
    };
    this._utils.addListeners(tag, "click", eventFunction);
  }

  /**
   * To Add tag from tag selected array.
   * @param {String} tagType The type of tag to add.
   * @param {String} tagName The name of the tag to add.
   */
  addTagSelectedToArray(tagType, tagName) {
    let tagArray = this.getSelectedArray(tagType);

    tagArray.push(tagName);
  }

  /**
   * To remove tag from tag selected array.
   * @param {String} tagType The type of tag to delete.
   * @param {String} tagName The name of the tag to delete.
   */
  removeTagSelectedToArray(tagType, tagName) {
    let tagArray = this.getSelectedArray(tagType);

    tagArray.filter(element => {
      return element != tagName;
    });
  }

  getSelectedArray(tagType) {
    switch(tagType) {
      case "ingredients":
        return this.tags.selected.ingredients;
        break;
      case "devices":
        return this.tags.selected.devices;
        break;
      case "ustensils":
        return this.tags.selected.ustensils;
        break;
      default:
        console.warn("tagType '" + tagType + "' doesn't exist!");
    }
  }

  /**
   * To reactivate tag from taglist dropdown.
   * @param {String} tagType The tag type.
   * @param {String} tagName The tag name.
   */
  dataSelectedToggle(tagType, tagName) {
    const cssSelector = "." + tagType + " [data-tag-type='" + tagType + "'][data-tag-name='" + tagName + "']";
    console.log("cssSelector", cssSelector);
    const element = document.querySelector(cssSelector);
    const parentElement = element.parentNode;

    element.dataset.selected = true;
    parentElement.style.display = "";
  }
}

export { tags };