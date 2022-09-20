import { openDB } from 'idb';

class Idb {
  constructor() {
    this.db = openDB(process.env.DATABASE_NAME, process.env.DATABASE_VERSION, {
      upgrade: (database) => {
        database.createObjectStore(process.env.OBJECT_STORE_NAME, { keyPath: 'id' });
      },
    });
  }

  async getAllRestaurant() {
    return (await this.db).getAll(process.env.OBJECT_STORE_NAME);
  }

  async getRestaurant(id) {
    return (await this.db).get(process.env.OBJECT_STORE_NAME, id);
  }

  async putRestaurant(restaurant) {
    return (await this.db).put(process.env.OBJECT_STORE_NAME, restaurant);
  }

  async deleteRestaurant(id) {
    return (await this.db).delete(process.env.OBJECT_STORE_NAME, id);
  }
}

const idb = new Idb();
export default idb;
