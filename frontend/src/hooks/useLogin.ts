import { useState } from "react"
import useAuthContext from "./useAuthContext"
import { apiRequest } from "../helpers/apiRequest"
import { handleError } from "../helpers/handleError"
import toast from "react-hot-toast"

const useLogin = (): { loading: boolean; login: (username: string, password: string)=> Promise<void> } => {

	const [loading, setLoading] = useState(false)
	const { setAuthUser } = useAuthContext()

	const login = async (username: string, password: string) => {
		setLoading(true)
		// Attempting to log in
		try {
			// Getting the request from the API and handling the error if any
			const data = await apiRequest("/api/auth/login", "POST", { username, password })
			// Login the user
			setAuthUser(data)
			toast.success(data.message)
		} catch (error: unknown) {
			handleError(error)
		} finally {
			setLoading(false)
		}
	} // End of login

	return { loading, login }
}

export default useLogin