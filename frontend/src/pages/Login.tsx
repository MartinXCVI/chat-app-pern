import { useState } from "react"
import { Link } from "react-router-dom"
import { FormEvent } from "react"
import useLogin from "../hooks/useLogin"
import LoadingSpinner from "../components/LoadingSpinner"

const Login = () => {

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	})

	const { loading, login } = useLogin()

	const handleSubmitLoginForm = (event: FormEvent)=> {
		event.preventDefault()
		// Passing the values to the login function
		login(inputs.username, inputs.password)
	}

	return (
		<div className='login-container flex flex-col items-center justify-center mx-auto'>
			<div className='w-full p-6 py-8 rounded-lg shadow-md bg-gray-900/60 bg-clip-padding backdrop-blur-sm'>
				<h1 className='mb-3 text-3xl font-semibold text-center text-white'>
					Login —<span className='text-emerald-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitLoginForm}>
					<div className="form-div">
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(event)=> setInputs({ ...inputs, username: event.target.value })}
						/>
					</div>

					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(event)=> setInputs({ ...inputs, password: event.target.value })}
						/>
					</div>
					<Link
						to='/signup'
						className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button
							className='btn btn-block btn-sm mt-2'
							disabled={loading}
						>
							{ loading ? <>Loading... <LoadingSpinner /></> : "Login" }
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default Login