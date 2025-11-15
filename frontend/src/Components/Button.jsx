import React from 'react';

const Button = ({ children, onClick, type, disabled, className = '', ...props }) => {
    return (
        <div>
            <button
                onClick={onClick}
                disabled={disabled}
                type={type}
                {...props}
                className={`${className} bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full text-sm text-white cursor-pointer hover:shadow-lg transition duration-300`}>
                {children}
            </button>
        </div>
    );
}
export default Button;
