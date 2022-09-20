class FormSearch extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  onSubmitHandler(handler) {
    this.handler = handler;
    this.render();
  }

  onSubmit() {
    const form = this.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { value } = e.target[0];
      this.handler(value.trim());
    });
  }

  setPlaceholder(text) {
    this.placeholder = text;
    this.render();
  }

  render() {
    this.innerHTML = `
        <form class="search-container">
            <input type="text" class="focusable" placeholder="${this.placeholder}" />
            <button class="">
            <i class="fa-solid fa-magnifying-glass">search</i>
            </button>
        </form>
        `;
    this.onSubmit();
  }
}

customElements.define('form-search', FormSearch);
export default FormSearch;
