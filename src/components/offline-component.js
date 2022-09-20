class OfflineComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="offline">
        <img src="/svgs/offline.svg" alt="" class="" />
        <h1 class="">Offline</h1>
        <p class="">Ooops! you have no connection</p>
      </div>`;
  }
}

customElements.define('offline-component', OfflineComponent);
