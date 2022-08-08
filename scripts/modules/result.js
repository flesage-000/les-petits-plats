class result {
  constructor() {}

  init() {
    this.generateCard();
  }

  generateCard() {
    const $container = document.querySelector(".results");

    data.forEach(recipe => {
      const card = new tplRecipeCard(recipe);
      const $wrapper = card.card();

      $container.appendChild($wrapper);
    });
  }
}

export { result };