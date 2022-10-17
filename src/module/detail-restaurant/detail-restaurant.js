import idb from '../../data/idb';

class DetailRestaurant extends HTMLElement {
  static async isFavorite({ restaurant }) {
    if (!restaurant) return false;
    const isFavorite = await idb.getRestaurant(restaurant.id);
    return !!isFavorite;
  }

  static favoriteHandlerClick({ restaurant }) {
    const button = document.querySelector('.btn-favorite');
    button?.addEventListener('click', async () => {
      if (!button.className.includes('true')) {
        await idb.putRestaurant(restaurant);
        button.classList.add('true');
        return;
      }
      await idb.deleteRestaurant(restaurant.id);
      button.classList.remove('true');
    });
  }

  static buttonFavorite(isFavorite) {
    return `
      <button aria-label="${isFavorite ? 'click to unsave' : 'click to save'}" class="btn-favorite ${isFavorite ? 'true' : ''} focusable">
        <i class="fa-solid fa-heart">favorite</i>
      </button>
    `;
  }

  static content({
    restaurant, loading, error, isFavorite,
  }) {
    return `
    <div class="jumbotron" id="jumbotron">
      <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant?.pictureId}" alt="${restaurant?.name}" class="" />
      <div class="">
        <h1 class="">${restaurant?.name}</h1>
        <p class="">${restaurant?.address}, ${restaurant?.city}</p>
      </div>
    </div>
    <div class="content container">

      <div class="restaurant">
        <div class="restaurant-img">
          <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant?.pictureId}" alt="${restaurant?.name}" />
        </div>
        <div class="restaurant-info">
          <div class="flex">
            <div class="restaurant-info-rating">
              ${restaurant?.rating}
            </div>
            ${DetailRestaurant.buttonFavorite(isFavorite)}
          </div>
          <h2 class="restaurant-info-name">
          ${restaurant?.name}
          </h2>
          <p class="restaurant-info-address">
          ${restaurant?.address}, ${restaurant?.city}
          </p>
          <p class="restaurant-info-desc">
          ${restaurant?.description}
          </p>
          <div class="restaurant-info-categories">
            ${restaurant?.categories?.map((el) => `<p class="">${el?.name}</p>`)?.join(' ')}
          </div>
        </div>
      </div>

      <div class="menu-review">
        <div class="menu">
          <h2 class="menu-title">Menus</h2>
          <div class="flex">
            <div class="foods-flex">
              <p class="title">Foods</p>
              ${restaurant?.menus?.foods?.map((el) => `
              <div class="food">
                <i class="fa-solid fa-bowl-food"></i>
                <p class="">${el?.name}</p>
                </div>`).join(' ')}
            </div>
            <div class="drinks-flex">
              <p class="title">Drinks</p>
              ${restaurant?.menus?.drinks?.map((el) => `
              <div class="drink">
                <i class="fa-solid fa-mug-hot"></i>
                <p class="">${el?.name}</p>
                </div>`).join(' ')}
            </div>
          </div>
        </div>
        <div class="review">
          <h2 class="review-title">Reviews</h2>
          ${restaurant?.customerReviews?.map((el) => `
          <div class="review-item">
            <div class="review-item-head">
              <p class="name">${el?.name}</p>
              <p class="date">${el?.date}</p>
            </div>
            <hr />
            <p class="review">
              ${el?.review}
            </p>
          </div>`).join(' ')}

          <div class="form-review">
            <p class="title">Write your own story</p>
            <form>
              <input class="focusable" type="text" name="name" placeholder="Your name" />
              <textarea class="focusable" name="review" placeholder="Your review"></textarea>
              <button class="send" type="button">
                ${loading?.postReview ? '<loading-component></loading-component>' : 'send'}
              </button>
              ${error?.postReview ? `
                <div class="error-message">
                  ${error?.postReview}
                </div>` : ''}
            </form>
          </div>
        </div>
      </div>
    </div>`;
  }
}

export default DetailRestaurant;
