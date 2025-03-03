export const InputField = ({ type, name, placeholder, value, onChange, className= "" }) => (
  <input
    className={`w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 ${className}`}
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
