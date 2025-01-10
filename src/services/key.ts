import { KeyV1 } from "../utils/key"
import { db } from "../config/db"
import { getKeyWithIdentifier } from "../models/key"
import bcrypt from "bcrypt"

const length = 16

/**
 * Generate a key which also checks the database to determine
 * if there is an existing API key to prevent conflicts and returns
 * an `undefined` otherwise returns an instance of `KeyV1`
 */
export const createKey = async (): Promise<KeyV1 | undefined> => {
  const key = new KeyV1({ length: length })

  const [identifier] = key.getKeys()
  const existingKey = await getKeyWithIdentifier(identifier)

  if (existingKey) {
    return
  }

  return key
}
