import { Link } from "react-router-dom"
import GenderCheckbox from "../components/GenderCheckbox"
import { useState } from "react"
import { FormEvent } from "react"
import useSignUp from "../hooks/useSignUp"
import toast from "react-hot-toast"
import LoadingSpinner from "../components/LoadingSpinner"

const SignUp = () => {

	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: ""
	})

	const { loading, signup } = useSignUp()

	const handleCheckBoxChange = (gender: "male" | "female")=> {
		setInputs({ ...inputs, gender })
	}

	const handleSubmitSignUpForm = (event: FormEvent)=> {
		event.preventDefault()
		if(inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match!");
      return
    }
		// Passing input values to signup function
		signup(inputs)
	}

	return (
		<div className='signup-container flex flex-col items-center justify-center mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-900/60 bg-clip-padding backdrop-blur-sm'>
				<h1 className='mb-3 text-3xl font-semibold text-center text-gray-300'>
					Sign Up —<span className='text-emerald-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitSignUpForm}>
					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							aria-label="Full Name"
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(event)=> setInputs({ ...inputs, fullName: event.target.value })}
						/>
					</div>

					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
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

					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(event)=> setInputs({ ...inputs, confirmPassword: event.target.value })}
						/>
					</div>

					<GenderCheckbox
						selectedGender={inputs.gender}
						onCheckboxChange={handleCheckBoxChange}
					/>

					<Link
						to={"/login"}
						className='login-btn text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
					>
						Already have an account?
					</Link>

					<div>
						<button
							className='btn btn-block btn-sm mt-2 border border-slate-700'
							disabled={loading}
							aria-disabled={loading}
						>
							{ loading ? <>Loading... <LoadingSpinner /></> : "Sign Up" }
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp