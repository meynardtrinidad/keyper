import Fastify from 'fastify'

export const rootPath = __dirname

export const fastify = Fastify({
  logger: true
})
