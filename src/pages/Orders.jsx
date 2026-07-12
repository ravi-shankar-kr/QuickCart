import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/ui/Button";

const statusColors = {
  Placed: "bg-neutral-100 dark:bg-neutral-800",
  Processing: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  Shipped: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
  Delivered: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300",
};

const Orders = () => {
  const { orders } = useAppSelector((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyState
          title="No orders yet"
          subtitle="Your placed orders will show up here."
          action={
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-8">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="block border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-[#111111] dark:text-white">
                  Order #{order.id}
                </p>
                <p className="text-xs text-neutral-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status] || "bg-neutral-100 dark:bg-neutral-800"}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-500">{order.items.length} item(s)</p>
              <p className="text-sm font-semibold text-[#111111] dark:text-white">
                {`₹${order.total.toLocaleString("en-IN")}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
