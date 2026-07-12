import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { placeOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { toINR } from "../utils/formatPrice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: "",
      pincode: "",
      paymentMethod: "cod",
    },
  });

  const subtotal = items.reduce((sum, item) => sum + toINR(item.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    dispatch(
      placeOrder({
        items,
        total,
        address: `${data.fullName}, ${data.address}, ${data.city} - ${data.pincode}, Phone: ${data.phone}`,
        paymentMethod: data.paymentMethod,
      })
    );
    dispatch(clearCart());
    navigate("/orders");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-8">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          {...register("fullName", { required: "Full name is required" })}
          error={errors.fullName?.message}
        />
        <Input
          label="Phone Number"
          {...register("phone", { required: "Phone number is required" })}
          error={errors.phone?.message}
        />
        <Input
          label="Address"
          {...register("address", { required: "Address is required" })}
          error={errors.address?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            {...register("city", { required: "City is required" })}
            error={errors.city?.message}
          />
          <Input
            label="Pincode"
            {...register("pincode", { required: "Pincode is required" })}
            error={errors.pincode?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] dark:text-white mb-1.5">
            Payment Method
          </label>
          <select
            {...register("paymentMethod")}
            className="w-full px-4 py-2.5 rounded-2xl border border-[#E5E5E5] dark:border-neutral-700 bg-white dark:bg-[#1A1A1A] text-[#111111] dark:text-white"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <div className="border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl p-5 space-y-2 text-sm">
          <div className="flex justify-between text-neutral-500">
            <span>Subtotal</span>
            <span>{`₹${subtotal.toLocaleString("en-IN")}`}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>Shipping</span>
            <span>{`₹${shipping}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-[#111111] dark:text-white pt-2 border-t border-[#E5E5E5] dark:border-neutral-800">
            <span>Total</span>
            <span>{`₹${total.toLocaleString("en-IN")}`}</span>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
