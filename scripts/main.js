import { search } from "./modules/search.js";
import { tags } from "./modules/tags.js"

class main {
  constructor() {}

  init() {
    const _search = new search(recipes);
    _search.init();

    const _tags = new tags(recipes);
    _tags.init();
  }
}

const _main = new main();
_main.init();