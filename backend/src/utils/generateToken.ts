import jwt from 'jsonwebtoken'
import { Response } from 'express'

const generateToken = (userId: string, res: Response)=> {
  // Defining secret and validating it
  const secret = process.env.JWT_SECRET as string
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const token = jwt.sign(
    { userId }, // Payload
    secret,
    { expiresIn: "15d" }
  )

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Prevents XSS
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development" // HTTPS only in production
  })
  return token
}

export default generateToken