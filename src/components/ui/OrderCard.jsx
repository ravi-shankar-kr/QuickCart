import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

const OrderCard = ({ order }) => {
  return (
    <div className="rounded-xl border p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Order #{order.id}
          </h2>

          <p className="text-sm text-neutral-500">
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
          {order.status}
        </span>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Items :</strong>{" "}
          {order.items.length}
        </p>

        <p>
          <strong>Total :</strong>{" "}
          {formatCurrency(order.total * 85)}
        </p>
      </div>

      <Link
        to={`/orders/${order.id}`}
        className="mt-5 inline-block"
      >
        <Button>View Details</Button>
      </Link>
    </div>
  );
};

export default OrderCard;