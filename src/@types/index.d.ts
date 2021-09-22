export interface Transaction {
  db: Db;
  oncomplete: () => void;
  onerror: () => void;
  onabort: () => void;
  objectStore: (name) => Store;
}

export interface Db {
  name: string;
  objectStoreNames: string[];
  createObjectStore: any;
  transaction: (storeNames, mode?, options?) => Transaction;
  [propName: string]: any;
}

export interface Index {
  name: string;
  objectStore: Store;
  keyPath: string | null;
  multiEntry: boolean;
  unique: boolean;
  count: (key?) => Request;
  get: (key?) => Request;
  getAll: (query?, count?) => Request;
  getKey: (key?) => Request;
  getAllKeys: (query?, count?) => Request;
  openCursor: (range?, direction?) => Request;
  openKeyCursor: (range?, direction?) => Request;
}

export interface Request {
  onerror: any;
  onsuccess: any;
  source: any;
}

export interface DBRequest extends Request {
  onblocked: any;
  onupgradeneeded: any;
}

export interface Store {
  add: (value, key?) => Request;
  clear: () => Request;
  count: (key) => Request;
  createIndex: (
    name: string,
    keyPath: string,
    { unique, multiEntry }?
  ) => Index;
  delete: (key) => Request;
  deleteIndex: (indexName) => void;
  get: (key) => Request;
  index: (name) => Index;
  openCursor: (range, direction) => Request;
  put: (value, key) => Request;
  getAll: () => Request;
}

interface CreateDB {
  (name: string, createStores: (() => void)[]): Promise<Db>;
}

export interface CreateStore {
  (
    name: string,
    options: {
      keyPath: string;
      autoIncrement: boolean;
      indexs?: Array<{ indexName: string; indexPath: string }>;
    }
  ): void;
}

export interface CreateTransaction {
  (names: string[], mode?: string): Tx;
}

export interface Exec {
  (key?): Promise<any>;
}

type Option<T> = T | { (arg?: any): T };

export interface GetAll {
  (option: Option<{ storeName: string }>): Tx;
}

// export interface Get<T> {
//   ({ fns, option, tx, result: T }): T;
// }

// export interface Add<T> {
//   ({ fns, option, tx, result: T }): T;
// }

// export interface Delete<T> {
//   ({ fns, option, tx, result: T }): T;
// }

// export interface Put<T> {
//   ({ fns, option, tx, result: T }): T;
// }

// export interface Search<T> {
//   ({ fns, option, tx, result: T }): T;
// }

export interface Tx {
  exec: Exec;
  getAll: GetAll;
  // get: Get<TxResult>;
  // add: Add<TxResult>;
  // delete: Delete<TxResult>;
  // put: Put<TxResult>;
  // search: Search<TxResult>;
}
