export default class tplRecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  card(recipe) { console.log("card:\r\n- recipe:", typeof recipe, recipe);
    const $wrapper = document.createElement("div");

    const $content = `
    <img src="" class="card-img-top bg-card-header" alt="...">

    <div class="card-body bg-card-body">

      <h5 class="card-title row"><span class="col">${recipe.name}</span><time datetime="${recipe.time[0]}" class="text-truncate col-auto"><i class="bi bi-clock" aria-label="horloge"></i>${recipe.time[1]}</time></h5>

      <div class="recipe container">
        <div class="row row-cols-2">
          <div class="ingredients col"></div>

          <div class="preparation col">
            <p>
              ${recipe.description}
            </p>
          </div>
        </div>
      </div>

    </div>
    `;

    $wrapper.innerHTML = $content;

    const $wrapperIngredient = $wrapper.querySelector(".ingredients");
    const $contentIngredient = this.ingredients(recipe.ingredients);
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

      switch(true) {
        // All datas are available
        case ingredient.quantity !== undefined && ingredient.unit !== undefined:
          $li.innerText = ingredient.quantity + ingredient.unit;
          $span.innerText = ingredient.ingredient + ": ";
          break;
        // Unit data not available
        case ingredient.quantity !== undefined && ingredient.unit === undefined:
          $li.innerText = ingredient.quantity;
          $span.innerText = ingredient.ingredient + ": ";
          break;
        // Quantity and unit not availables
        case ingredient.quantity === undefined && ingredient.unit === undefined:
          $span.innerText = ingredient.ingredient;
          break;
        default:
          console.error("ingredient not managed => ", ingredient);
      }

      // Add bootstrap class
      $span.classList.add("font-weight-bolder");

      $li.prepend($span);
      $ul.appendChild($li);
    });

    // Add bootstrap class
    $ul.classList.add("list-unstyled");

    return $ul;
  }
}