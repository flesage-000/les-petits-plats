import { recipes } from "./models/recipes.js";

class result {
  constructor() {}

  init() {
    this.generateCard();
  }

  generateCard() {
    const $container = document.querySelector(".results");

    data.forEach(recipe => {
      recipe = new recipes(recipe);
      const card = new tplRecipeCard(recipe);
      const $wrapper = card.card(recipe);

      $container.appendChild($wrapper);
    });
  }
}

export { result };