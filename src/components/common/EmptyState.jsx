const EmptyState = ({ title = "Nothing here yet", subtitle = "", action = null }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4">
      <h3 className="text-lg font-semibold text-[#111111] dark:text-white">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-2 text-sm text-neutral-500 max-w-sm">{subtitle}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
