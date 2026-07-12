const variants = {
  primary:
    "bg-[#111111] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200",
  outline:
    "border border-[#E5E5E5] text-[#111111] hover:bg-[#F8F8F8] dark:border-neutral-700 dark:text-white dark:hover:bg-[#1A1A1A]",
  ghost:
    "text-[#111111] hover:bg-[#F8F8F8] dark:text-white dark:hover:bg-[#1A1A1A]",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
