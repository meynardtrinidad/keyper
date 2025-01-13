import { SALT_ROUNDS } from "../config/constants";
import { getUsernameAndPassword } from "../models/auth";
import { insertUser } from "../models/users";
import { LoginPayload, RegisterPayload } from "../types/payload";
import bcrypt from "bcrypt"

export const createUser = async (payload: RegisterPayload) => {
  try {
    const hash = await bcrypt.hash(payload.password, SALT_ROUNDS)
    const result = await insertUser({ username: payload.username, password: hash })
    if (result instanceof Error) {
      throw result
    }
    return true
  } catch (err) {
    return false
  }
}

export const getUser = async (payload: LoginPayload) => {
  try {
    const user = await getUsernameAndPassword(payload.username)
    const isValid = await bcrypt.compare(payload.password, user.password)

    if (!isValid) {
      throw new Error("Invalid username or password.")
    }

    return user
  } catch (err) {
    return
  }
}
