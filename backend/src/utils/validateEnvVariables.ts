import { IEnvVariables } from '../interfaces/IEnvVariables.js'

export function validateEnvVariables() {
  const requiredEnvVars: (keyof IEnvVariables)[] = [
    "NODE_ENV",
    "DATABASE_URL",
    "JWT_SECRET",
    "PORT"
  ]
  // Filtering missin env variables
  const missingVars = requiredEnvVars.filter((key) => !process.env[key])
  // Stating missing variables if any
  if(missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(", ")}`)
  }
  // Success: All validated
  console.log("Environment variables validated")
}