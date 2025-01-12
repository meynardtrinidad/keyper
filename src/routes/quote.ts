import { FastifyInstance } from "fastify";
import { Response } from "../types/response";
import { isValid } from "../middleware/auth";

const data = [
  {
    id: 1,
    message: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
  },
  {
    id: 2,
    message: "The greatest glory in living lies not in never falling, but in rising every time we fall."
  },
  {
    id: 3,
    message: "The way to get started is to quit talking and begin doing."
  },
  {
    id: 4,
    message: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking."
  },
  {
    id: 5,
    message: "The future belongs to those who believe in the beauty of their dreams."
  },
]

const quoteRouter = (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', isValid)

  fastify.get('/', async (request, reply) => {
    const response: Response = {
      status: "OK",
      statusCode: 200,
      message: "Fetch successful.",
    }

    response.data = data

    return reply
      .status(response.statusCode)
      .send(response)
  })
}

export default quoteRouter
