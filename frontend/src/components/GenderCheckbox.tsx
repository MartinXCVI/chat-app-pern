const GenderCheckbox = ({	selectedGender, onCheckboxChange }: {
	selectedGender: string;
	onCheckboxChange: (gender: "male" | "female") => void;
}) => {
	
	return (
		<div className='flex gap-3 py-2'>
			<div className='form-control'>
				<label className={`label gap-1 cursor-pointer`}>
					<span className='label-text text-white'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-gray-700'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-1 cursor-pointer`}>
					<span className='label-text text-white'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-gray-700'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	)
}

export default GenderCheckbox