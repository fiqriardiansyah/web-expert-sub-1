import data from '../DATA.json';

class RestaurantList extends HTMLElement {
  connectedCallback() {
    this.restaurants = data.restaurants;
    this.render();
  }

  render() {
    this.restaurants.forEach((el) => {
      const restaurant = document.createElement('restaurant-item');
      restaurant.setRestaurant(el);
      this.appendChild(restaurant);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
export default RestaurantList;
