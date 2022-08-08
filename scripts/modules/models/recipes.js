class recipes {
  /**
   *
   * @param {object} data Recipes JSON
   */
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._serving = data.serving;
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

  get serving() {
    return this._serving;
  }

  get ingredients() {
    return this._ingredients;
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
    return this._appliance;
  }

  get ustensils() {
    return this._ustensils;
  }
}

export  { recipes };