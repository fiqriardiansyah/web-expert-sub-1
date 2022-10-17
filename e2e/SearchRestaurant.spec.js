Feature('Search Restaurant');

Scenario('Showing input search component', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('form-search');
});

Scenario('Search restaurant and get result', async ({ I }) => {
  const restaurant1 = 'Kafe';
  const restaurant2 = 'Melting';

  I.amOnPage('/');
  I.seeElement('form-search');
  I.see(restaurant1, 'restaurant-item a');
  I.see(restaurant2, 'restaurant-item a');
  //   start search for restaurant1;
  I.fillField('form-search input', restaurant1);
  I.click('form-search button');
  I.wait(3);
  I.see(restaurant1, 'restaurant-item a');
  I.dontSee(restaurant2, 'restaurant-item a');
});
