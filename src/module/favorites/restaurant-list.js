import idb from '../../data/idb';

class FavoriteRestaurantList extends HTMLElement {
  connectedCallback() {
    this.getListRestaurant();
  }

  async getListRestaurant() {
    this.setLoading(true);
    this.restaurants = await idb.getAllRestaurant();
    this.setLoading(false);
  }

  setLoading(loading) {
    this.loading = loading;
    this.render();
  }

  render() {
    if (this.loading) {
      this.innerHTML = `
        <div class="loading-container">
            <loading-component size="100"></loading-component>
        </div>
      `;
      return;
    }

    if (!this.restaurants || this.restaurants?.length === 0) {
      this.innerHTML = '<empty-component text="lets add your favorite restaurant here!" ></empty-component>';
      return;
    }

    this.innerHTML = '<div class="list"></div>';
    const list = this.querySelector('.list');
    this.restaurants?.forEach((el) => {
      const restaurant = document.createElement('restaurant-item');
      restaurant.setRestaurant(el);
      list.appendChild(restaurant);
    });
  }
}

customElements.define('favorite-restaurant-list', FavoriteRestaurantList);
export default FavoriteRestaurantList;
