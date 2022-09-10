import { tplRecipeCard } from "./templates/recipeCard.js";
import { tags } from "./tags.js";

class result {
  /**
   * @param {object} data All necessary data (recipes + options) on the results page.
   */
  constructor(data) {
    this.data = data;
    this._tags = new tags();
  }

  init() {
    this.parser();
  }

  parser() {
    /**
     * The object containing all unfiltered recipes.
     * @type {object}
    */
    const recipes = this.data.recipes;
    /**
     * The number of recipes available.
     * @type {number}
    */
    const recipesLength = recipes.length; // console.log("recipesLength", recipesLength);
    /**
     * The array of tags.
     * @type {array}
    */
    let tagsSelected = this.data.tags;

    /**
     * The array of selected appliances.
     * @type {object}
     */
    let tagsSelectedAppliances = tagsSelected.appliances.selected;
    /**
     * The array length of selected appliances.
     * @type {number}
     */
    let tagsSelectedAppliancesLength = tagsSelectedAppliances.length;
    /**
     * The table that contains the new appliances can be filtered according to the results.
     * @type {array}
     */
    let tagsSelectableAppliancesNew = [];

    /**
     * The array of selected ingredients.
     * @type {object}
     */
    let tagsSelectedIngredients = tagsSelected.ingredients.selected;
    /**
     * The array length of selected ingredients.
     * @type {number}
     */
    let tagsSelectedIngredientsLength = tagsSelectedIngredients.length;
    /**
     * The table that contains the new ingredients can be filtered according to the results.
     * @type {array}
     */
    let tagsSelectableIngredientsNew = [];

    /**
     * The array of selected ustensils.
     * @type {object}
     */
    let tagsSelectedUstensils = tagsSelected.ustensils.selected;
    /**
     * The array length of selected ustensils.
     * @type {number}
     */
    let tagsSelectedUstensilsLength = tagsSelectedUstensils.length;
    /**
     * The table that contains the new ustensils can be filtered according to the results.
     * @type {array}
     */
    let tagsSelectableUstensilsNew = [];

    /** Parse all recipes */
    recipes.forEach((currentRecipe, key) => { // console.log("recipe, key", recipe, key);

      if (key == 0) {console.log("!!! TRAITEMENT COMMENCEE !!!\r\nNouveaux Appliance: ", tagsSelectableAppliancesNew, "\r\nNouveaux Ingredients: ", tagsSelectableIngredientsNew, "\r\nNouveaux Ustensils: ", tagsSelectableUstensilsNew);}

      /**
      * The array of devices in the current recipe.
      * @type {array}
      */
      let currentAppliances = currentRecipe.appliance;
      /**
       * Determines whether the current recipe is displayable according to its appliances.
       * @type {boolean}
       */
      let currentAppliancesIsDisplayable = this.recipeIsDisplayable(currentAppliances, tagsSelectedAppliances.selected, tagsSelectedAppliancesLength);

      /**
       * The array of ingredients in the current recipe.
       * @type {array}
      */
      let currentIngredients = currentRecipe.ingredients;
      /**
       * Determines whether the current recipe is displayable according to its ingredients.
       * @type {boolean}
       */
      let currentIngredientsIsDisplayable = this.recipeIsDisplayable(currentIngredients, tagsSelectedIngredients.selected, tagsSelectedIngredientsLength);

      /**
       * The array of ustensils in the current recipe.
       * @type {array}
      */
      let currentUstensils = currentRecipe.ustensils;
      /**
       * Determines whether the current recipe is displayable according to its ingredients.
       * @type {boolean}
       */
      let currentUstensilsIsDisplayable = this.recipeIsDisplayable(currentUstensils, tagsSelectedUstensils.selected, tagsSelectedUstensilsLength);

      if (currentAppliancesIsDisplayable && currentIngredientsIsDisplayable && currentUstensilsIsDisplayable) { console.log("!!! IS DISPLAY !!!");
        /**
         * Retrieves the devices from the current recipe and adds it to an array if it isn't already there.
         */
        this.getTags(currentRecipe.appliance, tagsSelectableAppliancesNew);

        let ingredientList = [];
        // Because the ingredients are in separate objects, you have to extract them and put them in an array.
        currentRecipe.ingredients.forEach(Ingredientdata => { // console.log("ingredientData", Ingredientdata.ingredient);
          /**
           * Retrieves the ingredients from the current recipe and adds it to an array if it isn't already there.
           */
          ingredientList.push(Ingredientdata.ingredient);
        });
        this.getTags(ingredientList, tagsSelectableIngredientsNew);
        /**
         * Retrieves the ustensils from the current recipe and adds it to an array if it isn't already there.
         */
        this.getTags(currentRecipe.ustensils, tagsSelectableUstensilsNew);
      }

      /**
       * Main foreach callback.
       */
      if (recipesLength - 1 == key) {console.log("!!! TRAITEMENT TERMINEE !!!\r\nNouveaux Appliance: ", tagsSelectableAppliancesNew, "\r\nNouveaux Ingredients: ", tagsSelectableIngredientsNew, "\r\nNouveaux Ustensils: ", tagsSelectableUstensilsNew);
        /**
         * Builds the buttons of the tags to select.
         */
        tagsSelectableAppliancesNew.forEach(appliance => {
          this._tags.createLink(appliance, "appliances");
        });
        tagsSelectableIngredientsNew.forEach(ingredient => {
          this._tags.createLink(ingredient, "ingredients");
        });
        tagsSelectableUstensilsNew.forEach(ustensil => {
          this._tags.createLink(ustensil, "ustensils");
        });
      }
    });
  }

  /**
   * Determines if a value is not present in an array and, if so, adds it to an array and then orders it alphabetically.
   * @param {array} tagsToAdd The array containing the data to add.
   * @param {array} tagsToCompare The table of new data.
   */
  getTags(tagsToAdd, tagsToCompare) { // console.log("tagsToAdd, tagsToCompare", tagsToAdd, tagsToCompare);
    tagsToAdd.forEach(tag => { // console.log("tag", tag, tagsToCompare);
      let isInclude = tagsToCompare.includes(tag);

      if (!isInclude) {
        tagsToCompare.push(tag);
        tagsToCompare.sort();
      }
    });
  }

  /**
   * Determines whether the recipe can be displayed.
   * @param {array} currentRecipeArray The table to compare.
   * @param {array} arrayToCompare The array of data to search for.
   * @param {integer} arrayToCompareLength The size of the array of data to search for.
   * @returns {boolean}
   */
  recipeIsDisplayable(currentRecipeArray, arrayToCompare, arrayToCompareLength) { // console.log("recipeIsDisplayable", currentRecipeArray, arrayToCompare, arrayToCompareLength)
    /**
      * Does the array contain the data to be searched for?
      * @type {boolean}
      */
    let isInclude = currentRecipeArray.includes(arrayToCompare);

    return isInclude || !arrayToCompareLength ? true : false;
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