import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { updateUserProfile } from "../features/auth/authSlice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      avatar: user?.avatar || "",
    },
  });

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#111111] dark:text-white mb-8">Profile</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#F8F8F8] dark:bg-neutral-800 overflow-hidden flex items-center justify-center text-lg font-semibold text-[#111111] dark:text-white">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user?.name?.charAt(0)?.toUpperCase()
          )}
        </div>
        <div>
          <p className="font-semibold text-[#111111] dark:text-white">{user?.name}</p>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Full Name" {...register("name", { required: "Name is required" })} error={errors.name?.message} />
        <Input label="Phone" {...register("phone")} />
        <Input label="Address" {...register("address")} />
        <Input label="Avatar URL" placeholder="https://..." {...register("avatar")} />

        {isSubmitSuccessful && (
          <p className="text-sm text-green-600">Profile updated successfully.</p>
        )}

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default Profile;
