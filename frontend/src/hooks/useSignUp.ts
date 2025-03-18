import { useState } from "react"
import useAuthContext from "./useAuthContext"
import toast from "react-hot-toast"
import { apiRequest } from "../helpers/apiRequest"
import { handleError } from "../helpers/handleError"
import { SignUpInputs } from "../types/SignUpInputs"


const useSignUp = (): { loading: boolean; signup: (inputs: SignUpInputs)=> Promise<void> } => {

	const [loading, setLoading] = useState(false)
	const { setAuthUser } = useAuthContext()

	const signup = async (inputs: SignUpInputs) => {
		setLoading(true)
		// Attempting to sign-up
		try {
			// Getting the request from the API and handling the error if any
			const data = await apiRequest("/api/auth/signup", "POST", inputs)
			// Updating the context with the fetched data
			setAuthUser(data)
			toast.success(data.message)
		} catch(error: unknown) {
			handleError(error)
		} finally {
			setLoading(false);
		}
	} // End of signup

	return { loading, signup }
}

export default useSignUp