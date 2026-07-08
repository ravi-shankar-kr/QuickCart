import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import { registerUser } from "../../features/auth/authService";
import { setUser } from "../../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      const user = registerUser(data);
      dispatch(setUser(user));
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="flex min-h-[calc(100vh-128px)] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-xl border p-8 shadow-sm">
        <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-lg border p-3 outline-none"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </form>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;