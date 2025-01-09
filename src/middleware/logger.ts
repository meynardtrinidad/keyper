import { FastifyRequest, FastifyReply } from "fastify"
import { Done } from "../types/middleware";

export const logger = (request: FastifyRequest, reply: FastifyReply, done: Done) => {
  console.log(`Request received: ${request.method} ${request.url}`);
  done();
}
