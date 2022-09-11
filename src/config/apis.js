import client from './axios';

class Apis {
  static getRandomRecipes() {
    return client.get('/recipes/random?number=20');
  }
}

export default Apis;
