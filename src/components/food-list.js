import Apis from '../config/apis';

class FoodList extends HTMLElement {
  connectedCallback() {
    this.getRandomRecipes();
  }

  getRandomRecipes() {
    this.setLoading(true);
    Apis.getRandomRecipes().then((res) => {
      this.setLoading(false);
      this.foods = res.data.recipes;
      this.render();
    }).catch((err) => {
      alert(err?.message || 'Ooops something wrong');
      this.foods = [];
      this.render();
    });
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

    this.innerHTML = '<div class="list"></div>';
    const list = this.querySelector('.list');
    this.foods?.forEach((el) => {
      const food = document.createElement('food-item');
      food.setFood(el);
      list.appendChild(food);
    });
  }
}

customElements.define('food-list', FoodList);
export default FoodList;
