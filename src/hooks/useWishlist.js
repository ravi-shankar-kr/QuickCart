import { useDispatch, useSelector } from "react-redux";

import {
  addToWishlist,
  removeFromWishlist,
  clearWishlistItems,
} from "../features/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  return {
    wishlistItems,

    addToWishlist: (product) =>
      dispatch(addToWishlist(product)),

    removeFromWishlist: (id) =>
      dispatch(removeFromWishlist(id)),

    clearWishlist: () =>
      dispatch(clearWishlistItems()),
  };
};

export default useWishlist;