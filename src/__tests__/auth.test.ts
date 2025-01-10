import { getUsernameAndPassword } from "../models/auth";
import { insertUser } from "../models/users";

const USERNAME = "john_doe"
const PASSWORD = "password123"

describe("auth", () => {
  beforeAll(async () => {
    await insertUser({
      username: USERNAME,
      password: PASSWORD
    })
  })

  it("should return a row with username and password", async () => {
    const user = await getUsernameAndPassword(USERNAME)
    expect(user).not.toBeUndefined()
  })

  it("should return an error", async () => {
    const user = await getUsernameAndPassword("some_random_username")
    expect(user).toBeUndefined()
  })
})
