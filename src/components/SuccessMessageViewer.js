const SuccessMessageViewer = ({message, className, title}) => {
    return (
        <div>
            <div className={`${className}`}>{title}</div>
            <div className={`${className}`}>{message}</div>
        </div>
    )
}

export default SuccessMessageViewer;