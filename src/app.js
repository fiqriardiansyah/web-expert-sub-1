import './styles/main.scss';
import './pages';
import './module';
import './components';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '@lottiefiles/lottie-player';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowDownLong, faArrowUpLong, faArrowLeftLong, faXmark, faBars,
  faBowlFood, faMugHot, faHeart, faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import Utils from './utils/index';
import { pages } from './utils/constant';

const renderPage = () => {
  document.body.innerHTML = '';
  window.scrollTo(0, 0);
  const keyPage = Utils.watchUrl().key;
  const page = pages.find((el) => el.key === keyPage);
  if (page) {
    const docPage = document.createElement(page.page);
    document.body.appendChild(docPage);
    return;
  }
  const indexPage = document.createElement(pages.find((el) => el.key === '').page);
  document.body.appendChild(indexPage);
};

window.addEventListener('load', () => {
  Utils.registerServiceWorker();
});

window.addEventListener('online', () => {
  window.location.reload();
});

window.addEventListener('DOMContentLoaded', () => {
  // font awesome
  library.add(faArrowDownLong);
  library.add(faArrowUpLong);
  library.add(faArrowLeftLong);
  library.add(faXmark);
  library.add(faBars);
  library.add(faMugHot);
  library.add(faBowlFood);
  library.add(faHeart);
  library.add(faMagnifyingGlass);
  dom.watch();

  renderPage();

  window.addEventListener('hashchange', () => {
    if (pages.find((el) => el.key === Utils.watchUrl().key)) {
      renderPage();
    }
  });
});
