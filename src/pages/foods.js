class FoodsPage extends HTMLElement {
  connectedCallback() {
    this.render();
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
                    <h1 class="welcome">Recommended food today</h1>
                    <p class="welcome-desc mb-5">feel a million flavors in your mouth</p>
                    <food-list></food-list>
                  </main>
                  <footer-component></footer-component>
              </div>
          `;
  }
}

customElements.define('foods-page', FoodsPage);
export default FoodsPage;
