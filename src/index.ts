import "dotenv/config"
import { fastify } from "./app"
import rootRouter from "./routes"

const PORT = process.env.PORT || '3000'

fastify.register(rootRouter, { prefix: "/api/v1" })

const start = async () => {
  try {
    await fastify.listen({ port: parseInt(PORT) })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

