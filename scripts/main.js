import { data } from "./data.js";
import { recipes } from "./modules/models/recipes.js";

import result from "./modules/result.js"

class main {
  constructor(data) {
    this.data = data;
  }

  init() {
    // Standardization of cooking recipe data.
    let dataCleaned = this.normalizeData(this.data);

    // Add data useful for managing the cooking recipes page.
    let dataWithOptions = this.buildDataArray(dataCleaned); // console.log("dataWithOptions", dataWithOptions);

    const _result = new result(dataWithOptions);
    _result.init();
  }

  /**
   * Normalizes and returns raw cooking recipe data.
   * @param {object} dataRaw The raw data of cooking recipes.
   * @returns object
   */
  normalizeData(dataRaw) { // console.log("normalizeData: dataRaw", typeof dataRaw, "\r", dataRaw);
    let newDataArray = {
      recipes: []
    };

    dataRaw.forEach(data => {
      let cleaner = new recipes(data);
      let newObject = {};

      newObject.appliance = cleaner.appliance;
      newObject.description = cleaner.description;
      newObject.id = cleaner.id;
      newObject.ingredients = cleaner.ingredients;
      newObject.name = cleaner.name;
      newObject.servings = cleaner.servings;
      newObject.time = cleaner.time;
      newObject.ustensils = cleaner.ustensils;

      newDataArray.recipes.push(newObject);
    });

    // console.log("normalizeData: return", typeof newDataArray, "\r", newDataArray);
    return newDataArray;
  }

  /**
   * Adds useful objects for managing the cooking recipe results page.
   * @param {object} dataCleaned Cleaned data from cooking recipes.
   * @return object
   */
  buildDataArray(dataCleaned) { // console.log("buildDataArray: dataCleaned", typeof dataCleaned, "\r", dataCleaned);
    // Page management object.
    let pageManagement = {
      "cssSelector": {
        "list": {
          "appliances": document.querySelector(".appliances .row"),
          "ingredients": document.querySelector(".ingredients .row"),
          "ustensils": document.querySelector(".ustensils .row")
        },
        "recipe": document.querySelector(".results")
      },
      "manualSearch": null,
      "tags": {
        "appliances": {
          "selected": []
        },
        "ingredients": {
          "selected": []
        },
        "ustensils": {
          "selected": []
        }
      }
    };

    let recipes = dataCleaned.recipes;
    dataCleaned = {
      recipes,
      ...pageManagement
    };

    // console.log("buildDataArray: return", typeof dataCleaned, "\r", dataCleaned);
    return dataCleaned;
  }
}

const _main = new main(data);
_main.init();