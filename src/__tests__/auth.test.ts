import { getUsernameAndPassword } from "../models/auth";
import { insertUser } from "../models/users";

const USERNAME = "john_doe"
const PASSWORD = "password123"

describe("auth", () => {
  beforeAll(() => {
    insertUser({
      username: USERNAME,
      password: PASSWORD
    })
  })

  it("should return a row with username and password", (done) => {
    getUsernameAndPassword(USERNAME, (err, row) => {
      if (err) return done(err)
      expect(row).not.toBeUndefined()
      done()
    })
  })

  it("should return an error", (done) => {
    getUsernameAndPassword("some_random_username", (err, row) => {
      expect(row).toBeUndefined()
      done()
    })
  })
})
