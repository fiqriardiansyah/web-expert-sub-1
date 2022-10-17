import * as DetaiRestaurantFactories from './helpers/detailRestaurantFactories';
import * as Utils from './utils';
import RestaurantIdb from '../src/data/idb';

describe('unsave favorite restaurant', () => {
  const dummyRestaurant = Utils.restaurant;

  beforeEach(async () => {
    await RestaurantIdb.putRestaurant(dummyRestaurant);
    await DetaiRestaurantFactories.createDetailRestaurantPage({
      restaurant: dummyRestaurant,
    });
  });

  afterEach(async () => {
    await RestaurantIdb.deleteRestaurant(dummyRestaurant.id);
  });

  it('should show unsave button when restaurant is already favorite', async () => {
    expect(document.querySelector('[aria-label="click to unsave"]')).toBeTruthy();
  });

  it('should not show the save button when the restaurant is already favorite', () => {
    expect(document.querySelector('[aria-label="click to save"]')).toBeFalsy();
  });

  it('should be able to remove favorite restaurant', async () => {
    document.querySelector('[aria-label="click to unsave"]').dispatchEvent(new Event('click'));
    expect(await RestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unsave restaurant is not in the list', async () => {
    await RestaurantIdb.deleteRestaurant(dummyRestaurant.id);
    document.querySelector('[aria-label="click to unsave"]').dispatchEvent(new Event('click'));

    expect(await RestaurantIdb.getAllRestaurant()).toEqual([]);
  });
});
