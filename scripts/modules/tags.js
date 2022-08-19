import { utils } from "./utils.js";
import { tagTpl } from "./templates/tag.js"

class tags {
  constructor() {
    this.tags = {
      "ingredients": [],
      "devices": [],
      "ustensils": []
    };
    this._utils = new utils();
    this.$selectedTagContainer = document.querySelector(".container > .tags");
  }

  init() {}

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
      this.tags[tagName].filter(string => string.includes(value));

    };

    const _utils = new utils();
    _utils.addListeners($tagInput, event, eventFunction)
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

      const newTag = this.$selectedTagContainer.lastChild;
      this.removeSelectedTag(newTag);


      link.dataset.selected = true;
      this._utils.hideShow(link.parentNode);
    };

    this._utils.addListeners(tagLink, "click", eventFunction );

  }

  /**
   * Add tags to the appropriate array.
   * @param {Object or string} items The array or string to inject into the tag array.
   * @param {string} tagType The name of the tag.
   */
  updateList(items, tagType) {
    switch(tagType) {
      case "ingredients":
        for(const ingredient of items) {
          this.updateTags(ingredient.ingredient, this.tags.ingredients);
        }
        break;
      case "devices":
        this.updateTags(items, this.tags.devices);
        break;
      case "ustensils":
        for(const ustensil of items) {
          this.updateTags(ustensil, this.tags.ustensils);
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
  add() {
    const _tagTpl = new tagTpl();

    for(let tagsCollection in this.tags) {
      const cssSelector = `.${tagsCollection} .tags .row`;
      const $wrapper = document.querySelector(cssSelector);
      const $fragment = document.createDocumentFragment();

      this.tags[tagsCollection].forEach((items, key, array) => {
        const tpl = _tagTpl.list(items, tagsCollection);
        $fragment.appendChild(tpl);
        this.eventTagsSelected(tpl);

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
      const tagName = ev.target.dataset.tagName;
      const tagType = ev.target.dataset.tagType;
      this.dataSelectedToggle(tagType, tagName);

      ev.target.remove();
    };
    this._utils.addListeners(tag, "click", eventFunction);
  }

  /**
   * To reactivate tag from taglist dropdown.
   * @param {String} tagType The tag type.
   * @param {String} tagName The tag name.
   */
  dataSelectedToggle(tagType, tagName) {
    const cssSelector = "." + tagType + " [data-tag-type='" + tagType + "'][data-tag-name='" + tagName + "']";
    const element = document.querySelector(cssSelector);
    const parentElement = element.parentNode;

    element.dataset.selected = true;
    parentElement.style.display = "";
  }
}

export { tags };