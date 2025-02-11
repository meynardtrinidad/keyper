import jwt from "jsonwebtoken"
import request from "supertest"
import { fastify } from "../app";
import { getUsernameAndPassword } from "../models/auth";
import { JWT_SECRET } from "../config/constants";
import rootRouter from "../routes";
import { createUser } from "../services/auth";

// TODO:
// - Removal of the previous `test.db`

const USERNAME = "john_doe"
const PASSWORD = "password123"

fastify.register(rootRouter, { prefix: "/api/v1" })

afterAll(async () => {
  await fastify.close()
})

beforeAll(async () => {
  await fastify.ready()
})

describe("auth methods", () => {
  beforeAll(async () => {
    try {
      await createUser({
        username: USERNAME,
        password: PASSWORD
      })
    } catch (_) {
      // Do nothing...
    }
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

describe("auth flow", () => {
  let token: string

  beforeAll(() => {
    token = jwt.sign({ userId: 1 }, JWT_SECRET)
  })

  it("should pong", async () => {
    const response = await request(fastify.server)
      .get("/api/v1/ping")
      .expect(200)

    expect(response.body.message).toBe("pong")
  })

  it("should return a JWT token", async () => {
    const response = await request(fastify.server)
      .post("/api/v1/auth")
      .send({
        username: USERNAME,
        password: PASSWORD
      })

    expect(response.status).toBe(200)
    expect(response.body).not.toBeUndefined()
    expect(response.body.jwt).not.toBe("")
  })

  it("should successfully access a protected resource", async () => {
    const response1 = await request(fastify.server)
      .get("/api/v1/key/generate")
      .set({ 'authorization': `Bearer ${token}` })

    expect(response1.status).toBe(200)
    expect(response1.body).not.toBeUndefined()

    const apiKey = response1.body?.data?.apiKey
    expect(apiKey).not.toBeUndefined()
    const response2 = await request(fastify.server)
      .get("/api/v1/quote")
      .set({ 'authorization': `Bearer ${apiKey}` })

    expect(response2.status).toBe(200)
    expect(response2.body).not.toBeUndefined()
  })
})
