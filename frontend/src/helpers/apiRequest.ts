import { HttpMethod } from "../types/HttpMethod"

export const apiRequest = async (endpoint: string, method: HttpMethod, body?: object) => {
  const res = await fetch(endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  })
  const data = await res.json()
  if(!res.ok) throw new Error(data.message)
  return data
}