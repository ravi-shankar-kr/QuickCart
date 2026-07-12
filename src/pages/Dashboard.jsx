import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loadProducts } from "../features/products/productsSlice";
import { formatPrice } from "../utils/formatPrice";
import Card from "../components/ui/Card";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { apiProducts, localProducts, status } = useAppSelector((state) => state.products);
  const { orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  const allProducts = [...localProducts, ...apiProducts];
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 5);
  const recentProducts = localProducts.slice(0, 5);

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
    { label: "Total Orders", value: orders.length },
    { label: "Total Products", value: allProducts.length },
    { label: "Local Products", value: localProducts.length },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-8">Analytics</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-xs text-neutral-500 uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-bold text-[#111111] dark:text-white mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-sm font-semibold text-[#111111] dark:text-white mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-neutral-500">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <Link
                  key={o.id}
                  to={`/orders/${o.id}`}
                  className="flex items-center justify-between text-sm py-2 border-b border-[#E5E5E5] dark:border-neutral-800 last:border-none"
                >
                  <span className="text-[#111111] dark:text-white">#{o.id}</span>
                  <span className="text-neutral-500">{o.status}</span>
                  <span className="font-medium text-[#111111] dark:text-white">
                    {`₹${o.total.toLocaleString("en-IN")}`}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold text-[#111111] dark:text-white mb-4">Recent Products</h2>
          {recentProducts.length === 0 ? (
            <p className="text-sm text-neutral-500">No local products added yet.</p>
          ) : (
            <div className="space-y-3">
              {recentProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm py-2 border-b border-[#E5E5E5] dark:border-neutral-800 last:border-none"
                >
                  <span className="text-[#111111] dark:text-white line-clamp-1">{p.title}</span>
                  <span className="font-medium text-[#111111] dark:text-white">
                    {formatPrice(p.price)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
