import { db } from "../config/db";
import { InsertUser } from "../types/user";

const insertUserQuery = `
  INSERT INTO users (username, password)
  VALUES (?, ?)
`

export const insertUser = (payload: InsertUser) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(insertUserQuery)
    stmt.run([payload.username, payload.password], (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}
