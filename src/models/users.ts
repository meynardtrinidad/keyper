import { db } from "../config/db";
import { Callback } from "../types/db";
import { InsertUser } from "../types/user";

const insertUserQuery = `
  INSERT INTO users (username, password)
  VALUES (?, ?)
`

export const insertUser = (payload: InsertUser, cb?: Callback) => {
  const stmt = db.prepare(insertUserQuery)
  stmt.run([payload.username, payload.password], cb)
}
