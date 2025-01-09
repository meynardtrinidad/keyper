import { fastify } from "./app"
import { config } from "dotenv"
import rootRouter from "./routes"

config()

fastify.register(rootRouter, { prefix: "/api/v1" })

const PORT = process.env.PORT || '3000'

const start = async () => {
  try {
    await fastify.listen({ port: parseInt(PORT) })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
