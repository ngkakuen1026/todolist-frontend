export const AuthInputField = ({ type, name, placeholder, value, onChange }) => (
    <input
      className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 bg-gray-100"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
);