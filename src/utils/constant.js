import { INDEX_PAGE } from '../pages/home';
import { FOODS_PAGE } from '../pages/foods';
import { DETAIL_RESTAURANT_PAGE } from '../pages/detail-restaurant';

export const HOME = '';
export const FOODS = 'foods';
export const FAVORITE = 'favorite';
export const FOOD = 'food';
export const RESTAURANT = 'restaurant';

export const pages = [
  {
    key: HOME,
    page: INDEX_PAGE,
  },
  {
    key: FOODS,
    page: FOODS_PAGE,
  },
  {
    key: FAVORITE,
    page: 'favorite-page',
  },
  {
    key: FOOD,
    page: 'food-detail-page',
  },
  {
    key: RESTAURANT,
    page: DETAIL_RESTAURANT_PAGE,
  },
];
