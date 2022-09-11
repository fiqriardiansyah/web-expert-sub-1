import './styles/main.scss';
import './pages';
import './components';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowDownLong, faArrowUpLong, faXmark, faBars,
} from '@fortawesome/free-solid-svg-icons';

import Utils from './utils/index';
import { pages } from './utils/constant';

const renderPage = () => {
  document.body.innerHTML = '';
  window.scrollTo(0, 0);
  const keyPage = Utils.watchUrl();
  const page = pages.find((el) => el.key === keyPage);
  if (page) {
    const docPage = document.createElement(page.page);
    document.body.appendChild(docPage);
    return;
  }
  const indexPage = document.createElement(pages.find((el) => el.key === '').page);
  document.body.appendChild(indexPage);
};

window.addEventListener('DOMContentLoaded', () => {
  // font awesome
  library.add(faArrowDownLong);
  library.add(faArrowUpLong);
  library.add(faXmark);
  library.add(faBars);
  dom.watch();

  renderPage();

  window.addEventListener('hashchange', () => {
    if (pages.find((el) => el.key === Utils.watchUrl())) {
      renderPage();
    }
  });
});
