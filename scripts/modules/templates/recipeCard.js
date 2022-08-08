class tplRecipeCard {
  constructor(data) {
    this._data = data;
  }

  card() {
    const $wrapper = document.createElement("div");
    const $content = `
    <img src="..." class="card-img-top bg-card-header" alt="...">

    <div class="card-body bg-card-body">

      <h5 class="card-title">${this._data.name} <time datetime="PT60M" class="text-truncate"><i class="bi bi-clock" aria-label="horloge"></i>${this._data.time}</time></h5>

      <div class="recipe">
        <div class="ingredients"></div>

        <div class="preparation">
          <p>
            ${this._data.description}
          </p>
        </div>
      </div>

    </div>
    `;

    $wrapper.innerHTML = $content;

    const $wrapperIngredient = $wrapper.querySelector(".ingredients");
    const $contentIngredient = this.ingredients(this._data.ingredients);
    $wrapperIngredient.appendChild($contentIngredient);

    // Add Boostrap class
    $wrapper.classList.add("card");
    $wrapper.classList.add("border-0");

    return $wrapper;
  }

  ingredients(ingredients) {
    const $ul = document.createElement("ul");

    ingredients.forEach(ingredient => {
      const $li = document.createElement("li");
      const $span = document.createElement("span");
      let string;

      switch(true) {
        // All datas are available
        case ingredient.quantity !== undefined && ingredient.unit !== undefined:
          $li.innerText = ingredient.quantity + ingredient.unit;
          $span.innerText = ingredient.ingredient + ":";
          break;
        // Unit data not available
        case ingredient.quantity !== undefined && ingredient.unit === undefined:
          $li.innerText = ingredient.quantity;
          $span.innerText = ingredient.ingredient + ":";
          break;
        // Quantity and unit not availables
        case ingredient.quantity === undefined && ingredient.unit === undefined:
          $span.innerText = ingredient.ingredient;
          break;
        default:
          console.error("ingredient not managed => ", ingredient);
      }

      $li.prepend($span);
      const $content = `
      <li><span class="font-weight-bolder">${ingredient.ingredient}: </span>${ingredient.quantity}${ingredient.unit}</li>
      `;
      $ul.appendChild($li);
    });

    // Add bootstrap class
    $ul.classList.add("list-unstyled");

    return $ul;
  }
}