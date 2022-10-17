Feature('Search Foods');

Scenario('Showing input search component', async ({ I }) => {
  I.amOnPage('/#foods');
  I.seeElement('form-search');
});

Scenario('Search food and get result', async ({ I }) => {
  const query = 'pizza';

  I.amOnPage('/#foods');
  I.seeElement('form-search');
  I.fillField('form-search input', query);
  I.click('form-search button');
  I.wait(3);
  I.see(query, 'food-item');
});
