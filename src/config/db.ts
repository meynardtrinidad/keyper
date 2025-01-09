import { verbose } from "sqlite3";
const sqlite3 = verbose()

const DB_URL = process.env.DB_URL || ":memory:"
export const db = new sqlite3.Database(DB_URL)
