import {
  FAVORITE, FOODS, HOME, pages,
} from '../utils/constant';
import Utils from '../utils';

class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.class = this.getAttribute('class') || null;
    this.activePage();
    this.render();
    this.whenScroll();
  }

  activePage() {
    const keyPage = Utils.watchUrl().key;
    const page = pages.find((el) => el.key === keyPage);
    if (page) {
      this.activePageKey = page.key;
      return;
    }
    this.activePageKey = ''; // index page
  }

  whenScroll() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      if (scrollTop >= 100) {
        if (!this.classList.contains('scroll-down')) {
          this.classList.add('scroll-down');
        }
        return;
      }
      if (this.classList.contains('scroll-down')) {
        this.classList.remove('scroll-down');
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['class'];
  }

  openAside() {
    this.classList.add('show');
  }

  closeAside() {
    this.classList.remove('show');
  }

  menu() {
    return `
      <ul class="">
          <li class=""><a href="#${HOME}" class="focusable ${this.activePageKey === HOME ? 'active' : ''}">home</a></li>
          <li class=""><a href="#${FAVORITE}" class="focusable ${this.activePageKey === FAVORITE ? 'active' : ''}">favorite</a></li>
          <li class=""><a href="#${FOODS}" class="focusable ${this.activePageKey === FOODS ? 'active' : ''}">foods</a></li>
          <li class=""><a target="_blank" href="https://github.com/fiqriardiansyah" class="focusable">about us</a></li>
      </ul>
    `;
  }

  render() {
    this.innerHTML = `
        <header class="container ${this.class}">
            <nav class="pb-2 pt-2">
                <a href="/" class="restaurant focusable">
                  <img src="./images/icon.png" alt="dev restaurant" class="" />
                  <span class="">DEV Restaurant</span>
                </a>
                ${this.menu()}
                <button class="button-bars">
                  <i id="" class="fa-solid fa-bars"></i>
                </button>
            </nav>
        </header>
        <aside class="${this.class}">
          <div class="content ${this.class}">
            <button class="close">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="logo">
              <img src="/images/icon.png" alt="dev restaurant" class="" />
            </div>
            ${this.menu()}
            <p class="author">made with ❤️ by fiqri ardiansyah</p>
          </div>
        </aside>
        `;

    this.querySelector('.button-bars').addEventListener('click', () => {
      this.openAside();
    });

    this.querySelector('.close').addEventListener('click', () => {
      this.closeAside();
    });
  }
}
customElements.define('navigation-bar', NavigationBar);
export default NavigationBar;
