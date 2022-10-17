/* eslint-disable consistent-return */
import Utils from '../utils';
import Apis from '../data/apis';
import DetailRestaurant from '../module/detail-restaurant/detail-restaurant';

export const DETAIL_RESTAURANT_PAGE = 'detail-restaurant-page';

class DetailRestaurantPage extends HTMLElement {
  async connectedCallback() {
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
        this.setError({ ...this.error, getDetail: err.response.data?.message || 'oops something went wrong' });
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
      this.setError({ ...this.error, postReview: err.response.data?.message || 'oops something went wrong' });
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
    navigationDetailBar.setHref(window.linkback);
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

  offlineContent() {
    return '<offline-component></offline-component>';
  }

  async render() {
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
        <detail-restaurant-skeleton></detail-restaurant-skeleton>
      `;
      return;
    }

    const isFavorite = await DetailRestaurant.isFavorite({ restaurant: this.restaurant });

    this.innerHTML = `
            <div class="layout">
              <main>
                ${this.isOffline()
    ? this.offlineContent()
    : DetailRestaurant.content({
      restaurant: this.restaurant, loading: this.loading, error: this.error, isFavorite,
    })}
              </main>
            </div>
            <footer-component></footer-component>
          `;

    this.renderNavigationDetailBar();
    this.formReview();
    DetailRestaurant.favoriteHandlerClick({ restaurant: this.restaurant });
  }
}

customElements.define(DETAIL_RESTAURANT_PAGE, DetailRestaurantPage);
export default DetailRestaurantPage;
