import { FastifyInstance } from "fastify"

const rootRouter = (fastify: FastifyInstance) => {
  fastify.get('/', async function handler(request, reply) {
    return { message: 'Welcome!' }
  })

  fastify.get("/ping", (request, reply) => {
    reply.status(200).send({
      message: "pong"
    })
  })
}

export default rootRouter
