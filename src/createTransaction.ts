import { CreateTransaction, Exec, GetAll, Transaction } from "./@types";
import { db } from "./createDB";

let tx: Transaction;

const fns: Array<any> = [];

const exec: Exec = function (key) {
  return new Promise((resolve, reject) => {
    let _res;
    tx.oncomplete = function oncomplete() {
      resolve(_res);
    };
    tx.onerror = function onerror() {
      reject();
    };
    tx.onabort = function onabort() {
      reject();
    };
    // 递归执行fns
    function reduce(res?: any) {
      if (fns.length === 0) {
        return;
      }
      const fn = fns.shift();
      const request = (fn as any)(res);
      if (request.source instanceof IDBIndex) {
        _res = [];
      }
      request.onsuccess = function onsuccess(event) {
        if (request.source instanceof IDBIndex) {
          const cursor = event.target.result;
          if (cursor) {
            const { value } = cursor;
            if (key) {
              value[key] = cursor.primaryKey;
            }
            _res.push(value);
            cursor.continue();
          } else {
            reduce(_res);
          }
          return;
        }
        _res = event.target.result;
        reduce(_res);
      };
      request.onerror = function onerror() {
        console.log("error");
      };
    }
    reduce();
  });
};

const getAll: GetAll = function (option) {
  fns.push((res?: any) => {
    if (typeof option === "function") {
      option = option(res);
    }
    return tx.objectStore(option.storeName).getAll();
  });
  return result;
};

const result = {
  exec,
  getAll,
};

const createTransaction: CreateTransaction = function (names, mode) {
  tx = db.transaction(names, mode);
  return result;
};

export default createTransaction;
