import React from 'react'

function Button({children, className, onClick, value, onchange, type}) {
  return (
    <button 
        className={className} 
        onClick={onClick}
        value={value}
        onChange={onchange}
        type={type}
    >
            {children}
    </button>
  )
}

export default Button