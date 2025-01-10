import { insertKey } from "../models/key"
import { insertUser } from "../models/users"
import { createKey } from "../services/key"
import { KeyV1 } from "../utils/key"
import bcrypt from "bcrypt"

const USERNAME = "john_doe"
const PASSWORD = "password123"

describe("key", () => {
  describe("generation", () => {
    it("should return an identifier and a secret ", () => {
      const key = new KeyV1({ length: 16 })

      // The following regex is the pattern for the required generated key:
      // v<number>_<alphanumeric>_<alphanumeric>
      const regex = /^v\d+_[A-Za-z0-9]+_[A-Za-z0-9]+$/;

      const [identifier, secret] = key.getKeys()
      expect(identifier).not.toBeUndefined()
      expect(secret).not.toBeUndefined()

      const apiKey = key.toString()
      expect(apiKey).toMatch(regex)
      expect(apiKey).not.toBeUndefined()
    })

    it.skip("should not collide easily", () => {
      const n = 1_000_000
      const set = new Set()

      for (let i = 0; i < n; i++) {
        const key = new KeyV1({ length: 16 })
        set.add(key)
      }

      expect(set.size).toBe(n)
    })
  })

  describe("services", () => {
    beforeAll(async () => {
      await insertUser({
        username: USERNAME,
        password: PASSWORD
      })
    })

    it("should successfully insert to database", async () => {
      const key = await createKey(1)
      console.log("Generated key:", key) // The generated key.
      expect(key).not.toBeUndefined()
      expect(key.length).toBeGreaterThan(0)
    })

    it("should error on same identifier", async () => {
      const length = 16
      const key1 = new KeyV1({ length })
      const key2 = new KeyV1({ length })
      const [identifier, secret1] = key1.getKeys()
      const [_, secret2] = key2.getKeys()

      const hash1 = await bcrypt.hash(secret1, 10)
      const hash2 = await bcrypt.hash(secret2, 10)

      await insertKey({
        userId: 1,
        hash: hash1,
        identifier: identifier
      })

      const redundantInsert = async () => {
        await insertKey({
          userId: 1,
          hash: hash2,
          identifier: identifier
        })
      }

      expect(redundantInsert()).rejects.toThrow()
    })
  })
})
