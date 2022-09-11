class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.classList.add('container');
  }

  render() {
    this.innerHTML = `
      <footer class="">
        <a href="#jumbotron" class="focusable">
          <i class="fa-solid fa-arrow-up-long">to up</i>
        </a>
        <p class="focusable">made with ❤️ by fiqri ardiansyah</p>
      </footer>
        `;
  }
}

customElements.define('footer-component', FooterComponent);
export default FooterComponent;
