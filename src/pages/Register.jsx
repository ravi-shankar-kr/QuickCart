import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { registerUser, loginUser, clearAuthError } from "../features/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    const users = JSON.parse(localStorage.getItem("quickcart_users") || "[]");
    const created = users.find((u) => u.email === data.email);
    if (created) {
      if (data.isAdmin) {
        created.role = "admin";
        const idx = users.findIndex((u) => u.id === created.id);
        users[idx] = created;
        localStorage.setItem("quickcart_users", JSON.stringify(users));
      }
      dispatch(loginUser({ email: data.email, password: data.password, rememberMe: true }));
      navigate("/");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-[#111111] dark:text-white mb-1">Create account</h1>
      <p className="text-sm text-neutral-500 mb-6">Join QuickCart in seconds.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />

        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" {...register("isAdmin")} className="accent-black dark:accent-white" />
          Register as store admin (dashboard access)
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="text-sm text-neutral-500 mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#111111] dark:text-white">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
