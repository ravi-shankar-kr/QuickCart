import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] dark:bg-[#0F0F0F] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-[#111111] dark:text-white">
            QuickCart
          </Link>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-neutral-800 rounded-2xl shadow-sm p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
