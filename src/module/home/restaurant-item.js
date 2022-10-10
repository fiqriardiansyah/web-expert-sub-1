import Utils from '../../utils';
import { RESTAURANT, pages } from '../../utils/constant';

class RestaurantItem extends HTMLElement {
  setRestaurant(restaurant) {
    this.restaurant = restaurant;
    this.render();
  }

  clickHandler() {
    this.addEventListener('click', () => {
      window.linkback = pages.find((el) => el.key === Utils.watchUrl().key).key || '';
    });
  }

  render() {
    this.innerHTML = `
        <a href="#${RESTAURANT}/${this.restaurant?.id}" class="restaurant-item focusable">
          <img class="restaurant-image lazyload" data-src="https://restaurant-api.dicoding.dev/images/small/${this.restaurant?.pictureId}" alt="${this.restaurant?.name}" onerror="this.onerror=null;this.src='/images/placeholder.png'"/>
          <div class="content">
              <span class="content-rating">${this.restaurant?.rating}</span>
              <p class="content-name">${this.restaurant?.name}</p>
              <p class="content-description mb-2">${Utils.cutText(200, this.restaurant?.description)}</p>
              <span class="content-city">${this.restaurant?.city}</span>
          </div>
        </a>
    `;
    this.clickHandler();
  }
}

customElements.define('restaurant-item', RestaurantItem);
export default RestaurantItem;
