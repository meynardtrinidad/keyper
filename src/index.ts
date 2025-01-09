import { fastify } from "./app"
import rootRouter from "./routes"

fastify.register(rootRouter, { prefix: "/api/v1" })

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
