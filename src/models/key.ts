import { db } from "../config/db";

type Key = {
  identifier: string
  hash: string
}

export type InsertKey = {
  userId: number
} & Key

const getKeyWithIdentifierQuery = `
  SELECT id, user_id, identifier, hash
  FROM keys
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

const getKeyWithUserIdQuery = `
  SELECT id, user_id, identifier, hash
  FROM keys
  WHERE user_id = ?
`

export const getKeyWithUserId = (userId: number) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(getKeyWithUserIdQuery)
    stmt.get([userId], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

const getKeyWithIdentifierOrUserIdQuery = `
  SELECT id, user_id, identifier, hash
  FROM keys
  WHERE user_id = ? OR identifier = ?
`

export const getKeyWithIdentifierOrUserId = (userId: number, identifier: string) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(getKeyWithIdentifierOrUserIdQuery)
    stmt.get([userId, identifier], (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
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

const upsertKeyQuery = `
  INSERT INTO keys (user_id, identifier, hash)
  VALUES ($user_id, $identifier, $hash)
  ON CONFLICT (user_id) DO UPDATE
  SET identifier = $identifier, hash = $hash
`

export const upsertKey = (payload: InsertKey): Promise<Error | number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(upsertKeyQuery)
    stmt.run({
      $user_id: payload.userId,
      $identifier: payload.identifier,
      $hash: payload.hash
    }, function(err: Error | null) {
      if (err) reject(err)
      resolve(this.lastID)
    })
  })
}

const updateKeyQuery = `
  UPDATE keys
  SET identifier = ?, hash = ?
  WHERE user_id = ?
`

export const updateKey = (userId: number, payload: Key): Promise<Error | number> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(updateKeyQuery)
    stmt.run([payload.identifier, payload.hash, userId], function(err: Error | null) {
      if (err) reject(err)
      resolve(this.lastID)
    })
  })
}

const deleteKeyQuery = `
  DELETE FROM keys
  WHERE user_id = ?
`

export const deleteKey = (userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(deleteKeyQuery)
    stmt.run([userId], function(err) {
      if (err) reject(err)
      resolve()
    })
  })
}
