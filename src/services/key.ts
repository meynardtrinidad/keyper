import { KeyV1 } from "../utils/key"
import { getKeyWithIdentifier, insertKey } from "../models/key"
import bcrypt from "bcrypt"

const length = 16
const SALT_ROUNDS = 10

/**
 * NOTE: This is a one-time-display key since the key will
 * be hashed.
 *
 * Generate a key which also checks the database to determine
 * if there is an existing API key to prevent conflicts and throws
 * an `Error`, otherwise returns the key that the user
 * will use.
 */
export const createKey = async (userId: number): Promise<string> => {
  const key = new KeyV1({ length: length })

  const [identifier, secret] = key.getKeys()
  const existingKey = await getKeyWithIdentifier(identifier)

  if (existingKey) {
    throw new Error("Key already exists.")
  }

  const hash = await bcrypt.hash(secret, SALT_ROUNDS)
  const err = await insertKey({
    userId: userId,
    identifier: identifier,
    hash: hash
  })

  if (err instanceof Error) {
    throw err
  }

  return key.toString()
}
