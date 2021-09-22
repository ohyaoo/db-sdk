import { CreateStore, Store } from "./@types";
import { db } from "./createDB";

// 创建一个对象库
const createStore: CreateStore = function (
  name,
  { keyPath, autoIncrement, indexs = [] }
) {
  const store: Store = db.createObjectStore(name, { keyPath, autoIncrement });
  indexs.map(({ indexName, indexPath }) =>
    store.createIndex(indexName, indexPath)
  );
};

export default createStore;
