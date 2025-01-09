import { verbose } from "sqlite3";
import path from "path"
import { rootPath } from "../app";

const sqlite3 = verbose()

const DB_URL = process.env.DB_URL || path.join(rootPath, "..", "./test.db") // Assumes test.db if the app is not running
export const db = new sqlite3.Database(DB_URL)
