import { FastifyInstance } from "fastify"
import authRouter from "./auth"
import { logger } from "../middleware/logger"
import keyRouter from "./key"
import { Done } from "../types/middleware"

const rootRouter = (fastify: FastifyInstance, _: { prefix: string }, done: Done) => {
  fastify.addHook('preHandler', logger)

  fastify.get("/ping", (request, reply) => {
    reply.status(200).send({
      message: "pong"
    })
  })

  fastify.register(authRouter, { prefix: "/auth" })
  fastify.register(keyRouter, { prefix: "/key" })

  done()
}

export default rootRouter
