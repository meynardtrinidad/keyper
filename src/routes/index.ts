import { FastifyInstance } from "fastify"
import authRouter from "./auth"
import { logger } from "../middleware/logger"
import keyRouter from "./key"

const rootRouter = (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', logger)

  fastify.get("/ping", (request, reply) => {
    reply.status(200).send({
      message: "pong"
    })
  })

  fastify.register(authRouter, { prefix: "/auth" })
  fastify.register(keyRouter, { prefix: "/key" })
}

export default rootRouter
