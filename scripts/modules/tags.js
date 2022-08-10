import { utils } from "./utils.js";

class tags {
  constructor() {
    this.tags = {
      "ingredients": [],
      "devices": [],
      "ustensils": []
    };
    this.tagsIngredients = [];
    this.tagsDevices = [];
    this.tagsUstensils = [];
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
        console.warn("Uknown 'tagType' => ", tagType);
    }
    console.log("this.tags", this.tags);
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
    tags.sort();
  }

  add() {
    const _tagTpl = new tagTpl();
    const tagTypes = Object.getOwnPropertyNames(this.tags);
    console.log("tagTypes", tagTypes, this.tags);

    for(let tagsCollection in this.tags) {
      const cssSelector = `.${tagsCollection} .tags .row`;
      const $wrapper = document.querySelector(cssSelector);
      const $fragment = document.createDocumentFragment();
      this.tags[tagsCollection].forEach(items => {
        const tpl = _tagTpl.list(items, tagsCollection);
        $fragment.appendChild(tpl);
      });
      $wrapper.appendChild($fragment);
    }

    // this.tags.ingredients.forEach((item, key, array) => {
    //   const tpl = _tagTpl.list(item, tagTypes[0]);
    //   console.log("tpl", tpl, typeof tpl);
    //   $contentIngredients.appendChild(tpl);
    // });
// console.log("$contentIngwrapperIngredientsredients", $contentIngredients);

    // $wrapperIngredients.appendChild($contentIngredients);
  }
}

export { tags };