class tagTpl {
  constructor() {}

  list(name, type) {
    const $wrapper = document.createElement("div");
    const $link = `<a class="dropdown-item text-white bg-${type} text-truncate" title="${name}" href="#">${name}</a>`;

    $wrapper.innerHTML = $link;
    $wrapper.classList.add("col");

    return $wrapper;
  }
}

export { tagTpl };