const Input = ({ label, error, className = "", ...rest }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#111111] dark:text-white mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-2xl border border-[#E5E5E5] dark:border-neutral-700 bg-white dark:bg-[#1A1A1A] text-[#111111] dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
