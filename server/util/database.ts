import * as mysql from "./../../core/mysql/mod.ts";
import { fs } from "./../../deps.ts";
const { Client } = mysql;
const { readJsonSync } = fs;

// const config = {
//   hostname: "127.0.0.1",
//   username: "root",
//   password: "",
//   timeout: 10000,
//   pool: 3,
//   debug: true,
// };


export interface TypeDatabaseOpts {
  hostname: string,
  username: string,
  password: string,
  database?: string;
  timeout?: number;
  pool?: number;
  debug?: boolean;
}

export class Database {
  private _opts: TypeDatabaseOpts;
  constructor(opts: TypeDatabaseOpts) {
    this._opts = opts;
  }

  public userDatabase(db: string) {
    this._opts.database = db;
  }

  public async clientExec(execStr: string, args: string|number[]) {
    const client = await new Client().connect(this._opts);
    const result = await client.execute(execStr, args as any[]);
    await client.close();
    return result;
  }

  public async clientExecList (sqlList: string[]) {
    const client = await new Client().connect(this._opts);
    const resultList: any[] = [];
    for (let i = 0; i < sqlList.length; i++) {
      const execStr = sqlList[i];
      const rs = await client.execute(execStr);
      resultList.push(rs);
    }
    await client.close();
    return resultList;
  }
}