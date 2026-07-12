import { useParams, Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useAppSelector } from "../hooks/useAppSelector";
import Button from "../components/ui/Button";

const steps = ["Placed", "Processing", "Shipped", "Delivered"];

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useAppSelector((state) => state.orders);
  const order = orders.find((o) => String(o.id) === id);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500">Order not found.</p>
        <Link to="/orders">
          <Button className="mt-4">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-1">
        Order #{order.id}
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Placed on{" "}
        {new Date(order.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-[#111111] dark:text-white mb-6">Status</h2>
        <div className="flex items-center">
          {steps.map((step, idx) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    idx <= currentStepIndex
                      ? "bg-[#111111] text-white dark:bg-white dark:text-black"
                      : "bg-[#F8F8F8] dark:bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {idx <= currentStepIndex ? <FiCheck size={14} /> : idx + 1}
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-center whitespace-nowrap">{step}</p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    idx < currentStepIndex ? "bg-[#111111] dark:bg-white" : "bg-[#E5E5E5] dark:bg-neutral-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-[#111111] dark:text-white mb-3">
          Shipping Address
        </h2>
        <p className="text-sm text-neutral-500">{order.address}</p>
        <p className="text-sm text-neutral-500 mt-2 capitalize">
          Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
        </p>
      </div>

      <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-[#111111] dark:text-white mb-4">Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="w-14 h-14 rounded-xl object-cover bg-[#F8F8F8] dark:bg-neutral-900"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111111] dark:text-white line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 pt-4 border-t border-[#E5E5E5] dark:border-neutral-800 font-semibold text-[#111111] dark:text-white">
          <span>Total</span>
          <span>{`₹${order.total.toLocaleString("en-IN")}`}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
