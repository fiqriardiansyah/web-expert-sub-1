class NavigationDetailBar extends HTMLElement {
  setTitle(title) {
    this.title = title;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="content container">
            <a href="#" class="back-button focusable">
                <i class="fa-solid fa-arrow-left-long">go back</i>
            </a>
            <p class="">${this.title || ''}</p>
        </div>
        `;
  }
}

customElements.define('navigation-detail-bar', NavigationDetailBar);
export default NavigationDetailBar;
