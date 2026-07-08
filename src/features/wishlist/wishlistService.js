const WISHLIST_KEY = "quickcart_wishlist";

export const getWishlist = () => {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist)
  );
};

export const clearWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};