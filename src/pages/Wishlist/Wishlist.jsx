import React from "react";

import Container from "../../components/common/Container";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";

import WishlistItem from "../../components/ui/WishlistItem";

import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";

const Wishlist = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (!wishlistItems.length) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Wishlist is Empty"
          description="Save your favourite products here."
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          My Wishlist
        </h1>

        <Button
          variant="outline"
          onClick={clearWishlist}
        >
          Clear Wishlist
        </Button>
      </div>

      <div className="space-y-5">
        {wishlistItems.map((item) => (
          <WishlistItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </div>
    </Container>
  );
};

export default Wishlist;