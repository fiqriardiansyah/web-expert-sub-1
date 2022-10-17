Feature('Review Restaurant');

Scenario('Write and send restaurant review', async ({ I }) => {
  const position = 3;
  const testName = 'Test CodeceptJS';
  const testReview = 'End-To-End test using CodeceptJS is frickin awesome!';

  I.amOnPage('/');
  const firstRestaurant = locate('restaurant-item a').at(position);
  I.click(firstRestaurant);
  I.seeElement('input[name="name"]');
  I.seeElement('textarea[name="review"]');
  I.fillField('input[name="name"]', testName);
  I.fillField('textarea[name="review"]', testReview);
  I.click('button.send');
  I.waitForResponse('https://restaurant-api.dicoding.dev/review');
  I.waitForText(testName, 3);
  I.waitForText(testReview, 3);
  I.see(testName, '.review-item');
  I.see(testReview, '.review-item');
});
