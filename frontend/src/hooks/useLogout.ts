import { useState } from "react"
import useAuthContext from "./useAuthContext"
import { handleError } from "../helpers/handleError"
import toast from "react-hot-toast"


const useLogout = (): { loading: boolean; logout: ()=> Promise<void> } => {
	const [loading, setLoading] = useState(false)
	const { setAuthUser } = useAuthContext()

	const logout = async (): Promise<void> => {
		if(loading) return; // Preventing duplicate requests
		setLoading(true)
		// Attempting to logout
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
			})
			// Checking for expired session and forcing logout
			if(res.status === 401) {
				setAuthUser(null)
				toast.error("Session expired. Please log in again.")
				return
			}
			const data: { message?: string } = await res.json()
			if(!res.ok) {
				throw new Error(data.message || "Failed to log out.")
			}
			// Successful logout: User back to login page once unauthorized
			setAuthUser(null)
			toast.success(data.message || "Logged out successfully.") 
		} catch (error: unknown) {
			handleError(error)
		} finally {
			setLoading(false)
		}
	} // End of logout

	return { loading, logout }
}

export default useLogout