import Apis from '../../data/apis';
import Utils from '../../utils';

class RestaurantList extends HTMLElement {
  isOffline() {
    return (!this.restaurants && !Utils.isOnline());
  }

  getListRestaurant() {
    this.setLoading(true);
    this.setError(null);
    Apis.getListRestaurant().then((res) => {
      this.setLoading(false);
      this.restaurants = res.data?.restaurants;
      if (res.data?.error) {
        this.setError(res.data?.message || 'oops something went wrong');
        return;
      }
      this.render();
    }).catch((err) => {
      this.setError(err?.message || 'oops something went wrong');
    });
  }

  getSearchRestaurant(query) {
    this.query = query;
    this.setLoading(true);
    this.setError(null);
    Apis.getSearchRestaurant(query).then((res) => {
      this.setLoading(false);
      this.restaurants = res.data?.restaurants;
      if (res.data?.error) {
        this.setError(res.data?.message || 'oops something went wrong');
        return;
      }
      this.render();
    }).catch((err) => {
      this.setLoading(false);
      this.setError(err.response.data?.message || 'oops something went wrong');
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
        <div class="list">
          ${[...new Array(6)].map((el) => '<card-skeleton></card-skeleton>').join('')}
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

    if (!this.restaurants || this.restaurants?.length === 0) {
      this.innerHTML = `<empty-component text="Searching keyword '${this.query}' not found" ></empty-component>`;
      return;
    }

    this.onlineContent();
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
