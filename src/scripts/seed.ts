import { db } from "../config/db";

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`

const createKeysTableQuery = `
  CREATE TABLE IF NOT EXISTS keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    identifier TEXT NOT NULL UNIQUE,
    hash TEXT NOT NULL UNIQUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )
`

export const seed = () => {
  db.serialize(() => {
    console.log("Seeding database...")

    db.run(createUsersTableQuery)
    db.run(createKeysTableQuery)
  })

  db.close()
}

seed()
