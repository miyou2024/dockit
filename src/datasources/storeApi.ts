import { Store } from 'tauri-plugin-store-api';

const store = new Store('.store.dat');

const storeApi = {
  get: async (key: string, defaultValue: unknown) => {
    const val = (await store.get(key)) ?? defaultValue;
    console.log('storeApi.get', { key, defaultValue, val, vals: await store.get(key) });
    return val;
  },

  set: async (key: string, value: unknown) => {
    console.log('storeApi.set', { key, value });
    await store.set(key, value);
    await store.save();
  },
  getSecret: async (key: string, defaultValue: unknown) => {
    const encryptedValue = (await store.get(key)) || defaultValue;
    console.log('storeApi.getSecret', { key, encryptedValue });
    return encryptedValue;
  },
  setSecret: async (key: string, value: unknown) => {
    const encryptedValue = value;
    console.log('storeApi.setSecret', { key, encryptedValue });
    await store.set(key, encryptedValue);
    await store.save();
  },
};

export { storeApi };
