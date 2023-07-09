import React from 'react'

function Button({children, className, onClick, value, onchange, type, disabled}) {
  return (
    <button 
        className={className} 
        onClick={onClick}
        value={value}
        onChange={onchange}
        type={type}
        disabled={disabled}
    >
            {children}
    </button>
  )
}

export default Button