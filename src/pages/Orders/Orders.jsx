import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../components/common/Container";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import OrderCard from "../../components/ui/OrderCard";

import { clearOrderHistory } from "../../features/orders/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.orders.orders
  );

  if (!orders.length) {
    return (
      <Container className="py-16">
        <EmptyState
          title="No Orders Found"
          description="You haven't placed any orders yet."
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        <Button
          variant="outline"
          onClick={() =>
            dispatch(clearOrderHistory())
          }
        >
          Clear History
        </Button>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </Container>
  );
};

export default Orders;