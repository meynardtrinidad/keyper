import { FastifyInstance } from "fastify";
import { AuthResponse } from "../types/response";

const authRouter = (fastify: FastifyInstance) => {
  fastify.post('/', async (request, reply) => {
    const response: AuthResponse = {
      status: "Unauthorized",
      statusCode: 401,
      message: "Incorrect username or password."
    }

    return reply.status(200).send(response)
  })

  fastify.post('/logout', async (request, reply) => {
    return reply.status(200).send()
  })
}

export default authRouter
