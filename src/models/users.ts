import { db } from "../config/db";

const insertUserQuery = `
  INSERT INTO users (username, password)
  VALUES (?, ?)
`

export type InsertUser = {
  username: string
  password: string
}

export const insertUser = (payload: InsertUser) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(insertUserQuery)
    stmt.run([payload.username, payload.password], (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}
