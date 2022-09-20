import { INDEX_PAGE } from '../pages/home';
import { FOODS_PAGE } from '../pages/foods';
import { FAVORITE_PAGE } from '../pages/favorite';
import { DETAIL_RESTAURANT_PAGE } from '../pages/detail-restaurant';

export const HOME = '';
export const FOODS = 'foods';
export const FAVORITE = 'favorite';
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
    page: FAVORITE_PAGE,
  },
  {
    key: RESTAURANT,
    page: DETAIL_RESTAURANT_PAGE,
  },
];
