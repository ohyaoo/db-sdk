import { CreateDB, Db, DBRequest } from "./@types";

let db: Db;

const createDB: CreateDB = function (name, createStores) {
  return new Promise((resolve, reject) => {
    //   todo 全局变量window声明any
    const request: DBRequest = (window as any).indexedDB.open(name);
    request.onerror = function onerror(event) {
      reject(event.target.errorCode);
    };

    request.onsuccess = function onsuccess(event) {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function onupgradeneeded(event) {
      db = event.target.result;
      Promise.all(createStores.map((fn) => fn()))
        .then(() => {
          resolve(db);
        })
        .catch((error) => {
          reject(error);
        });
    };
  });
};

export { db, createDB as default };
