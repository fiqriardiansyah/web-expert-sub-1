class DetailRestaurantSkeleton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="jumbotron"></div>
          <div class="body container">
            <div class="image"></div>
            <div class="content">
                <div class="rating"></div>
                <div class="text"></div>
                <div class="text"></div>
                <div class="text"></div>
            </div>
          </div>
      `;
  }
}

customElements.define('detail-restaurant-skeleton', DetailRestaurantSkeleton);
