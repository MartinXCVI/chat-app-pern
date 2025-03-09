/* MODULES IMPORTS */
import { Request, Response } from "express"
import prisma from "../config/prisma.js"
import generateToken from "../utils/generateToken.js"

/* HELPERS & UTILS */
import { hashPassword } from '../helpers/hashPassword.js'

/* INTERFACES IMPORTS */
import { ISignUpRequestBody } from "../interfaces/ISignUpRequestBody"


export const signUp = async (req: Request<ISignUpRequestBody>, res: Response): Promise<any> => {
  // Getting the request data
  const { fullName, username, password, confirmPassword, gender } = req.body
  // Validating input data
  if(!fullName || !username || !password || !confirmPassword || !gender) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    })
  }
  // Validating if passwords match
  if(password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match"
    })
  }
  // Attempting sign up
  try {
    // Checking if the username already exists
    const user = await prisma.user.findUnique({ where: { username } })
    if(user) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      })
    }
    // Password hashing
    const hashedPassword = await hashPassword(password)
    // Setting a random profile picture
    const profilePic = gender === 'male'
    ? `https://avatar.iran.liara.run/public/boy?username=${username}`
    : `https://avatar.iran.liara.run/public/girl?username=${username}`
    // Creating new user with Prisma
    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic
      }
    })
    // Generating & storing token for authentication
    generateToken(newUser.id, res)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      }
    })
  } catch(error: any) {
    console.error(`Error creating user: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to sign up",
      error: error.message || error
    })
  }
} // End of signUp

export const login = async (req: Request, res: Response)=> {
  res.send("Logged in successfully")
}

export const logout = async (req: Request, res: Response)=> {
  res.send("Logged out successfully")
}