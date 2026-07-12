import { Outlet, NavLink } from "react-router-dom";
import { FiGrid, FiBox, FiArrowLeft } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";

const links = [
  { to: "/dashboard", label: "Analytics", icon: FiGrid, end: true },
  { to: "/dashboard/products", label: "Manage Products", icon: FiBox },
];

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F0F0F]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <aside className="w-56 shrink-0 hidden md:block">
          <nav className="flex flex-col gap-1 sticky top-24">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#111111] text-white dark:bg-white dark:text-black"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A]"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-[#F8F8F8] dark:hover:bg-[#1A1A1A] mt-4"
            >
              <FiArrowLeft size={16} />
              Back to Store
            </NavLink>
          </nav>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
