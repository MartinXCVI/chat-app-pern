/* MODULES IMPORTS */
import { Request, Response } from "express"
import prisma from "../config/prisma.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from 'bcrypt'

/* HELPERS & UTILS */
import { hashPassword } from '../helpers/hashPassword.js'

/* INTERFACES IMPORTS */
import { ISignUpRequestBody } from "../interfaces/ISignUpRequestBody"


/**
 * @description:
 * Returns the current authenticated user's data.
 * Uses req.user which is populated by the protectRoute middleware.
 * No database query needed as user data is already available from the middleware.
 * 
 * @route: /me
 * @method: GET
*/
export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).json({
      success: true,
      message: "User successfully retrieved",
      user: req.user
    })
  } catch(error: any) {
    console.error(`Error retrieving user: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to retrieve user",
      error: error.message || error
    })
  }
} // End of getMe


/**
* @description: creates/registers a new user
* @route: /signup
* @method: POST
*/
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


/**
* @description: Login user by email
* @route: /login
* @method: POST
*/
export const login = async (req: Request, res: Response): Promise<any> => {
  // Getting the request body data
  const { username, password } = req.body
  // Validating the input data
  if(!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    })
  }
  // Attempting to log in
  try {
    // Validating username & password
    const user = await prisma.user.findUnique({ where: { username } })
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }
    // If all valid, generate the token
    generateToken(user.id, res)
    // Success response
    return res.status(200).json({
      success: true,
      message: "User successfully logged in",
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic
      }
    })
  } catch(error: any) {
    console.error(`Error in user login: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to login",
      error: error.message || error
    })
  }
} // End of login


/**
* @description: Logs out the user
* @route: /logout
* @method: POST
*/
export const logout = (req: Request, res: Response): any => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    })
    return res.status(200).json({
      success: true,
      message: "User successfully logged out"
    })
  } catch(error: any) {
    console.error(`Error in user logout: ${error.message || error}`)
    return res.status(500).json({
      success: false,
      message: "Internal server error while attempting to log out",
      error: error.message || error
    })
  }
} // End of logout