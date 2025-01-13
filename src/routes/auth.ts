import { FastifyInstance } from "fastify";
import { AuthResponse, Response } from "../types/response";
import { LoginPayload, RegisterPayload } from "../types/payload";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/constants";
import { createUser, getUser } from "../services/auth";

const authRouter = (fastify: FastifyInstance) => {
  fastify.post('/', async (request, reply) => {
    const response: AuthResponse = {
      status: "Unauthorized",
      statusCode: 401,
      message: "Incorrect username or password."
    }

    const body = request.body as LoginPayload

    if (!body || (!body.username || !body.password)) {
      return reply
        .status(response.statusCode)
        .send(response)
    }

    const user = await getUser(body)
    if (!user) {
      return reply
        .status(response.statusCode)
        .send(response)
    }

    response.status = "OK"
    response.statusCode = 200
    response.message = "Login successful"
    response.jwt = jwt.sign({
      userId: user.id
    }, JWT_SECRET, {
      expiresIn: '5m'
    })

    return reply
      .status(response.statusCode)
      .send(response)
  })

  fastify.post('/register', async (request, reply) => {
    const response: Response = {
      status: "Bad Request",
      statusCode: 400,
      message: "Incorrect payload."
    }

    const body = request.body as RegisterPayload
    if (!body || (!body.username || !body.password)) {
      return reply
        .status(response.statusCode)
        .send(response)
    }

    const user = await createUser(body)
    if (!user) {
      return reply
        .status(response.statusCode)
        .send(response)
    }

    response.status = "OK"
    response.statusCode = 200
    response.message = "Register successful."

    return reply
      .status(response.statusCode)
      .send(response)
  })
}

export default authRouter
