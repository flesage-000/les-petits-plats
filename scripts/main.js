import { data } from "./data.js";

import { search } from "./modules/search.js";
import { tags } from "./modules/tags.js"
import { result } from "./modules/result.js"

class main {
  constructor() {
    this._data = data;
    this.__result = new result(this._data);
  }

  init() {
    const _search = new search(this._data);
    _search.init();

    const _tags = new tags(this._data);
    _tags.init();

    const _result = new result(this._data);
    _result.init();
  }
}

const _main = new main();
_main.init();