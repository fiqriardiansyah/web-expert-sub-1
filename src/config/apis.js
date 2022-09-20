import { dicodingClient, spoonacularClient } from './axios';

class Apis {
  static getRandomRecipes() {
    return spoonacularClient.get('/recipes/random?number=20');
  }

  static getListRestaurant() {
    return dicodingClient.get('/list');
  }

  static getDetailRestaurant(id) {
    return dicodingClient.get(`/detail/${id}`);
  }

  static getSearchRestaurant(query) {
    return dicodingClient.get(`/search?q=${query}`);
  }

  static postAddReview(data) {
    return dicodingClient.post('/review', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Apis;
