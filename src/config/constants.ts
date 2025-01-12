// Temporary secret should the JWT_SECRET not exist
export const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const KEY_LENGTH = 16
export const SALT_ROUNDS = 10
