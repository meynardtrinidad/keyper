import { config } from "dotenv"
import { fastify } from "./app"
import rootRouter from "./routes"

config()

const PORT = process.env.PORT || '3000'

fastify.register(rootRouter, { prefix: "/api/v1" })

const start = async () => {
  try {
    await fastify.listen({ port: parseInt(PORT) })
  } catch (err) {
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

