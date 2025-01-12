import { db } from "../config/db";

const getUsernameAndPasswordQuery = `
  SELECT id, username, password FROM users
  WHERE username = ?
`

type User = {
  id: number
  username: string
  password: string
}

export const getUsernameAndPassword = (username: string) => {
  return new Promise<User>((resolve, reject) => {
    const stmt = db.prepare(getUsernameAndPasswordQuery)
    stmt.get([username], (err, row) => {
      if (err) reject(err)
      resolve(row as User)
    })
  })
}
