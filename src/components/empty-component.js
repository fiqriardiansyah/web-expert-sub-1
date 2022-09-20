class EmptyComponent extends HTMLElement {
  connectedCallback() {
    this.setText(this.getAttribute('text'));
  }

  setText(text) {
    this.text = text;
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="empty">
                <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="/animations/empty.json"
                    style="width: 320px">
                </lottie-player>
                <p class="">${this.text || ''}</p>
            </div>
        `;
  }
}

customElements.define('empty-component', EmptyComponent);
