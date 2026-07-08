import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { loginUser } from "../../features/auth/authService";
import { setUser } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      const user = loginUser(data);
      dispatch(setUser(user));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="flex min-h-[calc(100vh-128px)] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-xl border p-8 shadow-sm">
        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border p-3 outline-none"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border p-3 outline-none"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;