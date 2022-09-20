import Apis from '../../config/apis';
import Utils from '../../utils';

class FoodList extends HTMLElement {
  connectedCallback() {
    this.getRandomRecipes();
  }

  isOffline() {
    return (!this.foods && !Utils.isOnline());
  }

  getRandomRecipes() {
    this.setLoading(true);
    this.setError(null);
    Apis.getRandomRecipes().then((res) => {
      this.setLoading(false);
      this.foods = res.data?.recipes;
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
    this.foods?.forEach((el) => {
      const food = document.createElement('food-item');
      food.setFood(el);
      list.appendChild(food);
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

    if (this.isOffline()) {
      this.offlineContent();
      return;
    }

    this.onlineContent();
  }
}

customElements.define('food-list', FoodList);
export default FoodList;
