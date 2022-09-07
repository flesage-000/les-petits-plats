class recipes {
  /**
   *
   * @param {object} data Recipes JSON
   */
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._servings = data.servings;
    this._ingredients = data.ingredients;
    this._time = data.time;
    this._description = data.description;
    this._appliance = data.appliance;
    this._ustensils = data.ustensils;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get servings()  {
    return this._servings;
  }

  get ingredients() {
    let newIngredients = [];

    this._ingredients.forEach(current => {
      let currentIngredient = new Object();

      // Normalize ingredient name
      let currentName = current.ingredient.toLowerCase();
      currentName = currentName.charAt(0).toUpperCase() + currentName.slice(1);

      let currentQuantity = null;
      if (current.quantity) {
        currentQuantity = current.quantity;
      }

      let currentUnit = null;
      if (current.unit) {
        currentUnit = current.unit.toLowerCase();
        currentUnit = currentUnit.replace(".", "");

        switch (currentUnit) {
          case "cl":
            break;
          case "barquettes":
            if (currentQuantity == 1) { currentUnit = "barquette"; }
            else  { currentUnit = "barquettes"; }
            break;
          case "boites":
            if (currentQuantity == 1) { currentUnit = "boite"; }
            else  { currentUnit = "boites"; }
            break;
          case "cuillères à café":
            currentUnit = "CàC";
            break;
          case "cuillère à soupe":
          case "cuillères à soupe":
            currentUnit = "CàS";
            break;
          case "feuilles":
            if (currentQuantity == 1) { currentUnit = "feuille"; }
            else  { currentUnit = "feuilles"; }
            break;
          case "grammes":
            currentUnit = "g";
            break;
          case "gousses":
            if (currentQuantity == 1) { currentUnit = "gousse"; }
            else  { currentUnit = "gousses"; }
            break;
          case "kg":
            break;
          case "litre":
          case "litres":
            currentUnit = "l";
            break;
          case "millilitre":
          case "ml":
            currentUnit = "ml";
            break;
          case "pincées":
            if (currentQuantity == 1) { currentUnit = "pincée"; }
            else  { currentUnit = "pincées"; }
            break;
          case "sachets":
            if (currentQuantity == 1) { currentUnit = "sachet"; }
            else  { currentUnit = "sachets"; }
            break;
          case "tasses":
            if (currentQuantity == 1) { currentUnit = "tasse"; }
            else  { currentUnit = "tasses"; }
            break;
          case "tiges":
            if (currentQuantity == 1) { currentUnit = "tige"; }
            else  { currentUnit = "tiges"; }
            break;
          case "tranches":
            if (currentQuantity == 1) { currentUnit = "tranche"; }
            else  { currentUnit = "tranches"; }
            break;
          case "verres":
            if (currentQuantity == 1) { currentUnit = "verre"; }
            else  { currentUnit = "verres"; }
            break;
          default: console.warn("ERROR '" + currentUnit + "' not managed!");
        }
      }

      // Push data into ingredient object
      currentIngredient.ingredient = currentName;
      if (currentQuantity) { currentIngredient.quantity = currentQuantity; }
      if (currentUnit) { currentIngredient.unit = currentUnit; }

      // Push ingredients object into ingredients array
      newIngredients.push(currentIngredient);

    });
    console.log("newIngredients", newIngredients);
    return newIngredients;
  }

  get time() {
    const attrDatetime = "PT" + this._time + "M";

    let hours = 0;
    let minutes = 0;
    let int = this._time;
    let displayedDatetime = this._time + "min";

    if (int > 60) {
      int = (this._time / 60).toPrecision(3);

      const array = int.toString().split(".");
      hours = array[0];
      minutes = Math.ceil(array[1] / 100 * 60);
      displayedDatetime = hours + "h" + minutes;
    }
    const result = [];
    result.push(attrDatetime);
    result.push(displayedDatetime);

    return result;
  }

  get description() {
    return this._description;
  }

  get appliance() {
    let array = [];
    array.push(this._appliance);
    return array;
  }

  get ustensils() {
    return this._ustensils;
  }
}

export  { recipes };