import { verbose } from "sqlite3";
import path from "path"

const sqlite3 = verbose()

const DB_NAME = process.env.DB_NAME ? `${process.env.DB_NAME}.db` : "test.db"
const DB_URL = path.join(DB_NAME) // Or :memory:

export const db = new sqlite3.Database(DB_URL)
