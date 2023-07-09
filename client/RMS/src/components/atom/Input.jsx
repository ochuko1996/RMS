
function Input({children, type, name, placeholder, className, ref, onChange,value}) {
  return (
    <label className="block">
        {children}
        <input
            className={className} 
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete='false'
            ref={ref}
            onChange={onChange}
            value={value}
            required
        />
    </label> 
  )
}

export default Input