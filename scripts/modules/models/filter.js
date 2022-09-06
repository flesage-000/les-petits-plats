/**
 * Filter models
 */
class filters {
  constructor(filter) {
    this._ingredients = filter.ingredients;
    this._devices = filter.devices;
    this._ustensils = filter.ustensils;
  }

  get ingredients() {
    return this._ingredients;
  }

  get devices() {
    return this._devices;
  }

  get ustensils() {
    return this._ustensils;
  }
}