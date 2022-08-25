import { recipes } from "./models/recipes.js";
import { tags } from "./tags.js";

class result {
  constructor() {
    this._tags = new tags();
  }

  init() {
    this.refresh(data);
  }

  /**
   * Create recipe results cards.
   */
  generateCard(data) {
    const $container = document.querySelector(".results");
    const recipeLength = data.length;

    data.forEach((recipe, key, data) => {
      recipe = new recipes(recipe);
      const card = new tplRecipeCard(recipe);
      const $wrapper = card.card(recipe);

      $container.appendChild($wrapper);

      // Update tags list
      this._tags.updateList(recipe.ingredients, "ingredients");
      this._tags.updateList(recipe.appliance, "devices");
      this._tags.updateList(recipe.ustensils, "ustensils");

      if (Object.is(data.length - 1, key)) {
        this.cssGridManager($container, recipeLength);
        this._tags.add();
      }
    });
  }

  refresh(data) {
    this.generateCard(data);
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