import { search } from "./modules/search.js";
import { tags } from "./modules/tags.js"
import { result } from "./modules/result.js"

class main {
  constructor() {}

  init() {
    const _search = new search(recipes);
    _search.init();

    const _tags = new tags(recipes);
    _tags.init();

    const _result = new result(recipes);
    _result.init();
  }
}

const _main = new main();
_main.init();