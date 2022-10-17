import { openDB } from 'idb';

const databaseTest = 'dev-restaurant-db-test';
const databaseVersionTest = 1;
const objectStoreTest = 'restaurant-test';
class Idb {
  constructor({ name, version, store }) {
    this.name = name;
    this.version = version;
    this.store = store;

    this.db = openDB(name, version, {
      upgrade: (database) => {
        database.createObjectStore(store, { keyPath: 'id' });
      },
    });
  }

  async getAllRestaurant() {
    return (await this.db).getAll(this.store);
  }

  async getRestaurant(id) {
    return (await this.db).get(this.store, id);
  }

  async putRestaurant(restaurant) {
    if (!restaurant?.id) return null;
    return (await this.db).put(this.store, restaurant);
  }

  async deleteRestaurant(id) {
    return (await this.db).delete(this.store, id);
  }
}

const idb = new Idb(typeof process !== 'undefined'
  ? { name: process.env.DATABASE_NAME, version: process.env.DATABASE_VERSION, store: process.env.OBJECT_STORE_NAME }
  : { name: databaseTest, version: databaseVersionTest, store: objectStoreTest });
export default idb;
