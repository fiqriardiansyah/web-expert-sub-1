import Utils from '../utils';

class RestaurantItem extends HTMLElement {
  setRestaurant(restaurant) {
    this.restaurant = restaurant;
    this.render();
    this.injectModal();
  }

  injectModal() {
    if (!document.querySelector('.modal-container')) {
      this.modalContainer = document.createElement('div');
      this.modalContainer.classList.add('modal-container');
      document.body.appendChild(this.modalContainer);
      this.modal = document.createElement('modal-component');
      this.modalContainer.appendChild(this.modal);
    } else {
      this.modalContainer = document.querySelector('.modal-container');
      this.modal = document.createElement('modal-component');
      this.modalContainer.appendChild(this.modal);
    }
  }

  showDetail() {
    window.restaurantitem = this.querySelector('.restaurant-item'); // save this element for autofocus after modal close later

    const detail = document.createElement('restaurant-detail');
    detail.setRestaurant(this.restaurant);

    this.modal.setContent(detail.outerHTML, this.restaurant.name);
    this.modal.showModal();
  }

  render() {
    this.innerHTML = `
        <button class="restaurant-item focusable">
          <img class="restaurant-image" src="${this.restaurant.pictureId}" alt="${this.restaurant.name}" onerror="this.onerror=null;this.src='/images/placeholder.png'"/>
          <div class="content">
              <span class="content-rating">${this.restaurant.rating}</span>
              <p class="content-name">${this.restaurant.name}</p>
              <p class="content-description mb-2">${Utils.cutText(200, this.restaurant.description)}</p>
              <span class="content-city">${this.restaurant.city}</span>
          </div>
        </button>
    `;

    this.querySelector('.restaurant-item').addEventListener('click', () => {
      this.showDetail();
    });
  }
}

customElements.define('restaurant-item', RestaurantItem);
export default RestaurantItem;
