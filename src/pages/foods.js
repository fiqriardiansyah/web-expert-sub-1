export const FOODS_PAGE = 'foods-page';

class FoodsPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getRandomRecipes();
  }

  getRandomRecipes() {
    this.foodList.getRandomRecipes();
  }

  getSearchRecipes(value) {
    this.foodList.getSearchRecipes(value);
  }

  injectFormSearch() {
    this.formSearch = document.createElement('form-search');
    this.formSearch.setPlaceholder('Search food');
    this.formSearch.onSubmitHandler((value) => {
      if (!value) {
        this.getRandomRecipes();
        return;
      }
      this.getSearchRecipes(value);
    });
    this.formContainer.append(this.formSearch);
  }

  injectFoods() {
    this.foodList = document.createElement('food-list');
    this.foodsContainer.append(this.foodList);
  }

  render() {
    this.innerHTML = `
              <skip-to-content></skip-to-content>
              <navigation-bar></navigation-bar>
              <div class="layout">
                  <div class="jumbotron" id="jumbotron">
                      <img src="./images/heros/hero-image_2.jpg" alt="jumbotron" class="jumbotron-background" />
                      <div class="jumbotron-content">
                          <h1 class="">DEV Foods</h1>
                          <img src="./images/icon.png" alt="dev restaurant" class="" />
                      </div>
                  </div>
                  <main class="mt-10 mb-10 container" id="main">
                    <div class="flex">
                      <div class="">
                        <h1 class="welcome">Recommended food today</h1>
                        <p class="welcome-desc mb-5">feel a million flavors in your mouth</p>
                      </div>
                      <div class="form-container"></div>
                    </div>
                    <div class="foods-container"></div>
                  </main>
                  <footer-component></footer-component>
              </div>
          `;

    this.formContainer = this.querySelector('.form-container');
    this.foodsContainer = this.querySelector('.foods-container');
    this.injectFoods();
    this.injectFormSearch();
  }
}

customElements.define(FOODS_PAGE, FoodsPage);
export default FoodsPage;
