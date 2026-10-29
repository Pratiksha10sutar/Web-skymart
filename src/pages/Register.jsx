import React, { useContext } from "react";
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { MyStore } from "../context/MyContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";

const Register = () => {
  const { showPassword, setShowPassword } = useContext(MyStore);
  const { registeredUsers, setRegisteredUsers, setLoggedInUser } =
    useContext(Auth);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formSubmit = (data) => {
    let arr = [...registeredUsers, data];
    setRegisteredUsers(arr);
    // setLoggedInUser(data);
    // localStorage.setItem("LoggedInUser", JSON.stringify(data));
    localStorage.setItem("RegisteredUsers", JSON.stringify(arr));
    reset();
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 font-sans">
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="bg-[#C8F400] w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="fill-black text-black" size={20} />
          </div>
          <span className="font-bold text-xl">
            Sky<span className="text-[#C8F400]">Mart</span>
          </span>
        </div>

        {/* Register Card */}
        <div className="p-5 sm:p-6 md:p-8 bg-[#111111] rounded-2xl border border-zinc-800">
          {/* Heading */}
          <div>
            <h2 className="font-bold text-xl sm:text-2xl mb-1">
              Create account
            </h2>
            <p className="text-white/40 text-sm mb-6 sm:mb-8">
              Join SkyMart and start shopping
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-3.5 sm:gap-4"
          >
            {/* Full Name */}
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 shrink-0 pointer-events-none"
              />
              <input
                {...register("name", { required: "Full name is required" })}
                type="text"
                placeholder="Full name"
                autoComplete="name"
                className="w-full bg-[#1D1D1D] text-white text-sm outline-none placeholder:text-white/40 pl-11 pr-4 py-3 rounded-xl border border-[#ffffff1a] focus:border-[#C8F400] transition-colors"
              />
            </div>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            {/* Email */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 shrink-0 pointer-events-none"
              />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="w-full bg-[#1D1D1D] text-white text-sm outline-none placeholder:text-white/40 pl-11 pr-4 py-3 rounded-xl border border-[#ffffff1a] focus:border-[#C8F400] transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 shrink-0 pointer-events-none"
              />
              <input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol",
                  },
                  minLength: {
                    value: 8,
                    message: "Mininum 6 characters are required",
                  },
                  maxLength: {
                    value: 8,
                    message: "Maximum 6 characters are required",
                  },
                })}
                placeholder="Password (min 6 chars)"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                className="w-full bg-[#1D1D1D] text-white text-sm outline-none placeholder:text-white/40 pl-11 pr-11 py-3 rounded-xl border border-[#ffffff1a] focus:border-[#C8F400] transition-colors"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#C8F400] shrink-0"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 shrink-0 pointer-events-none"
              />
              <input
                {...register("confirmpassword", {
                  required: "Confirm password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol",
                  },
                  minLength: {
                    value: 8,
                    message: "Mininum 8 characters are required",
                  },
                  maxLength: {
                    value: 8,
                    message: "Maximum 8 characters are required",
                  },
                })}
                type="password"
                placeholder="Confirm password"
                autoComplete="new-password"
                className="w-full bg-[#1D1D1D] text-white text-sm outline-none placeholder:text-white/40 pl-11 pr-4 py-3 rounded-xl border border-[#ffffff1a] focus:border-[#C8F400] transition-colors"
              />
            </div>
            {errors.confirmpassword && (
              <p className="text-red-500">{errors.confirmpassword.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-[#C8F400] text-black text-sm sm:text-base font-bold rounded-xl hover:bg-[#b7df00] transition-colors"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-5 sm:mt-6 text-center text-sm">
            <p className="text-white/40">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-[#C8F400] font-bold cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
