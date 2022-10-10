import Utils from '../../utils';

class FoodItem extends HTMLElement {
  setFood(food) {
    this.food = food;
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
    window.fooditem = this.querySelector('.food-item'); // save this element for autofocus after modal close later

    const detail = document.createElement('food-detail');
    detail.setFood(this.food);

    this.modal.setContent(detail.outerHTML, this.food?.title);
    this.modal.showModal();
  }

  render() {
    this.innerHTML = `
        <button class="food-item focusable">
          <img class="food-image lazyload" data-src="${this.food?.image}" alt="${this.food?.title}" onerror="this.onerror=null;this.src='/images/placeholder.png'" />
          <div class="content">
              <span class="content-score">
                ${this.food?.healthScore || 0}
              </span>
              <span class="content-score-desc">healt score</span>
              <p class="content-name">${this.food?.title}</p>
              <p class="content-description mb-2">${Utils.cutText(200, this.food?.creditsText || '')}</p>
              <div class="content-dish-container">
                ${this.food?.dishTypes?.map((el) => `<span class="content-dish">${el}</span>`).join('')}
              </div>
          </div>
        </button>
    `;

    this.querySelector('.food-item').addEventListener('click', () => {
      this.showDetail();
    });
  }
}

customElements.define('food-item', FoodItem);
export default FoodItem;
