import React, { useContext } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Zap } from "lucide-react";
import { MyStore } from "../context/MyContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";

const Login = () => {
  const { showPassword, setShowPassword } = useContext(MyStore);
  const { loggedInUser, setLoggedInUser, registeredUsers } = useContext(Auth);
  let navigate = useNavigate();

  const statsData = [
    { value: "20K+", label: "Products" },
    { value: "50K+", label: "Users" },
    { value: "4.9★", label: "Rating" },
  ];

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formSubmit = (data) => {
    let user = registeredUsers.find((val) => {
      return val.email === data.email && val.password === data.password;
    });

    if (!user) {
      alert("user not found");
      reset();
      return;
    }

    setLoggedInUser(user);
    localStorage.setItem("LoggedInUser", JSON.stringify(user));
    reset();
    navigate("/main");
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#111111]">
      {/* Left Section (Hero & Stats) - Hidden on Mobile/Tablet */}
      <div className="hidden lg:flex min-h-screen text-white p-12 flex-col justify-between font-sans bg-[#111111]">
        <div>
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="bg-[#a3e635] w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="fill-black text-black" size={22} />
            </div>
            <span className="font-bold text-3xl tracking-tight">
              Sky<span className="text-[#a3e635]">Mart</span>
            </span>
          </div>

          {/* Hero Content */}
          <div className="pt-16 pb-12 max-w-xl">
            <p className="text-[#a3e635] uppercase font-bold text-sm tracking-wider mb-4">
              WELCOME BACK
            </p>
            <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Shop the future.
              <span className="text-[#a3e635] block mt-1">Today.</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Thousands of products, lightning-fast delivery, and prices that
              make your wallet happy.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl pt-4">
            {statsData.map((val, index) => (
              <div
                key={index}
                className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 text-center"
              >
                <h2 className="text-2xl font-bold text-[#a3e635] mb-1">
                  {val.value}
                </h2>
                <p className="text-zinc-400 text-sm">{val.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section (Login Form) - Added lg:border-l lg:border-zinc-800 for the gray line */}
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-6 sm:px-6 lg:border-l lg:border-zinc-800">
        <div className="w-full max-w-md mx-auto">
          <div className="p-6 sm:p-8 bg-[#111111] rounded-2xl border border-[#ffffff1a]">
            <div>
              <h2 className="font-bold text-2xl mb-1">Sign in</h2>
              <p className="text-white/40 text-sm mb-6">
                Enter your credentials to continue
              </p>
            </div>

            <form
              onSubmit={handleSubmit(formSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 bg-[#1D1D1D] px-4 py-3 rounded-xl border border-[#ffffff1a] focus-within:border-[#C8F400]">
                <Mail size={18} className="text-white/40 shrink-0" />
                <input
                  {...register("email", { required: "Email is required" })}
                  className="w-full min-w-0 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                  type="email"
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <div className="flex items-center gap-3 bg-[#1D1D1D] px-4 py-3 rounded-xl border border-[#ffffff1a] focus-within:border-[#C8F400]">
                <Lock size={18} className="text-white/40 shrink-0" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Mininum 8 characters are required",
                    },
                    maxLength: {
                      value: 8,
                      message: "Maximum 8 characters are required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol",
                    },
                  })}
                  className="w-full min-w-0 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                />

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="text-white/40 hover:text-[#C8F400] shrink-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-[#9AE600] text-black font-bold rounded-xl hover:bg-[#BBF451] transition-colors"
              >
                Sign in <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-white/40">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-[#9AE600] font-bold cursor-pointer"
                >
                  Create one
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
