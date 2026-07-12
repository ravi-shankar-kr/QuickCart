import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loginUser, clearAuthError } from "../features/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-[#111111] dark:text-white mb-1">Welcome back</h1>
      <p className="text-sm text-neutral-500 mb-6">Login to continue shopping.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" {...register("rememberMe")} className="accent-black dark:accent-white" />
          Remember me
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="text-sm text-neutral-500 mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-[#111111] dark:text-white">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
