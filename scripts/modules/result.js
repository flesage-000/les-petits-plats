// import { tplRecipeCard } from "./templates/recipeCard.js";
import { search } from "./search.js";
import { tags } from "./tags.js";

class result {
  /**
   * @param {object} data All necessary data (recipes + options) on the results page.
   */
  constructor(data) {
    this.data = data;
    this._tags = new tags(this.data);
  }

  init() {
    this.parser();

    // Init Main search
    let _search = new search(this);
    _search.init();
  }

  parser() { console.log("parser", this.data);
    // Clear dynamics nodes
    this.nodesCleaner();

    /** @type {object} The object containing all unfiltered recipes. */
    const recipes = this.data.recipes;
    /** @type {number} The number of recipes available. */
    const recipesLength = recipes.length;

    /** @type {array} The array that contains the new appliances can be filtered according to the results. */
    let tagsSelectableAppliancesNew = [];

    /** @type {array} The array that contains the new ingredients can be filtered according to the results. */
    let tagsSelectableIngredientsNew = [];

    /** @type {array} The array that contains the new ustensils can be filtered according to the results. */
    let tagsSelectableUstensilsNew = [];

    /** Parse all recipes */
    recipes.forEach((currentRecipe, key) => { // console.log("recipe, key", recipe, key);

      if (key == 0) {console.log("!!! TRAITEMENT COMMENCEE !!!\r\nNouveaux Appliance: ", tagsSelectableAppliancesNew, "\r\nNouveaux Ingredients: ", tagsSelectableIngredientsNew, "\r\nNouveaux Ustensils: ", tagsSelectableUstensilsNew);}

      /** @type {boolean} Determines whether the current recipe is displayable according to its appliances. */
      let currentRecipeIsDisplayable = this.recipeIsDisplayable(currentRecipe);

      if (currentRecipeIsDisplayable) { console.log("!!! IS DISPLAY !!!\r\n - currentRecipeIsDisplayable", currentRecipeIsDisplayable, "\r\n - this.data.tags", this.data.tags);
        /** Retrieves the devices from the current recipe and adds it to an array if it isn't already there. */
        this.getTags(currentRecipe.appliance, tagsSelectableAppliancesNew, this.data.tags.appliances.selected);

        let ingredientList = [];
        // Because the ingredients are in separate objects, you have to extract them and put them in an array.
        currentRecipe.ingredients.forEach(Ingredientdata => { // console.log("ingredientData", Ingredientdata.ingredient);
          /**
           * Retrieves the ingredients from the current recipe and adds it to an array if it isn't already there.
           */
          ingredientList.push(Ingredientdata.ingredient);
        });
        this.getTags(ingredientList, tagsSelectableIngredientsNew, this.data.tags.ingredients.selected);
        /** Retrieves the ustensils from the current recipe and adds it to an array if it isn't already there. */
        this.getTags(currentRecipe.ustensils, tagsSelectableUstensilsNew, this.data.tags.ustensils.selected);
      } else { console.log("!!! ISN'T DISPLAYED !!!");}

      /** Main foreach callback. */
      if (recipesLength - 1 == key) { console.log("!!! TRAITEMENT TERMINEE !!!\r\n- Nouveaux Appliance: ", tagsSelectableAppliancesNew, "\r\n- Nouveaux Ingredients: ", tagsSelectableIngredientsNew, "\r\n- Nouveaux Ustensils: ", tagsSelectableUstensilsNew);
        /** Builds the buttons of the tags to select. */
        tagsSelectableAppliancesNew.forEach(appliance => {
          let $wrapper = this._tags.createLink(appliance, "appliances");
          this._tags.linkEvent($wrapper, this);
        });
        tagsSelectableIngredientsNew.forEach(ingredient => {
          let $wrapper = this._tags.createLink(ingredient, "ingredients");
          this._tags.linkEvent($wrapper, this);
        });
        tagsSelectableUstensilsNew.forEach(ustensil => {
          let $wrapper = this._tags.createLink(ustensil, "ustensils");
          this._tags.linkEvent($wrapper, this);
        });
      }
    });
  }

  /**
   * Determines if a value is not present in an array and, if so, adds it to an array and then orders it alphabetically.
   * @param {array} tagsToAdd The array containing the data to add.
   * @param {array} tagsToCompare The array of new data.
   */
  getTags(tagsToAdd, tagsToCompare) { // console.log("tagsToAdd, tagsToCompare", tagsToAdd, tagsToCompare);
    tagsToAdd.forEach(tag => { // console.log("tag", tag, tagsToCompare);
      /** @type {boolean} Checks the presence of keywords in the array of tags. */
      let isInclude = tagsToCompare.includes(tag);

      if (!isInclude) {
        tagsToCompare.push(tag);
        tagsToCompare.sort((a, b) => a.localeCompare(b));
      }
    });
  }

  /**
   * Determines whether the recipe can be displayed.
   * @param {object} currentRecipe The object of current recipe.
   * @returns {boolean}
   */
  recipeIsDisplayable(currentRecipe) { console.log("recipeIsDisplayable\r\n- currentRecipe:", typeof currentRecipe, currentRecipe, "\r\n - this", this);

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
    if (hasTagSelected == 0 && !mainSearch) { console.log(`CASE #1`); return true; }

    /**
     * CASE #2 One or more filter(s) have been selected.
     */
    if (hasTagSelected >= 1 && !mainSearch) { console.log(`CASE #2`);
      /** @type {array} The array of devices in the current recipe. */
      let currentAppliances = currentRecipe.appliance;
      /** @type {array} The array of selected appliances. */
      let selectedAppliances = this._tags.data.tags.appliances.selected;
      /** @type {boolean} The boolean determining if the current recipe contains the selected appliances or not. Default value "false". */
      let hasAppliancesFilter = false;

      // Tests if the array contains at least one value and, if so, checks if the "appliances" tags of the current recipe are present.
      if (selectedAppliances.length >= 1) hasAppliancesFilter = selectedAppliances.every(filter => { return currentAppliances.includes(filter); });

      /** @type {array} The array of ingredients in the current recipe. */
      let currentIngredients = currentRecipe.ingredients;
      /** @type {array} The array of selected ingredients. */
      let selectedIngredients = this._tags.data.tags.ingredients.selected;
      /** @type {boolean} The boolean determining if the current recipe contains the selected ingredients or not. Default value "false". */
      let hasIngredientsFilter = false;

      // Tests if the array contains at least one value and, if so, checks if the "ingredients" tags of the current recipe are present.
      if (selectedIngredients.length >= 1) hasIngredientsFilter = selectedIngredients.every(filter => { return currentIngredients.find(current => { if (current.ingredient == filter) return true; }); });

      /** @type {array} The array of ustensils in the current recipe. */
      let currentUstensils = currentRecipe.ustensils;
      /** @type {array} The array of selected ustensils. */
      let selectedUstensils = this._tags.data.tags.ustensils.selected
      /** @type {boolean} The boolean determining if the current recipe contains the selected ustensils or not. Default value "false". */
      let hasUstensilsFilter = false;

      // Tests if the array contains at least one value and, if so, checks if the "ustensils" tags of the current recipe are present.
      if (selectedUstensils.length >= 1) hasUstensilsFilter = selectedUstensils.every(filter => { return currentUstensils.includes(filter); });

      return hasAppliancesFilter || hasIngredientsFilter || hasUstensilsFilter ? true : false;
    }

    /**
     * CASE #3 The user performed a manual search in the main search field.
     */
    if (mainSearch) { console.log("CASE #3", currentRecipe);
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
      recipeIngredients.forEach(ingredient => {
        /** Normalizes the current ingredient name to lowercase. */
        let ingredientTLC = ingredient.ingredient.toLowerCase();
        /** Determines if the search term is in the ingredient of the current recipe. */
        if (ingredientTLC.indexOf(mainSearchTLC) >= 0) return true;
      });
    }
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

export { result };