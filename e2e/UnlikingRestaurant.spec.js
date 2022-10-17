Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#favorite');
});

Scenario('Showing empty favorite restaurant', ({ I }) => {
  I.seeElement('empty-component');
});

Scenario('Liking one restaurant and then unliking', async ({ I }) => {
  I.seeElement('empty-component');

  // favorite restaurant
  I.amOnPage('/');
  const firstRestaurant = locate('restaurant-item a').first();
  I.click(firstRestaurant);
  I.seeElement('[aria-label="click to save"]');
  I.click('[aria-label="click to save"]');

  // cancel favorite restaurant
  I.amOnPage('/#favorite');
  I.seeElement('restaurant-item a');
  const favoriteRestaurant = locate('restaurant-item a').first();
  I.click(favoriteRestaurant);
  I.seeElement('[aria-label="click to unsave"]');
  I.click('[aria-label="click to unsave"]');
  I.amOnPage('/#favorite');
  I.waitForVisible('empty-component', 5);
  I.seeElement('empty-component');
});
