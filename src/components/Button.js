const Button = ({
    children, 
    className, 
    onClick, 
    size = 'md',
    style = 'default',
    type
}) => {
    const buttonSizes = {
        md: 'px-5 py-3 text-sm',
        sm: 'px-2 py-1 text-xs'
    }

    const buttonStyles = {
        default: 'bold hover:bg-yellow-400 bg-yellow-500 focus:border-yellow-200',
        success: 'text-slate-100 bold hover:bg-green-600 bg-green-700 focus:border-green-300',
        danger: 'text-slate-100 bold hover:bg-red-600 bg-red-700 focus:border-red-300',
        ghost: 'border-none rounded-full'
    }

    return (
        <button 
            className={`${buttonSizes[size]} ${buttonStyles[style]} shadow-2xl drop-shadow-sm transition ease-in-out duration-300 hover:scale-105 rounded ${className}`}
            onClick={onClick}
            type={type}
        >{children}</button>
    )
}

export default Button;