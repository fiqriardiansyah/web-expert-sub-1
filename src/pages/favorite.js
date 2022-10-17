export const FAVORITE_PAGE = 'favorite-page';

class FavoritePage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <skip-to-content></skip-to-content>
            <navigation-bar></navigation-bar>
            <div class="layout">
                <div class="jumbotron" id="jumbotron">
                    <picture>
                        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_3-small.jpg">
                        <img src="./images/heros/hero-image_3.jpg" class="jumbotron-background"
                            alt="jumbotron">
                      </picture>
                    <div class="jumbotron-content">
                        <h1 class="">Favorite Restaurant</h1>
                        <img src="./images/icons/icon-512.png" alt="dev restaurant" class="" />
                    </div>
                    <a class="focusable" href="#main">
                    <i class="fa-solid fa-arrow-down-long mr-1"></i>
                    favorites
                    </a>
                </div>
                <main class="mt-10 mb-10 container" id="main">
                    <h1 class="welcome">welcome to DEV Restaurant</h1>
                    <p class="welcome-desc mb-5">You can save your favorite restaurant for later</p>
                    <favorite-restaurant-list></favorite-restaurant-list>
                </main>
            </div>
            <footer-component></footer-component>
        `;
  }
}

customElements.define(FAVORITE_PAGE, FavoritePage);
export default FavoritePage;
