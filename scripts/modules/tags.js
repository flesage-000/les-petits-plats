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
      let func = (event) => { console.log("linkEvent event:", event, resultInstance, resultInstance.data.cssSelector);

      // resultInstance.parser();

    };

    node.addEventListener("click", func);
  }

  /**
   * Clean links list HTML nodes
   */
  nodesCleaner() {
    // Clean devices tags links list
    this.data.cssSelector.list.devices.textContent = "";
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