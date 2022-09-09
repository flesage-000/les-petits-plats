import { tplRecipeCard } from "./templates/recipeCard.js";
import { tags } from "./tags.js";

class result {
  /**
   * @param {object} data All necessary data (recipes + options) on the results page.
   */
  constructor(data) {
    this.data = data;
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
    const recipesLength = recipes.length; console.log("recipesLength", recipesLength);
    /**
     * The array of tags.
     * @type {array}
    */
    let tagsSelected = this.data.tags;

    /**
     * The array of selected devices.
     * @type {object}
     */
    let tagsSelectedAppliances = tagsSelected.appliances.selected;
    /**
     * The array length of selected devices.
     * @type {number}
     */
    let tagsSelectedAppliancesLength = tagsSelectedAppliances.length;

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
     * The array of selected ustensils.
     * @type {object}
     */
    let tagsSelectedUstensils = tagsSelected.ustensils.selected;
    /**
     * The array length of selected ustensils.
     * @type {number}
     */
    let tagsSelectedUstensilsLength = tagsSelectedUstensils.length;

    recipes.forEach((recipe, key) => { console.log("recipe, key", recipe, key);

      if (key == 0) {console.log("!!! TRAITEMENT COMMENCEE !!!")}

      /**
      * The array of devices in the current recipe.
      * @type {array}
      */
      let currentAppliances = recipe.appliance;
      /**
       * Determines whether the current recipe is displayable according to its appliances.
       * @type {boolean}
       */
      let currentAppliancesIsDisplayable = this.recipeIsDisplayable(currentAppliances, tagsSelectedAppliances.selected, tagsSelectedAppliancesLength);

      /**
       * The array of ingredients in the current recipe.
       * @type {array}
      */
      let currentIngredients = recipe.ingredients;
      /**
       * Determines whether the current recipe is displayable according to its ingredients.
       * @type {boolean}
       */
      let currentIngredientsIsDisplayable = this.recipeIsDisplayable(currentIngredients, tagsSelectedIngredients.selected, tagsSelectedIngredientsLength);

      /**
       * The array of ustensils in the current recipe.
       * @type {array}
      */
      let currentUstensils = recipe.ustensils;
      /**
       * Determines whether the current recipe is displayable according to its ingredients.
       * @type {boolean}
       */
      let currentUstensilsIsDisplayable = this.recipeIsDisplayable(currentUstensils, tagsSelectedUstensils.selected, tagsSelectedUstensilsLength);

      if (currentAppliancesIsDisplayable && currentIngredientsIsDisplayable && currentUstensilsIsDisplayable) {
        console.log("!!! IS DISPLAY !!!")

      }

      if (recipesLength - 1 == key) {console.log("!!! TRAITEMENT TERMINEE !!!")}
    });
  }

  getTags() {

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