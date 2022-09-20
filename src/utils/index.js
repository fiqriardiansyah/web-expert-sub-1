import qstring from 'query-string';
import * as WorkboxWindow from 'workbox-window';

class Utils {
  static cutText(length, string) {
    if (!string) return '-';
    return string?.length > length ? `${string.slice(0, length)}...` : string;
  }

  static imageSafety(image) {
    return image ?? '/images/placeholder.png';
  }

  static isOnline() {
    if (!('navigator' in window)) return false;
    return window.navigator.onLine;
  }

  static watchUrl() {
    const { location } = window;
    const parse = qstring.parse(location.hash);
    const page = Object.keys(parse).map((key) => key)[0];

    if (!page) return { key: '' }; // home page

    const key = page.split('/');
    return {
      key: key[0] || '',
      param: key[1] || '',
    };
  }

  static async registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.log('service worker not found!!');
    }

    const wb = new WorkboxWindow.Workbox('./sw.bundle.js');

    try {
      await wb.register();
      console.log('service worker registered');
    } catch (error) {
      console.log('service worker failed regis', error);
    }
  }
}

export default Utils;
