import * as DetaiRestaurantFactories from './helpers/detailRestaurantFactories';
import * as Utils from './utils';
import RestaurantIdb from '../src/data/idb';

describe('save favorite restaurant', () => {
  const dummyRestaurant = Utils.restaurant;

  beforeEach(async () => {
    await DetaiRestaurantFactories.createDetailRestaurantPage({
      restaurant: dummyRestaurant,
    });
  });

  afterEach(async () => {
    await RestaurantIdb.deleteRestaurant(dummyRestaurant.id);
  });

  it('should show the save button when the restaurant not favorite', () => {
    expect(document.querySelector('[aria-label="click to save"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant not favorite', () => {
    expect(document.querySelector('[aria-label="click to unsave"]')).toBeFalsy();
  });

  it('should be able to save favorite restaurant', async () => {
    document.querySelector('.btn-favorite').dispatchEvent(new Event('click'));
    expect(await RestaurantIdb.getRestaurant(dummyRestaurant.id)).toEqual(dummyRestaurant);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await RestaurantIdb.putRestaurant(dummyRestaurant);

    document.querySelector('.btn-favorite').dispatchEvent(new Event('click'));
    expect(await RestaurantIdb.getAllRestaurant()).toEqual([dummyRestaurant]);
  });
});
