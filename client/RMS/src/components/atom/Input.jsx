function Input({
  children,
  type,
  name,
  placeholder,
  className,
  ref,
  onChange,
  value,
  maxLength,
  min,
  max,
}) {
  return (
    <label className="block">
      {children}
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="false"
        ref={ref}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        max={max}
        min={min}
        required
      />
    </label>
  );
}

export default Input;
