import { FastifyReply, FastifyRequest } from "fastify";
import { Done } from "../types/middleware";
import jwt from "jsonwebtoken"
import { AuthResponse } from "../types/response";
import { JWT_SECRET } from "../config/constants";
import { FastifyRequestWithUser } from "../types/request";

export const isAuthenticated = (request: FastifyRequest, reply: FastifyReply, done: Done) => {
  const authHeader = request.headers.authorization
  const response: AuthResponse = {
    status: "Forbidden",
    statusCode: 403,
    message: "Invalid JWT token."
  }

  if (!authHeader) {
    return reply
      .status(response.statusCode)
      .send(response)
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId?: number }

    if (payload.userId) {
      (request as FastifyRequestWithUser).user = {
        id: payload.userId
      }
    } else {
      throw new Error("Unknown payload.")
    }
  } catch (err) {
    console.log(`Error verifying token:`, err)
    return reply
      .status(response.statusCode)
      .send(response)
  }

  done()
}
