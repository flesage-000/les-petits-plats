import { recipes } from "./models/recipes.js";
import { tplRecipeCard } from "./templates/recipeCard.js";
import { tags } from "./tags.js";

class result {
  constructor(data) {
    this._tags = new tags(data);
    this._data = data;
  }

  init() {
    this.generateCard();
  }

  /**
   * Create recipe results cards.
   * @param {object} Filter Un tableau contenant les tags sélectionnés par l'utilisateur. Peut ne pas être envoyé, il ne sera alors qu'un objet vide.
   */
  generateCard(filter = new Object()) {
    const $container = document.querySelector(".results");
    const data = this._data;
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
      this._recipes = new recipes(recipe);

      if (filterLength) {
        const ingredientsFilter = filter.ingredients;
        const devicesFilter = filter.devices;
        const ustensilsFilter = filter.ustensils;

        const ingredientsFilterLength = ingredientsFilter.length;
        const devicesFilterLength = devicesFilter.length;
        const ustensilsFilterLength = ustensilsFilter.length;

        const recipeIngredients = this._recipes.ingredients;
        const recipeDevices = this._recipes.appliance;
        const recipeUstensils = this._recipes.ustensils;

        let includeIngredient = false;
        if (ingredientsFilterLength >= 1) {
          recipeIngredients.forEach(recipeIngredient => {
            if (ingredientsFilter.includes(recipeIngredient.ingredient)) { includeIngredient = true; }
          });
        } else { includeIngredient = true; }

        let includeDevices = false;
        if (devicesFilterLength >= 1) {
          recipeDevices.forEach(recipeAppliance => {
            if (devicesFilter.includes(recipeAppliance)) { includeDevices = true; }
          });
        } else { includeDevices = true; }

        let includeUstensils = false;
        if (ustensilsFilterLength >= 1) {
          recipeUstensils.forEach(recipeUstensil => {
            if (ustensilsFilter.includes(recipeUstensil)) { includeUstensils = true; }
          });
        } else { includeUstensils = true; }

        // Generate filtered results
        if (includeIngredient && includeDevices && includeUstensils) {
          // recipe = new recipes(recipe);
          const card = new tplRecipeCard(this._recipes);
          $wrapper = card.card();

          // Update tags list
          this._tags.updateList(this._recipes.ingredients, "ingredients", ingredientsFilter);
          this._tags.updateList(this._recipes.appliance, "devices", devicesFilter);
          this._tags.updateList(this._recipes.ustensils, "ustensils", ustensilsFilter);
        }
      } else {
        // Generate All results
        // recipe = new recipes(recipe);
        const card = new tplRecipeCard(this._recipes);
        $wrapper = card.card();

        // Update tags list
        this._tags.updateList(this._recipes.ingredients, "ingredients");
        this._tags.updateList(this._recipes.appliance, "devices");
        this._tags.updateList(this._recipes.ustensils, "ustensils");
      }

      if ($wrapper != null) {
        recipeToDisplay++;
        $container.appendChild($wrapper);
      }

      // Callback
      if (Object.is(data.length - 1, key)) {
        // Manage CSS grid results
        this.cssGridManager($container, recipeToDisplay);
        this._tags.add();
      }
    });
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