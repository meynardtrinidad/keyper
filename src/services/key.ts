import { KeyV1 } from "../utils/key"
import { getKeyWithIdentifier, upsertKey } from "../models/key"
import { KEY_LENGTH, SALT_ROUNDS } from "../config/constants"
import bcrypt from "bcrypt"
import { cache } from "../config/cache"

/**
 * NOTE: This is a one-time-display key
 * since the secret will be hashed.
 *
 * Generate a key which also checks the database to determine
 * if there is an existing API key to prevent conflicts and throws
 * an `Error`, otherwise returns the key that the user
 * will use.
 */
export const createKey = async (userId: number): Promise<string> => {
  const key = new KeyV1({ length: KEY_LENGTH })

  const [identifier, secret] = key.getKeys()
  const existingKey = await getKeyWithIdentifier(identifier)

  if (existingKey) {
    throw new Error("Key already exists.")
  }

  const hash = await bcrypt.hash(secret, SALT_ROUNDS)
  const err = await upsertKey({
    userId: userId,
    identifier: identifier,
    hash: hash
  })

  if (err instanceof Error) {
    throw err
  }

  cache.set(identifier, hash)

  return key.toString()
}
