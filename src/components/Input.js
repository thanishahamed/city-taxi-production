const Input = ({
    name,
    type = 'text',
    required = false,
    className,
    onChange = undefined,
    value = undefined,
    placeholder = '',
    disabled=false,
    autoFocus = false
}) => {
    return (
        <input 
            type={type}
            className={`${className} rounded-md border focus:border-yellow-500 focus:border-2 focus:scale-105 py-1.5 pl-5 text-gray-900 placeholder:text-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 transition ease-in-out duration-300 focus-visible:outline-0`}
            name={name}
            required={required}
            onChange={onChange ? onChange : undefined}
            value={value ? value : undefined}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
        />
    )
}

export default Input;