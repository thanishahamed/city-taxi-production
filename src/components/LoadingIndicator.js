const LoadingIndicator = ({isLoading, className}) => {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            {isLoading ? <div className="lds-ripple"><div></div><div></div></div> : ''}
        </div>
    )
}

export default LoadingIndicator;