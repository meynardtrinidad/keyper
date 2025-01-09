import { db } from "../config/db";
import { Callback } from "../types/db";

const getUsernameAndPasswordQuery = `
  SELECT id, username, password FROM users
  WHERE username = ?
`

export const getUsernameAndPassword = (username: string, cb?: Callback) => {
  const stmt = db.prepare(getUsernameAndPasswordQuery)
  stmt.get([username], cb)
}
