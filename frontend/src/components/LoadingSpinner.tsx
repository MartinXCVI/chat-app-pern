interface LoadingSpinner {
  spinnerClass?: string | undefined
}

const LoadingSpinner = ({ spinnerClass = "" }: LoadingSpinner) => {
  return (
    <div className={`loading loading-spinner ${spinnerClass}`}></div>
  )
}

export default LoadingSpinner