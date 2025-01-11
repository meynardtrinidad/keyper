import { FastifyInstance } from "fastify";
import { Response } from "../types/response";
import { createKey } from "../services/key";
import { FastifyRequestWithUser } from "../types/request";
import { isAuthenticated } from "../middleware/auth";

const keyRouter = (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', isAuthenticated)

  fastify.post('/generate', async (request, reply) => {
    const response: Response = {
      status: "Internal Server Error",
      statusCode: 500,
      message: "Error generating key.",
    }

    let key: string | undefined
    let count = 0

    while (count < 3) {
      try {
        key = await createKey((request as FastifyRequestWithUser).user.id)
        break
      } catch (err) {
        console.log(`Error generating key (${count}):`, err)
        count++
      }
    }

    if (key) {
      response.status = "OK"
      response.statusCode = 200
      response.message = "Key generated."
      response.data = {
        apiKey: key
      }
    }

    return reply
      .status(response.statusCode)
      .send(response)
  })

  fastify.post('/revoke', async (request, reply) => {
    const response: Response = {
      status: "OK",
      statusCode: 200,
      message: "Key revoked."
    }

    return reply
      .status(response.statusCode)
      .send(response)
  })
}

export default keyRouter
