export default class tagTpl {
  constructor() {}

  list(name, type) { // console.log("name", name);
    const $wrapper = document.createElement("div");
    const $link = `
      <a  class="dropdown-item text-white bg-${type} text-truncate"
          title="${name}"
          data-tag-name="${name}"
          data-tag-type="${type}"
          data-selected="false"
          href="#">${name}</a>`;

    $wrapper.innerHTML = $link;
    $wrapper.classList.add("col");

    return $wrapper;
  }

  button(name, type) {
    // <button class="btn btn-sm btn-ingredients text-white" type="button" aria-label="Cliquer pour supprimer le tag 'Button'">Tag<i class="bi bi-x-circle"></i></button>
    const $fragment = document.createDocumentFragment();
    const typeToLowerCase = type.toLowerCase();

    const $button = `
      <button class="btn btn-sm btn-${typeToLowerCase} text-white bi bi-x-circle"
              type="button"
              aria-label="Cliquer pour supprimer le tag '${name}'"
              data-tag-type="${typeToLowerCase}"
              data-tag-name="${name}">${name}
      </button>`;
    const parser = new DOMParser();
    const $tag = parser.parseFromString($button, "text/html");
    $fragment.append($tag.body.firstChild);

    return $fragment;
  }
}