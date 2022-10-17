const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#favorite');
});

Scenario('Showing empty favorite restaurant', ({ I }) => {
  I.seeElement('empty-component');
});

Scenario('Liking one restaurant', async ({ I }) => {
  I.seeElement('empty-component');

  I.amOnPage('/');

  const firstRestaurant = locate('restaurant-item a').first();
  const textFirstRestaurant = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);

  I.seeElement('[aria-label="click to save"]');

  I.click('[aria-label="click to save"]');

  I.amOnPage('/#favorite');

  I.seeElement('restaurant-item a');

  const favoriteRestaurant = locate('restaurant-item a').first();
  const textFavoriteRestaurant = await I.grabTextFrom(favoriteRestaurant);

  assert.strictEqual(textFirstRestaurant, textFavoriteRestaurant);
});
