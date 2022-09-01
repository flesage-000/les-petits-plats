import { recipes } from "./models/recipes.js";
import { tags } from "./tags.js";

class result {
  constructor() {
    this._tags = new tags();
  }

  init() {
    this.generateCard();
  }

  /**
   * Create recipe results cards.
   */
  generateCard(filter = new Object()) {
    const $container = document.querySelector(".results");
    const recipeLength = data.length;
    const filterLength = Object.keys(filter).length;
    let recipeToDisplay = 0;

    data.filter((recipe, key, data) => {
      /**
       * @description Generated HTML card. If null, no content has been generated.
       * @default null
       */
      let $wrapper = null;

      // First iteration
      if (key == 0) {
        // Clear results node
        $container.textContent = "";
      }

      if (filterLength) {
        const ingredientsFilter = filter.ingredients;
        const devicesFilter = filter.devices;
        const ustensilsFilter = filter.ustensils;

        const ingredientsFilterLength = ingredientsFilter.length;
        const devicesFilterLength = devicesFilter.length;
        const ustensilsFilterLength = ustensilsFilter.length;

        const ingredientsFilterSet = new Set(ingredientsFilter);
        const devicesFilterSet = new Set(devicesFilter);
        const ustensilsFilterSet = new Set(ustensilsFilter);

        const recipeIngredients = recipe.ingredients;
        const recipeDevices = recipe.appliance;
        const recipeUstensils = recipe.ustensils;

        let hasIngredient;
        if (ingredientsFilterLength >= 1) {
          recipeIngredients.forEach(recipeIngredient => {
            hasIngredient = ingredientsFilterSet.has(recipeIngredient.ingredient);
          });
        } else { hasIngredient = true; }

        let hasDevices;
        if (devicesFilterLength >= 1) {
          recipeDevices.forEach(recipeAppliance => {
            hasDevices = devicesFilterSet.has(recipeAppliance.appliance);
          });
        } else { hasDevices = true; }

        let hasUstensils;
        if (ustensilsFilterLength >= 1) {
          recipeUstensils.forEach(recipeUstensil => {
            hasUstensils = ustensilsFilterSet.has(recipeUstensil.ustensils);
          });
        } else { hasUstensils = true; }

        // Generate filtered results
        if (hasIngredient && hasDevices && hasUstensils) {
          recipe = new recipes(recipe);
          const card = new tplRecipeCard(recipe);
          $wrapper = card.card(recipe);

          // Update tags list
          this._tags.updateList(recipe.ingredients, "ingredients", ingredientsFilter);
          this._tags.updateList(recipe.appliance, "devices", devicesFilter);
          this._tags.updateList(recipe.ustensils, "ustensils", ustensilsFilter);
        }





console.log("if", recipe);
      } else {
        // Generate All results
        recipe = new recipes(recipe);
        const card = new tplRecipeCard(recipe);
        $wrapper = card.card(recipe);

        // Update tags list
        this._tags.updateList(recipe.ingredients, "ingredients");
        this._tags.updateList(recipe.appliance, "devices");
        this._tags.updateList(recipe.ustensils, "ustensils");
console.log("else");
      }

      if ($wrapper != null) {
        recipeToDisplay++;
        $container.appendChild($wrapper);
        console.log("recipeToDisplay", recipeToDisplay);
      }

      // Callback
      if (Object.is(data.length - 1, key)) {
        // Manage CSS grid results
        this.cssGridManager($container, recipeToDisplay);
        this._tags.add();
        console.log("CALLBACK recipeToDisplay", recipeToDisplay);
      }
    });
  }

  refresh(filter) {
    console.log("filter", filter);
    this.generateCard(filter);
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