class FoodDetail extends HTMLElement {
  setFood(food) {
    this.food = food;
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="image">
          <img data-src="${this.food?.image}" alt="${this.food?.title}" class="lazyload" onerror="this.onerror=null;this.src='/images/placeholder.png'" />
          </div>
          <div class="content">
            <span class="score">healt score: ${this.food?.healthScore}</span>
            <h1 class="name">${this.food?.title}</h1>
            <div class="desc">${this.food?.summary}</div>
            <div class="dish-container">
            ${this.food?.dishTypes?.map((el) => `<span class="dish">${el}</span>`).join('')}
            </div>
          </div>
          `;
  }
}

customElements.define('food-detail', FoodDetail);
export default FoodDetail;
