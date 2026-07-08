import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "../../components/common/Container";
import EmptyState from "../../components/common/EmptyState";
import formatCurrency from "../../utils/formatCurrency";

const OrderDetails = () => {
  const { id } = useParams();

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const order = orders.find(
    (item) => item.id === Number(id)
  );

  if (!order) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Order Not Found"
          description="The requested order does not exist."
        />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="rounded-xl border p-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Order #{order.id}
            </h1>

            <p className="text-neutral-500">
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
            {order.status}
          </span>
        </div>

        <div className="space-y-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    Qty : {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-bold">
                {formatCurrency(
                  item.price *
                    item.quantity *
                    85
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between text-2xl font-bold">
          <span>Total</span>

          <span>
            {formatCurrency(order.total * 85)}
          </span>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetails;