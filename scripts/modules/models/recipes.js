class recipes {
  /**
   *
   * @param {object} data Recipes JSON
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.serving = data.serving;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
  }

  get id() {
    return this.id;
  }

  get name() {
    return this.name;
  }

  get serving() {
    return this.serving;
  }

  get ingredients() {
    return this.ingredients;
  }

  get time() {
    return this.time;
  }

  get description() {
    return this.description;
  }

  get appliance() {
    return this.appliance;
  }

  get ustensils() {
    return this.ustensils;
  }
}