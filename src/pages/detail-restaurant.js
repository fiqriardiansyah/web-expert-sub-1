import Utils from '../utils';
import Apis from '../config/apis';

export const DETAIL_RESTAURANT_PAGE = 'detail-restaurant-page';

class DetailRestaurantPage extends HTMLElement {
  connectedCallback() {
    this.idRestaurant = Utils.watchUrl().param;
    this.loading = {
      getDetail: false,
      postReview: false,
    };
    this.error = {
      getDetail: null,
      postReview: null,
    };
    this.getDetailRestaurant();
    this.render();
  }

  isOffline() {
    return (!this.restaurant && !Utils.isOnline());
  }

  getDetailRestaurant() {
    if (this.idRestaurant) {
      this.setLoading({ ...this.loading, getDetail: true });
      this.setError({ ...this.error, getDetail: null });
      Apis.getDetailRestaurant(this.idRestaurant).then((res) => {
        const { data } = res;
        this.restaurant = data?.restaurant;
        this.setLoading({ ...this.loading, getDetail: false });
      }).catch((err) => {
        this.setError({ ...this.error, getDetail: err?.message || 'oops something went wrong' });
        this.setLoading({ ...this.loading, getDetail: false });
      });
      return;
    }
    this.setError({ ...this.error, getDetail: 'could not find id restaurant' });
  }

  postAddReview(dataReview) {
    const addIdData = {
      ...dataReview,
      id: this.idRestaurant.toString(),
    };
    this.setError({ ...this.error, postReview: null });
    this.setLoading({ ...this.loading, postReview: true });
    Apis.postAddReview(addIdData).then((res) => {
      const { data } = res;
      this.restaurant = {
        ...this.restaurant,
        customerReviews: data.customerReviews,
      };
      this.setLoading({ ...this.loading, postReview: false });
    }).catch((err) => {
      this.setError({ ...this.error, postReview: err?.message || 'oops something went wrong' });
      this.setLoading({ ...this.loading, postReview: false });
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

  renderNavigationDetailBar() {
    const navigationDetailBar = document.createElement('navigation-detail-bar');
    navigationDetailBar.setTitle(this.isOffline() ? 'offline' : this.restaurant?.name);
    this?.append(navigationDetailBar);
  }

  formReview() {
    const buttonSend = this.querySelector('button.send');

    buttonSend?.addEventListener('click', () => {
      const name = this.querySelector('input').value;
      const review = this.querySelector('textarea').value;
      if (!name || !review) return;
      this.postAddReview({
        name,
        review,
      });
    });
  }

  favoriteHandlerClick() {
    const button = document.querySelector('.btn-favorite');
    button?.addEventListener('click', () => {

    });
  }

  onlineContent() {
    return `
    <div class="jumbotron" id="jumbotron">
      <img src="https://restaurant-api.dicoding.dev/images/large/${this.restaurant?.pictureId}" alt="${this.restaurant?.name}" class="" />
      <div class="">
        <h1 class="">${this.restaurant?.name}</h1>
        <p class="">${this.restaurant?.address}, ${this.restaurant?.city}</p>
      </div>
    </div>
    <div class="content container">

      <div class="restaurant">
        <div class="restaurant-img">
          <img src="https://restaurant-api.dicoding.dev/images/medium/${this.restaurant?.pictureId}" alt="${this.restaurant?.name}" />
        </div>
        <div class="restaurant-info">
          <div class="flex">
            <div class="restaurant-info-rating">
              ${this.restaurant?.rating}
            </div>
            <button class="btn-favorite focusable">
              <i class="fa-solid fa-heart">favorite</i>
            </button>
          </div>
          <h2 class="restaurant-info-name">
          ${this.restaurant?.name}
          </h2>
          <p class="restaurant-info-address">
          ${this.restaurant?.address}, ${this.restaurant?.city}
          </p>
          <p class="restaurant-info-desc">
          ${this.restaurant?.description}
          </p>
          <div class="restaurant-info-categories">
            ${this.restaurant?.categories?.map((el) => `<p class="">${el?.name}</p>`).join(' ')}
          </div>
        </div>
      </div>

      <div class="menu-review">
        <div class="menu">
          <h2 class="menu-title">Menus</h2>
          <div class="flex">
            <div class="foods-flex">
              <p class="title">Foods</p>
              ${this.restaurant?.menus?.foods?.map((el) => `
              <div class="food">
                <i class="fa-solid fa-bowl-food"></i>
                <p class="">${el?.name}</p>
                </div>`).join(' ')}
            </div>
            <div class="drinks-flex">
              <p class="title">Drinks</p>
              ${this.restaurant?.menus?.drinks?.map((el) => `
              <div class="drink">
                <i class="fa-solid fa-mug-hot"></i>
                <p class="">${el?.name}</p>
                </div>`).join(' ')}
            </div>
          </div>
        </div>
        <div class="review">
          <h2 class="review-title">Reviews</h2>
          ${this.restaurant?.customerReviews?.map((el) => `
          <div class="review-item">
            <div class="review-item-head">
              <p class="name">${el?.name}</p>
              <p class="date">${el?.date}</p>
            </div>
            <hr />
            <p class="review">
              ${el?.review}
            </p>
          </div>`).join(' ')}

          <div class="form-review">
            <p class="title">Write your own story</p>
            <form>
              <input class="focusable" type="text" name="name" placeholder="Your name" />
              <textarea class="focusable" name="review" placeholder="Your review"></textarea>
              <button class="send" type="button">
                ${this.loading.postReview ? '<loading-component></loading-component>' : 'send'}
              </button>
              ${this.error.postReview ? `
                <div class="error-message">
                  ${this.error?.postReview}
                </div>` : ''}
            </form>
          </div>
        </div>
      </div>
    </div>`;
  }

  offlineContent() {
    return '<offline-component></offline-component>';
  }

  render() {
    if (this.error?.getDetail) {
      this.innerHTML = `
        <div class="error-message">
          ${this.error?.getDetail}
        </div>
      `;
      return;
    }

    if (this.loading?.getDetail) {
      this.innerHTML = `
        <div class="loading-container">
            <loading-component size="100"></loading-component>
            <p class="">Getting restaurant...</p>
        </div>
      `;
      return;
    }

    this.innerHTML = `
            <div class="layout">
              <main>
                ${this.isOffline() ? this.offlineContent() : this.onlineContent()}
              </main>
            </div>
            <footer-component></footer-component>
          `;

    this.renderNavigationDetailBar();
    this.formReview();
    this.favoriteHandlerClick();
  }
}

customElements.define(DETAIL_RESTAURANT_PAGE, DetailRestaurantPage);
export default DetailRestaurantPage;
