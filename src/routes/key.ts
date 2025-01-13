import { FastifyInstance } from "fastify";
import { Response } from "../types/response";
import { createKey, revokeKey } from "../services/key";
import { FastifyRequestWithUser } from "../types/request";
import { isAuthenticated } from "../middleware/auth";
import { deleteKey } from "../models/key";

const keyRouter = (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', isAuthenticated)

  fastify.get('/generate', async (request, reply) => {
    const response: Response = {
      status: "Internal Server Error",
      statusCode: 500,
      message: "Error generating key.",
    }

    let key: string | undefined
    let count = 0

    // Generate at least 3 times in case that there is a conflict
    // encountered such as conflicting identifier
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

  fastify.get('/revoke', async (request, reply) => {
    const response: Response = {
      status: "OK",
      statusCode: 200,
      message: "Key revoked."
    }

    await revokeKey((request as FastifyRequestWithUser).user.id)

    return reply
      .status(response.statusCode)
      .send(response)
  })
}

export default keyRouter
