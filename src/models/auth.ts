import { db } from "../config/db";

const getUsernameAndPasswordQuery = `
  SELECT id, username, password FROM users
  WHERE username = ?
`

export const getUsernameAndPassword = (username: string) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(getUsernameAndPasswordQuery)
    stmt.get([username], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}
