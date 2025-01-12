import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { AuthResponse } from "../types/response";
import { JWT_SECRET } from "../config/constants";
import { FastifyRequestWithUser } from "../types/request";
import { KeyV1 } from "../utils/key";
import bcrypt from "bcrypt"
import { cache } from "../config/cache";
import { getKeyWithIdentifier } from "../models/key";


/**
 * This middleware / plugin is responsible for checking the validity
 * of a `JWT token` only.
 */
export const isAuthenticated = async (request: FastifyRequest, reply: FastifyReply) => {
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
}

/**
 * This middleware / plugin is responsible for checking the validity
 * of the `API key`.
 */
export const isValid = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization
  const response: AuthResponse = {
    status: "Forbidden",
    statusCode: 403,
    message: "Invalid key."
  }

  if (!authHeader) {
    return reply
      .status(response.statusCode)
      .send(response)
  }

  const apiKey = authHeader.split(" ")[1]

  try {
    const [_, identifier, secret] = KeyV1.separate(apiKey)
    let hash = cache.get(identifier)

    if (!hash) {
      const result = await getKeyWithIdentifier(identifier) as { hash: string }

      if (!result) {
        throw new Error("Does not exists.")
      }

      hash = result.hash
    }

    const isValid = await bcrypt.compare(secret, hash)
    if (!isValid) {
      throw new Error("Invalid key.")
    }
  } catch (err) {
    console.log(`Error verifying api key:`, err)
    return reply
      .status(response.statusCode)
      .send(response)
  }
}
