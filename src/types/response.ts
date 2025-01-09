export type ResponseError = Record<string, unknown>

export type Response<T = unknown> = {
  status: string
  statusCode: number
  message: string
  data?: T
  error?: ResponseError
}

export type AuthResponse = {
  jwt?: string
  status: string
  statusCode: number
  message: string
}
