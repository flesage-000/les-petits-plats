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
    let currentName = this._name.toLowerCase();
    currentName = currentName.charAt(0).toUpperCase() + currentName.slice(1);

    return currentName;
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

      switch(currentName) {
        case "Ail":
        case "Ananas":
          // currentName = "";
          break;
        case "Banane":
        case "Bananes":
          currentName = "Banane";
          break;
        case "Basilic":
        case "Beurre":
          // currentName = "";
          break;
        case "Beurre fondu":
          currentName = "Beurre";
          break;
        case "Beurre salé":
        case "Bicarbonate":
        case "Blanc de dinde":
          // currentName = "";
          break;
        case "Boudoirs":
          currentName = "Boudoir";
          break;
        case "Carotte":
          // currentName = "";
          break;
        case "Champignons de paris":
          currentName = "Champignons de Paris";
          break;
        case "Chocolat":
        case "Chocolat au lait":
        case "Chocolat noir":
          // currentName = "";
          break;
        case "Chocolat noir en pepites":
          currentName = "Chocolat noir en pépites";
          break;
        case "Citron":
        case "Citron vert":
        case "Concombre":
        case "Courgette":
        case "Coulis de tomates":
        case "Crème de coco":
          // currentName = "";
          break;
        case "Coulis de tomate":
          currentName = "Coulis de tomates";
          break;
        case "Crème fraiche":
        case "Crème fraîche":
        case "Crême fraîche":
          currentName = "Crème fraîche";
          break;
        case "Crème liquide":
        case "Cumin":
        case "Eau":
        case "Échalote":
        case "Emmental":
        case "Farine":
        case "Farine de blé noir":
        case "Feuilles de laitue":
        case "Fraise":
        case "Fromage à raclette":
        case "Fromage blanc":
        case "Fromage de chèvre":
        case "Glace à la vanille":
        case "Glaçons":
          // currentName = "";
          break;
        case "Gruyère":
        case "Gruyère râpé":
          currentName = "Gruyère";
          break;
        case "Haricots verts":
        case "Huile d'olive":
        case "Huile d'olives":
          currentName = "Huile d'olives";
          break;
        case "Jambon de parme":
          currentName = "Jambon de Parme";
          break;
        case "Jambon fumé":
        case "Jus de citron":
        case "Jus de coco":
          // currentName = "";
          break;
        case "Kiwi":
        case "Kiwis":
          currentName = "Kiwi";
          break;
        case "Lait":
        case "Lait de coco":
        case "Lardons":
        case "Lasagnes":
        case "Macaronis":
        case "Maïs":
        case "Maïzena":
        case "Mayonnaise":
        case "Menthe":
          // currentName = "";
        case "Moutarde de dijon":
          currentName = "Moutarde de Dijon";
          break;
        case "Oeuf":
        case "Oeuf dur":
        case "Oignon":
        case "Olives":
        case "Orange":
        case "Oseille":
        case "Mâche":
        case "Mangue":
        case "Mascarpone":
        case "Miel":
        case "Mozzarella":
        case "Noix":
        case "Noix de muscade":
        case "Pain":
        case "Pain de mie":
        case "Paprika":
        case "Pastèque":
        case "Patate douce":
        case "Pâte à pizza":
        case "Pâte brisée":
        case "Pâte feuilletée":
        case "Pâte sablée":
        case "Parmesan":
          // currentName = "";
        case "Petits poids":
          currentName = "Petits pois";
          break;
        case "Pennes":
        case "Poireau":
          // currentName = "";
          break;
        case "Poires au jus":
          currentName = "Poire au jus";
          break;
        case "Pois cassé":
          currentName = "Pois cassés";
          break;
        case "Pois chiches":
          currentName = "Pois chiches";
          break;
        case "Poivron rouge":
          // currentName = "";
          break;
        case "Pomme":
        case "Pommes":
          currentName = "Pomme";
          break;
        case "Pommes de terre":
          // currentName = "";
          break;
        case "Poudre d'amendes":
          currentName = "Poudre d'amandes";
          break;
        case "Poulet":
        case "Pruneaux":
        case "Rhubarbe":
        case "Riz blanc":
        case "Roblochon":
        case "Salade verte":
          // currentName = "";
          break;
        case "Saucisse bretonne ou de toulouse":
          currentName = "Saucisse bretonne ou de Toulouse";
          break;
        case "Saumon fumé":
          // currentName = "";
          break;
        case "Spaghettis":
          currentName = "Spaghetti";
          break;
        case "Sucre":
          currentName = "Sucre en poudre";
          break;
        case "Sucre glace":
        case "Sucre en poudre":
        case "Sucre roux":
        case "Sucre vanillé":
        case "Tagliatelles":
        case "Thon en miettes":
        case "Thon rouge (ou blanc)":
        case "Tomate":
        case "Tomates cerises":
        case "Tomates pelées":
        case "Vermicelles":
        case "Viande hachée":
        case "Viande hachée 1% de matière grasse":
        case "Vinaigre balsamic":
        case "Vinaigre de cidre":
        case "Vinaigrette":
        case "Vin blanc sec":
        case "Vin rouge":
          // currentName = "";
          break;
        default: console.warn("ERROR name '" + currentName + "' not managed!");
      }

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
            if (currentQuantity == 1) { currentUnit = " barquette"; }
            else  { currentUnit = " barquettes"; }
            break;
          case "boites":
            if (currentQuantity == 1) { currentUnit = " boite"; }
            else  { currentUnit = " boites"; }
            break;
          case "cuillères à café":
            currentUnit = "CàC";
            break;
          case "cuillère à soupe":
          case "cuillères à soupe":
            currentUnit = "CàS";
            break;
          case "feuilles":
            if (currentQuantity == 1) { currentUnit = " feuille"; }
            else  { currentUnit = " feuilles"; }
            break;
          case "grammes":
            currentUnit = "g";
            break;
          case "gousses":
            if (currentQuantity == 1) { currentUnit = " gousse"; }
            else  { currentUnit = " gousses"; }
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
            if (currentQuantity == 1) { currentUnit = " pincée"; }
            else  { currentUnit = " pincées"; }
            break;
          case "sachets":
            if (currentQuantity == 1) { currentUnit = " sachet"; }
            else  { currentUnit = " sachets"; }
            break;
          case "tasses":
            if (currentQuantity == 1) { currentUnit = " tasse"; }
            else  { currentUnit = " tasses"; }
            break;
          case "tiges":
            if (currentQuantity == 1) { currentUnit = " tige"; }
            else  { currentUnit = " tiges"; }
            break;
          case "tranches":
            if (currentQuantity == 1) { currentUnit = " tranche"; }
            else  { currentUnit = " tranches"; }
            break;
          case "verres":
            if (currentQuantity == 1) { currentUnit = " verre"; }
            else  { currentUnit = " verres"; }
            break;
          default: console.warn("ERROR unit '" + currentUnit + "' not managed!");
        }
      }

      // Push data into ingredient object
      currentIngredient.ingredient = currentName;
      if (currentQuantity) { currentIngredient.quantity = currentQuantity; }
      if (currentUnit) { currentIngredient.unit = currentUnit; }

      // Push ingredients object into ingredients array
      newIngredients.push(currentIngredient);

    });
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
    let currentName = this._appliance.toLowerCase();
    currentName = currentName.charAt(0).toUpperCase() + currentName.slice(1);

    switch (currentName) {
      case "Blender":
        // currentName = "";
        break;
      case "Casserole":
      case "Casserolle":
      case "Casserolle.":
        currentName = "Casserole";
        break;
      case "Cocotte":
      case "Cuiseur de riz":
      case "Four":
        // currentName = "";
        break;

      case "Mixer":
        currentName = "Mixeur";
        break;
      case "Moule à charlotte":
        // currentName = "";
        break;
      case "Poële":
        currentName = "Poêle";
        break;
      case "Poële à crêpe":
        currentName = "Poêle à crêpe";
        break;
      case "Saladier":
      case "Sauteuse":
        // currentName = "";
        break;
      default: console.warn("ERROR device '" + currentName + "' not managed!");
    }

    array.push(currentName);

    return array;
  }

  get ustensils() {
    let newUstensils = [];

    this._ustensils.forEach(ustensil => {
      ustensil = ustensil.toLowerCase();
      ustensil = ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

      switch (ustensil) {
        case "Bol":
          // ustensil: "";
          break;
        case "Casserolle":
          ustensil = "Casserole";
          break;
        case "Cocotte minute":
        case "Couteau":
        case "Cuillère à melon":
        case "Cuillère à soupe":
        case "Cuillère en bois":
        case "Économe":
        case "Fouet":
        case "Fourchette":
        case "Louche":
        case "Moule":
          // ustensil = "";
          break;
        case "Moule à gateaux":
          ustensil = "Moule à gâteaux";
          break;
        case "Moule à tarte":
        case "Moule à tartelettes (6)":
        case "Passoire":
        case "Plaque de cuisson":
        case "Plat à gratin":
          // ustensil = "";
          break;
        case "Poelle à frire":
          ustensil = "Poêle à frire";
          break;
        case "Presse citron":
        case "Râpe à fromage":
        case "Rouleau à patisserie":
        case "Saladier":
        case "Spatule":
          // ustensil = "";
          break;
        case "Verres":
          ustensil = "Verre";
          break;
        default: console.warn("ERROR ustensil '" + ustensil + "' not managed!");
      }

      newUstensils.push(ustensil);
    });

    return newUstensils;
  }
}

export  { recipes };