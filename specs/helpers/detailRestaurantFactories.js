import DetailRestaurantPage from '../../src/module/detail-restaurant/detail-restaurant';

export const createDetailRestaurantPage = async ({ restaurant, loading, error }) => {
  const isFavorite = await DetailRestaurantPage.isFavorite({ restaurant });
  document.body.innerHTML = DetailRestaurantPage.content({
    restaurant, loading, error, isFavorite,
  });
  DetailRestaurantPage.favoriteHandlerClick({ restaurant });
};
