import { useEffect, useState } from "react";

const Alert = ({isShow, message, setIsShow, floating}) => {
    useEffect(() => {
        let timeout = undefined;

        if (isShow) {
            timeout = setTimeout(() => {
                setIsShow(false)
            }, 3000)
        }

        return () => {
            clearTimeout(timeout);
        };
        
    }, [isShow])

    return (
        <div className={`${isShow ? 'h-14  p-4' : 'h-0'} bg-red-500 my-1 text-white text-sm text-center rounded-lg shadow-xl ${floating ? 'absolute bottom-0 left-0 w-full z-10' : ''}`} style={{transition: '0.3s'}}>
            {
                isShow ? 
                    <div className="w-full">{message}</div>
                : ''
            }
        </div>
    )
}

export default Alert;