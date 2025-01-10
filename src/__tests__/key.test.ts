import { KeyV1 } from "../utils/key"

describe("key", () => {
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
