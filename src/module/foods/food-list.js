import Apis from '../../data/apis';
import Utils from '../../utils';

class FoodList extends HTMLElement {
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
      this.setLoading(false);
      this.setError(err?.message || 'oops something went wrong');
    });
  }

  getSearchRecipes(query) {
    this.query = query;
    this.setLoading(true);
    this.setError(null);
    Apis.getSearchRecipes(query).then((res) => {
      this.setLoading(false);
      this.foods = res.data?.results;
      this.render();
    }).catch((err) => {
      this.setLoading(false);
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
        <div class="list">
          ${[...new Array(6)].map((el) => '<card-skeleton></card-skeleton>').join('')}
        </div>
      `;
      return;
    }

    if (this.isOffline()) {
      this.offlineContent();
      return;
    }

    if (!this.foods || this.foods?.length === 0) {
      this.innerHTML = `<empty-component text="Searching keyword '${this.query}' not found" ></empty-component>`;
      return;
    }

    this.onlineContent();
  }
}

customElements.define('food-list', FoodList);
export default FoodList;
