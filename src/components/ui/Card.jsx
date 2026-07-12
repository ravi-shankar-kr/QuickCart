const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
