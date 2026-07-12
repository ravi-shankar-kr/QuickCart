import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ value = 0, size = 14 }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((s) =>
        s <= Math.round(value) ? (
          <FaStar key={s} size={size} className="text-[#111111] dark:text-white" />
        ) : (
          <FaRegStar key={s} size={size} className="text-neutral-300 dark:text-neutral-600" />
        )
      )}
      <span className="ml-1 text-xs text-neutral-500">{value?.toFixed?.(1)}</span>
    </div>
  );
};

export default Rating;
