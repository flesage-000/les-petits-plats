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
        <div class="ingredients">
          <ul class="list-unstyled">
            <li><span class="font-weight-bolder">${this._data.ingredients}: </span>200g</li>
          </ul>
        </div>

        <div class="preparation">
          <p>
            ${this._data.description}
          </p>
        </div>
      </div>

    </div>
    `;

    $wrapper.innerHTML = $content;

    // Add Boostrap class
    $wrapper.classList.add("card");
    $wrapper.classList.add("border-0");

    return $wrapper;
  }
}