import { db } from "../config/db";

const insertUserQuery = `
  INSERT INTO users (username, password)
  VALUES (?, ?)
`

export type InsertUser = {
  username: string
  password: string
}

export const insertUser = (payload: InsertUser): Promise<Error | number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(insertUserQuery)
    stmt.run([payload.username, payload.password], function(err) {
      if (err) reject(err)
      resolve(this.lastID)
    })
  })
}
