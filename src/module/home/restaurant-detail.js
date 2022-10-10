class RestaurantDetail extends HTMLElement {
  setRestaurant(restaurant) {
    this.restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="image">
            <span class="rating">${this.restaurant?.rating}</span>
            <img data-src="${this.restaurant?.pictureId}" alt="${this.restaurant?.name}" class="lazyload" onerror="this.onerror=null;this.src='/images/placeholder.png'" />
        </div>
        <div class="content">
            <h1 class="name">${this.restaurant?.name}</h1>
            <p class="desc">${this.restaurant?.description}</p>
            <span class="city">${this.restaurant?.city}</span>
        </div>
        `;
  }
}

customElements.define('restaurant-detail', RestaurantDetail);
export default RestaurantDetail;
