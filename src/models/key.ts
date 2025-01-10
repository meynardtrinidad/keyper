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

export const insertKey = (payload: InsertKey): Promise<Error | number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(insertKeyQuery)
    stmt.run([payload.userId, payload.identifier, payload.hash], function(err: Error | null) {
      if (err) reject(err)
      resolve(this.lastID)
    })
  })
}

const getKeyWithIdentifierQuery = `
  SELECT hash FROM keys
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
