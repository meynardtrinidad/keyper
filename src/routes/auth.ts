import { FastifyInstance } from "fastify";
import { AuthResponse } from "../types/response";
import { getUsernameAndPassword } from "../models/auth";
import { LoginPayload } from "../types/payload";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/constants";

const authRouter = (fastify: FastifyInstance) => {
  fastify.post('/', async (request, reply) => {
    const response: AuthResponse = {
      status: "Unauthorized",
      statusCode: 401,
      message: "Incorrect username or password."
    }

    const body = request.body as LoginPayload

    if (!body) {
      return reply
        .status(response.statusCode)
        .send(response)
    }

    const user = await getUsernameAndPassword(body.username)

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

  fastify.post('/logout', async (request, reply) => {
    const response: AuthResponse = {
      status: "OK",
      statusCode: 200,
      message: "Logout successful"
    }

    return reply
      .status(response.statusCode)
      .send(response)
  })
}

export default authRouter
