import Apis from '../../config/apis';
import Utils from '../../utils';

class RestaurantList extends HTMLElement {
  connectedCallback() {
    this.getListRestaurant();
  }

  isOffline() {
    return (!this.restaurants && !Utils.isOnline());
  }

  getListRestaurant() {
    this.setLoading(true);
    this.setError(null);
    Apis.getListRestaurant().then((res) => {
      this.setLoading(false);
      this.restaurants = res.data?.restaurants;
      this.render();
    }).catch((err) => {
      this.setError(err?.message || 'oops something went wrong');
    });
  }

  setLoading(loading) {
    this.loading = loading;
    this.render();
  }

  setError(error) {
    this.error = error;
    this.render();
  }

  onlineContent() {
    this.innerHTML = '<div class="list"></div>';
    const list = this.querySelector('.list');
    this.restaurants?.forEach((el) => {
      const restaurant = document.createElement('restaurant-item');
      restaurant.setRestaurant(el);
      list.appendChild(restaurant);
    });
  }

  offlineContent() {
    this.innerHTML = '<offline-component></offline-component>';
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

    if (this.error) {
      this.innerHTML = `
        <div class="error-message">
          ${this.error}
        </div>
      `;
      return;
    }

    if (this.isOffline()) {
      this.offlineContent();
      return;
    }

    this.onlineContent();
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
