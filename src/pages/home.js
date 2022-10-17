export const INDEX_PAGE = 'index-page';

class IndexPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getAllRestaurant();
  }

  getSearchRestaurant(value) {
    this.restaurantList.getSearchRestaurant(value);
  }

  getAllRestaurant() {
    this.restaurantList.getListRestaurant();
  }

  injectFormSearch() {
    this.formSearch = document.createElement('form-search');
    this.formSearch.setPlaceholder('Search restaurant');
    this.formSearch.onSubmitHandler((value) => {
      if (!value) {
        this.getAllRestaurant();
        return;
      }
      this.getSearchRestaurant(value);
    });
    this.formContainer.append(this.formSearch);
  }

  injectRestaurants() {
    this.restaurantList = document.createElement('restaurant-list');
    this.restaurantsContainer.append(this.restaurantList);
  }

  render() {
    this.innerHTML = `
          <skip-to-content></skip-to-content>
          <navigation-bar></navigation-bar>
          <div class="layout">
            <div class="jumbotron" id="jumbotron">
                <picture class="jumbotron-background">
                  <source media="(max-width: 600px)" srcset="./images/heros/hero-image_1-small.jpg">
                  <img src="./images/heros/hero-image_1.jpg" class="jumbotron-background"
                      alt="jumbotron">
                </picture>
                <div class="jumbotron-content">
                    <h1 class="">DEV Restaurant</h1>
                    <img src="./images/icons/icon-512.png" alt="dev restaurant" class="" />
                </div>
                <a class="focusable" href="#main">
                  <i class="fa-solid fa-arrow-down-long mr-1"></i>
                  restaurants
                </a>
            </div>
            <main class="mt-10 mb-10 container" id="main">
              <div class="flex">
                <div class="">
                  <h1 class="welcome">welcome to DEV Restaurant</h1>
                  <p class="welcome-desc mb-5">home of good restaurants</p>
                </div>
                <div class="form-container"></div>
              </div>
              <div class="restaurants-container"></div>
            </main>
          </div>
          <footer-component></footer-component>
        `;

    this.formContainer = this.querySelector('.form-container');
    this.restaurantsContainer = this.querySelector('.restaurants-container');
    this.injectRestaurants();
    this.injectFormSearch();
  }
}

customElements.define(INDEX_PAGE, IndexPage);
export default IndexPage;
