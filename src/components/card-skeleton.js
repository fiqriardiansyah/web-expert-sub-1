class CardSkeleton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="image"></div>
        <div class="title"></div>
        <div class="content"></div>
        <div style="width: 70%;" class="content"></div>
        <div style="width: 30%;" class="content"></div>
    `;
  }
}

customElements.define('card-skeleton', CardSkeleton);
