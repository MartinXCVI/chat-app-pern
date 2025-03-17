import { Link } from "react-router-dom"
import GenderCheckbox from "../components/GenderCheckbox"

const SignUp = () => {

	return (
		<div className='signup-container flex flex-col items-center justify-center mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-900/60 bg-clip-padding backdrop-blur-sm'>
				<h1 className='mb-3 text-3xl font-semibold text-center text-gray-300'>
					Sign Up —<span className='text-emerald-500'> ChatApp</span>
				</h1>

				<form>
					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
					</div>

					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
					</div>

					<div className="form-div">
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
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
						/>
					</div>

					<GenderCheckbox />

					<Link
						to={"/login"}
						className='login-btn text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp