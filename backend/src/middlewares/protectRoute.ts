/* MODULES IMPORTS */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'

/* INTERFACES IMPORTS */
import { IDecodedToken } from '../interfaces/IDecodedToken'

// Extending the Express Request interface globally to include the user property
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username: string;
        fullName: string;
        profilePic: string;
      }
    }
  }
}

// Middleware function to protect routes by verifying JWT authentication
const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Getting jwt from cookies and validating it
    const token = req.cookies.jwt
    if(!token) {
      return res.status(401).json({
        success: false,
        message: "Error: Unauthorized - No token provided"
      })
    }
    // Verifying the token using the environment variables and validating
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as IDecodedToken
    if(!decoded) {
      return res.status(401).json({
        success: false,
        message: "Error: Unauthorized - Invalid token"
      })
    }
    // Finding the user matching the ID from the token & validating
    const user = await prisma.user.findUnique(
      {
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          fullName: true,
          profilePic: true
        }
      }
    )
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or does not exist"
      })
    }
    // Attaching the user object to the request for use in subsequent middleware or route handlers
    req.user = user
    next() // Calling the next middleware in the chain
  } catch(error: any) {
    console.error(`Error in route protection middleware: ${error.message || error}`)
    return res.status(401).json({
      success: false,
      message: "Internal server error while attempting to execute the routes protection middleware",
      error: error.message || error
    })
  }
}

export default protectRoute