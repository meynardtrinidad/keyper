import { FastifyReply, FastifyRequest } from "fastify";
import { Done } from "../types/middleware";
import jwt from "jsonwebtoken"
import { AuthResponse } from "../types/response";
import { JWT_SECRET } from "../config/constants";
import { FastifyRequestWithUser } from "../types/request";

export const isAuthenticated = (request: FastifyRequest, reply: FastifyReply, done: Done) => {
  const token = request.headers.authorization
  const response: AuthResponse = {
    status: "Forbidden",
    statusCode: 403,
    message: "Invalid JWT token."
  }

  if (!token) {
    return reply
      .status(response.statusCode)
      .send(response)
  }

  try {
    const payload: unknown[] = jwt.verify(token, JWT_SECRET).split('.')
    console.log(payload)

    if (payload.length) {
      (request as FastifyRequestWithUser).user = payload[1] as { id: number }
    }
  } catch (err) {
    console.log(`Error verifying token:`, err)
    return reply
      .status(response.statusCode)
      .send(response)
  }

  done()
}
