class SkipToContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <a href="#main" class="skip-to-content">skip to content</a>
        `;
  }
}

customElements.define('skip-to-content', SkipToContent);
export default SkipToContent;
