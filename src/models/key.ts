import { db } from "../config/db";

export type InsertKey = {
  userId: number
  identifier: string
  hash: string
}

const insertKeyQuery = `
  INSERT INTO keys (user_id, identifier, hash)
  VALUES (?, ?, ?)
`

export const insertKey = (payload: InsertKey) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(insertKeyQuery)
    stmt.run([payload.userId, payload.identifier, payload.hash], (err) => {
      if (err) reject(err)
      resolve(true)
    })
  })
}

const getKeyWithIdentifierQuery = `
  SELECT (identifier, hash) FROM keys
  WHERE identifier = ?
`

export const getKeyWithIdentifier = (identifier: string) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(getKeyWithIdentifierQuery)
    stmt.get([identifier], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}
