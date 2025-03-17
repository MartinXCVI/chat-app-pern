import { Link } from "react-router-dom"

const Login = () => {

	return (
		<div className='login-container flex flex-col items-center justify-center mx-auto'>
			<div className='w-full p-6 py-8 rounded-lg shadow-md bg-gray-900/60 bg-clip-padding backdrop-blur-sm'>
				<h1 className='mb-3 text-3xl font-semibold text-center text-white'>
					Login —<span className='text-emerald-500'> ChatApp</span>
				</h1>

				<form>
					<div className="form-div">
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
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
					<Link
						to='/signup'
						className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>Login</button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default Login