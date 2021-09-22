import { createDB, db, createStore, createTransaction } from "../../src/index";
import setup from "../setup";

let page;

beforeAll(() => {
  return setup().then((result) => {
    page = result;
  });
});

xdescribe("创建数据库", () => {
  test("createDB", async () => {
    const result = await page.evaluate((createDB) => {
      return createDB("test-db", []);
    }, createDB);
    expect(result).toEqual(db);
  });

  xtest("createDB + createStore", async () => {
    // await page.evaluate(() => {
    //   const store = () => {
    //     createStore("TS", {
    //       keyPath: "id",
    //       autoIncrement: true,
    //       indexs: [{ indexName: "searchId", indexPath: "searchId" }],
    //     });
    //   };
    //   return createDB("DB", [store]);
    // });
    // const store = () => {
    //   createStore("TS", {
    //     keyPath: "id",
    //     autoIncrement: true,
    //     indexs: [{ indexName: "searchId", indexPath: "searchId" }],
    //   });
    // };
    // return createDB("DB", [store]);
  });
});

xdescribe("创建对象库", () => {
  test("createStore", () => {
    expect(
      createStore("test-store", {
        keyPath: "id",
        autoIncrement: true,
        indexs: [{ indexName: "searchId", indexPath: "searchId" }],
      })
    );
    console.log(db);
  });
});

xdescribe("事务集合", () => {
  // beforeAll(() => {
  //   createStore("test-store1", {
  //     keyPath: "id",
  //     autoIncrement: true,
  //     // indexs: [{ indexName: "searchId", indexPath: "searchId" }],
  //   });
  //   console.log(db);
  // });
  test("getAll", () => {
    return createTransaction(["TS", "test-store"])
      .getAll({
        storeName: "test-store1",
      })
      .exec()
      .then((result) => {
        expect(result).toBeNull();
      });
  });
});

// describe("创建事务", () => {
//   test("createTransaction", () => {
//     expect(createTransaction());
//   });
// });
