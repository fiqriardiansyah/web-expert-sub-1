class ModalComponent extends HTMLElement {
  connectedCallback() {
    this.setAttribute('tabindex', 0);
    this.classList.add('focusable');
    this.show = false;
  }

  setContent(content, title) {
    this.title = title;
    this.content = content;
  }

  showModal() {
    this.show = true;
    this.classList.add('show');
    this.render();
  }

  closeModal() {
    this.show = false;
    this.classList.remove('show');
    this.render();

    if (window.fooditem) {
      window.fooditem.focus();
    }

    if (window.restaurantitem) {
      window.restaurantitem.focus();
    }
  }

  render() {
    this.innerHTML = `
        <div class="backdrop ${this.show ? 'show' : ''}">
            <div class="modal ${this.show ? 'show' : ''}">
                <div class="modal-header">
                    <p class="">${this.title}</p>
                    <button class="close focusable">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="modal-content">
                  ${this.content}
                </div>
            </div>
        </div>
        `;

    const buttonClose = this.querySelector('.close');

    buttonClose.addEventListener('click', () => {
      this.closeModal();
    });

    buttonClose.focus();
  }
}

customElements.define('modal-component', ModalComponent);
export default ModalComponent;
