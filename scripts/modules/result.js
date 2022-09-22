import tplRecipeCard from "./templates/recipeCard.js";
import search from "./search.js";
import tags from "./tags.js";

export default class result {
  /**
   * @param {object} data All necessary data (recipes + options) on the results page.
   */
  constructor(data) {
    this.data = data;
    this._tags = new tags(this.data);
    this._tplRecipeCard = new tplRecipeCard();
  }

  init() {
    this.parser();

    // Init Main search
    let _search = new search(this);
    _search.init();

    // Init tags search
    this._tags.init();
  }

  parser() { // console.log("parser", this.data);
    // Clear dynamics nodes
    this.nodesCleaner();

    /** @type {object} The object containing all unfiltered recipes. */
    let recipes = this.data.recipes;
    /** @type {number} The number of recipes available. */
    let recipesLength = recipes.length;

    /** @type {array} The array that contains the new appliances can be filtered according to the results. */
    let tagsSelectableAppliancesNew = [];

    /** @type {array} The array that contains the new ingredients can be filtered according to the results. */
    let tagsSelectableIngredientsNew = [];

    /** @type {array} The array that contains the new ustensils can be filtered according to the results. */
    let tagsSelectableUstensilsNew = [];

    /** Parse all recipes */
    for (let i=0; i<recipesLength; i++) { // console.log("recipes[i], i", recipes[i], i);

      // if (i == 0) { console.log("!!! TRAITEMENT COMMENCEE !!!\r\nNouveaux Appliance: ", tagsSelectableAppliancesNew, "\r\nNouveaux Ingredients: ", tagsSelectableIngredientsNew, "\r\nNouveaux Ustensils: ", tagsSelectableUstensilsNew);}

      /** @type {boolean} Determines whether the current recipe is displayable according to its appliances. */
      let currentRecipeIsDisplayable = this.recipeIsDisplayable(recipes[i]);

      if (currentRecipeIsDisplayable) { // console.log("!!! IS DISPLAY !!!\r\n - currentRecipeIsDisplayable", currentRecipeIsDisplayable, "\r\n - this.data.tags", this.data.tags);
        /** Retrieves the devices from the current recipe and adds it to an array if it isn't already there. */
        this.getTags(recipes[i].appliance, tagsSelectableAppliancesNew, this.data.tags.appliances.selected);
        /** @type {array} The array of ingredients list. */
        let ingredientList = [];
        /** @type {array} The array of current ingredients list. */
        let currentIngredients = recipes[i].ingredients;
        /** @type {number} The length array of current ingredients list. */
        let currentIngredientsLength = currentIngredients.length;

        for (let j=0; j<currentIngredientsLength; j++) {
          /**
           * Retrieves the ingredients from the current recipe and adds it to an array if it isn't already there.
           */
          ingredientList.push(currentIngredients[j].ingredient);
        }
        this.getTags(ingredientList, tagsSelectableIngredientsNew, this.data.tags.ingredients.selected);
        /** Retrieves the ustensils from the current recipe and adds it to an array if it isn't already there. */
        this.getTags(recipes[i].ustensils, tagsSelectableUstensilsNew, this.data.tags.ustensils.selected);

        let $wrapper = this._tplRecipeCard.card(recipes[i]);
        let resultsContainer = document.querySelector(".results");
        resultsContainer.appendChild($wrapper);

      } // else { console.log("!!! ISN'T DISPLAYED !!!");}

      /** Main loop callback. */
      if (recipesLength - 1 == i) { // console.log("!!! TRAITEMENT TERMINEE !!!\r\n- Nouveaux Appliance: ", tagsSelectableAppliancesNew, "\r\n- Nouveaux Ingredients: ", tagsSelectableIngredientsNew, "\r\n- Nouveaux Ustensils: ", tagsSelectableUstensilsNew);

        /** @type {number} The number of occurrences in the appliances data table. */
        let tagsSelectableAppliancesNewLength = tagsSelectableAppliancesNew.length;
        /** Builds the buttons of the tags to select. */
        for (let j=0; j<tagsSelectableAppliancesNewLength; j++) {
          if (!this.data.tags.appliances.selected.includes(tagsSelectableAppliancesNew[j])) {
            let $wrapper = this._tags.createLink(tagsSelectableAppliancesNew[j], "appliances");
            this._tags.linkEvent($wrapper, this);
          }
        }

        /** @type {number} The number of occurrences in the ingredients data table. */
        let tagsSelectableIngredientsNewLength = tagsSelectableIngredientsNew.length;
        for (let j=0; j<tagsSelectableIngredientsNewLength; j++) {
          if (!this.data.tags.ingredients.selected.includes(tagsSelectableIngredientsNew[j])) {
            let $wrapper = this._tags.createLink(tagsSelectableIngredientsNew[j], "ingredients");
            this._tags.linkEvent($wrapper, this);
          }
        }

        /** @type {number} The number of occurrences in the ingredients data table. */
        let tagsSelectableUstensilsNewLength = tagsSelectableUstensilsNew.length;
        for (let j=0; j<tagsSelectableUstensilsNewLength; j++) {
          if (!this.data.tags.ustensils.selected.includes(tagsSelectableUstensilsNew[j])) {
            let $wrapper = this._tags.createLink(tagsSelectableUstensilsNew[j], "ustensils");
            this._tags.linkEvent($wrapper, this);
          }
        }
      }
    }
  }

  /**
   * Determines if a value is not present in an array and, if so, adds it to an array and then orders it alphabetically.
   * @param {array} tagsToAdd The array containing the data to add.
   * @param {array} tagsToCompare The array of new data.
   */
  getTags(tagsToAdd, tagsToCompare) { // console.log("tagsToAdd, tagsToCompare", tagsToAdd, tagsToCompare);

    /** @type {number} The number of occurrences in the tagsToAdd data table. */
    let tagsToAddLength = tagsToAdd.length;

    for (let i=0; i<tagsToAddLength; i++) {
      /** @type {boolean} Checks the presence of keywords in the array of tags. */
      let isInclude = tagsToCompare.includes(tagsToAdd[i]);

      if (!isInclude) {
        tagsToCompare.push(tagsToAdd[i]);
        tagsToCompare.sort((a, b) => a.localeCompare(b));
      }
    }
  }

  /**
   * Determines whether the recipe can be displayed.
   * @param {object} currentRecipe The object of current recipe.
   * @returns {boolean}
   */
  recipeIsDisplayable(currentRecipe) { // console.log("recipeIsDisplayable\r\n- currentRecipe:", typeof currentRecipe, currentRecipe, "\r\n - this", this);

    /** @type {boolean} Globally determines whether the current recipe is displayable or not. Default value "false". */
    let isDisplayable = false;
    /** @type {string} The user's search value in the main search field. */
    let mainSearch = this.data.manualSearch;
    /** @type {array} The length of array of selected appliances. */
    let appliancesTagsLength = this._tags.data.tags.appliances.selected.length;
    /** @type {array} The length of array of selected ingredients. */
    let ingredientsTagsLength = this._tags.data.tags.ingredients.selected.length;
    /** @type {array} The length of array of selected ustensils. */
    let ustensilsTagsLength = this._tags.data.tags.ustensils.selected.length;

    let hasTagSelected = appliancesTagsLength + ingredientsTagsLength + ustensilsTagsLength;

    /**
     * CASE #1 No filter is selected.
     */
    if (hasTagSelected == 0 && !mainSearch) { // console.log(`CASE #1`);
      isDisplayable = true;
    }

    /**
     * CASE #2 One or more filter(s) have been selected.
     */
    if (hasTagSelected >= 1 && !mainSearch) { // console.log(`CASE #2`, currentRecipe);
      isDisplayable = this.caseTagsOnly(currentRecipe);
    }

    /**
     * CASE #3 The user performed a manual search in the main search field.
     */
    if (mainSearch && hasTagSelected == 0) { // console.log("CASE #3", currentRecipe);
      isDisplayable = this.caseMainSearchOnly(currentRecipe, mainSearch);
    }

    /**
     * CASE #4 The user performed a manual search in the main search field AND also selected at least one tag.
     */
    if (mainSearch && hasTagSelected >= 1) { // console.log("CASE #4", currentRecipe);
      isDisplayable = this.caseMainSearchPlusTags(currentRecipe, mainSearch);
    }

    return isDisplayable;
  }

  /**
   * Determines if the recipe contains the search term(s) AND if the recipe contains the tag(s).
   * @param {object} currentRecipe
   * @param string} mainSearch
   * @returns boolean
   */
  caseMainSearchPlusTags(currentRecipe, mainSearch) { // console.log("caseMainSearchPlusTags: ", currentRecipe, mainSearch);
    let hasTags = this.caseTagsOnly(currentRecipe);
    let hasTerms = this.caseMainSearchOnly(currentRecipe, mainSearch);

    return hasTags && hasTerms ? true : false;
  }

  /**
   * Determines if the recipe contains the tag(s).
   * @param {object} currentRecipe The current recipe.
   * @returns boolean
   */
  caseTagsOnly(currentRecipe) { // console.log("caseTagsOnly", currentRecipe);
    /** @type {array} The array of devices in the current recipe. */
    let currentAppliances = currentRecipe.appliance;
    /** @type {array} The array of selected appliances. */
    let selectedAppliances = this._tags.data.tags.appliances.selected;
    /** @type {boolean} The boolean determining if the current recipe contains the selected appliances or not. Default value "false". */
    let hasAppliancesFilter = false;

    // Tests if the array contains at least one value and, if so, checks if the "appliances" tags of the current recipe are present.
    if (selectedAppliances.length >= 1) {
      hasAppliancesFilter = (() => {
        /** @type {number} The number of occurrences in the selected appliances data table. */
        let selectedAppliancesLength = selectedAppliances.length;

        for (let i=0; i<selectedAppliancesLength; i++) {
          hasAppliancesFilter = currentAppliances.includes(selectedAppliances[i]);
        }
      })();
    }

    /** @type {array} The array of ingredients in the current recipe. */
    let currentIngredients = currentRecipe.ingredients;
    /** @type {array} The array of selected ingredients. */
    let selectedIngredients = this._tags.data.tags.ingredients.selected;
    /** @type {boolean} The boolean determining if the current recipe contains the selected ingredients or not. Default value "false". */
    let hasIngredientsFilter = false;

    // Tests if the array contains at least one value and, if so, checks if the "ingredients" tags of the current recipe are present.
    if (selectedIngredients.length >= 1) {
      /** @type {number} The number of occurrences in the selected ingredients data table. */
      let selectedIngredientsLength = selectedIngredients.length;

      for (let i=0; i<selectedIngredientsLength; i++) {
        let currentIngredientsLength = currentIngredients.length;
        for (let j=0; j<currentIngredientsLength; j++) {
          if (currentIngredients[j].ingredient == selectedIngredients[i]) hasIngredientsFilter = true;
        }
      }
    }

    /** @type {array} The array of ustensils in the current recipe. */
    let currentUstensils = currentRecipe.ustensils;
    /** @type {array} The array of selected ustensils. */
    let selectedUstensils = this._tags.data.tags.ustensils.selected
    /** @type {boolean} The boolean determining if the current recipe contains the selected ustensils or not. Default value "false". */
    let hasUstensilsFilter = false;

    // Tests if the array contains at least one value and, if so, checks if the "ustensils" tags of the current recipe are present.
    if (selectedUstensils.length >= 1) {
      /** @type {number} The number of occurrences in the selected ustensils data table. */
      let selectedUstensilsLength = selectedUstensils.length;

      for (let i=0; i<selectedUstensilsLength; i++) {
        hasUstensilsFilter = currentUstensils.includes(selectedUstensils[i]);
      }
    }

    return hasAppliancesFilter || hasIngredientsFilter || hasUstensilsFilter ? true : false;
  }

  /**
   * Determines if the recipe contains the search term(s).
   * @param {object} currentRecipe The current recipe.
   * @param {string} mainSearch Term searched by the user.
   * @returns boolean
   */
  caseMainSearchOnly(currentRecipe, mainSearch) { // console.log("caseMainSearchOnly", currentRecipe, mainSearch);
    let mainSearchTLC = mainSearch.toLowerCase();

    /** Normalizes the current recipe name to lowercase. */
    let recipeNameTLC = currentRecipe.name.toLowerCase();
    /** Determines if the search term is in the name of the current recipe. */
    if (recipeNameTLC.indexOf(mainSearchTLC) >= 0) return true;

    /** Normalizes the current recipe description to lowercase. */
    let recipeDescriptionTLC = currentRecipe.description.toLowerCase();
    /** Determines if the search term is in the description of the current recipe. */
    if (recipeDescriptionTLC.indexOf(mainSearchTLC) >= 0)  return true;

    /** Retrieves the table of ingredients for the current recipe. */
    let recipeIngredients = currentRecipe.ingredients;
    /** @type {number} The number of occurrences in the selected ustensils data table. */
    let recipeIngredientsLength = recipeIngredients.length;

    for (let i=0; i<recipeIngredientsLength; i++) {
      /** Normalizes the current ingredient name to lowercase. */
      let ingredientTLC = recipeIngredients[i].ingredient.toLowerCase();
      /** Determines if the search term is in the ingredient of the current recipe. */
      if (ingredientTLC.indexOf(mainSearchTLC) >= 0) return true;
    }

    return false;
  }

  /** Clear HTML nodes. */
  nodesCleaner() {
    // Clean tags links lists
    this._tags.nodesCleaner();
    // Clean results list
    this.data.cssSelector.recipe.textContent = "";
  }

  /**
   * The recipe display uses the CSS grid system, it is imperative to give it the number of lines to display. We therefore update a variable in the style of the container so that the CSS styles can display the number of lines necessary.
   * @param {object} container The container in which to update the variable
   * @param {integer} recipeLength The number of recipes displayed
   */
  cssGridManager(container, recipeLength) {
    const gridColumns = 3;
    const gridRows = Math.ceil(recipeLength / gridColumns);

    container.style.setProperty("--grid-rows", gridRows);
  }
}