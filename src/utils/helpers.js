export const calculateDiscountPrice = (price, discountPercentage) => {
  return Math.round(price - (price * discountPercentage) / 100);
};

export const getAverageRating = (rating) => Number(rating).toFixed(1);

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};