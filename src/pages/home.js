export const INDEX_PAGE = 'index-page';

class IndexPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <skip-to-content></skip-to-content>
          <navigation-bar></navigation-bar>
          <div class="layout">
            <div class="jumbotron" id="jumbotron">
                <img src="./images/heros/hero-image_1.jpg" alt="jumbotron" class="jumbotron-background" />
                <div class="jumbotron-content">
                    <h1 class="">DEV Restaurant</h1>
                    <img src="./images/icon.png" alt="dev restaurant" class="" />
                </div>
                <a class="focusable" href="#main">
                  <i class="fa-solid fa-arrow-down-long mr-1"></i>
                  restaurants
                </a>
            </div>
            <main class="mt-10 mb-10 container" id="main">
              <h1 class="welcome">welcome to DEV Restaurant</h1>
              <p class="welcome-desc mb-5">home of good restaurants</p>
              <restaurant-list></restaurant-list>
            </main>
          </div>
          <footer-component></footer-component>
        `;
  }
}

customElements.define(INDEX_PAGE, IndexPage);
export default IndexPage;
