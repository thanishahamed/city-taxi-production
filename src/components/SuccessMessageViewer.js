const SuccessMessageViewer = ({message, className, title}) => {
    return (
        <div>
            <div className={`${className}`}>{title}</div>
            <div className={`${className} text-lg`}>{message}</div>
        </div>
    )
}

export default SuccessMessageViewer;