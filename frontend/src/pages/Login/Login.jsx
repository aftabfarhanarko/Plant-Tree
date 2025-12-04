import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const handelLogin = (data) => {
    const email = data.email;
    const password = data.password;
    console.log("This is UHgyfwe7u8ih", { email, password });

    signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Login Successful");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-200 via-white to-lime-100 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute w-72 h-72 bg-lime-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white/40 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Main Card */}
      <div
        className="flex flex-col w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-2xl bg-white/60 border border-white/40 relative z-10
        hover:shadow-[0_0_50px_rgba(163,230,53,0.4)] transition-all duration-500"
      >
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-lime-600 font-medium transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 transform transition-transform duration-200 group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back Home
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide drop-shadow-md">
            Log In
          </h1>
          <p className="text-sm text-gray-700 mt-1 opacity-80">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handelLogin)}
          noValidate=""
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Email */}
            <div className="group">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                className="
              w-full px-4 py-3 border rounded-lg bg-gray-100 
              focus:ring-2 focus:ring-lime-500 focus:outline-none border-lime-400 focus:bg-white 
              shadow-sm 
              group-hover:shadow-lg group-hover:shadow-lime-200 
              transition-all duration-300
            "
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required!</p>
              )}
            </div>

            {/* Password */}
            <div className="group relative">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type={show ? "password" : "text"}
                {...register("password", { required: true })}
                placeholder="*******"
                className="
              w-full px-4 py-3 border  rounded-lg bg-gray-100
              focus:ring-2 focus:ring-lime-500 focus:outline-none border-lime-400 focus:bg-white
              shadow-sm 
              group-hover:shadow-lg group-hover:shadow-lime-200
              transition-all duration-300
            "
              />

              <div
                className=" absolute right-3 top-10.5"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required!
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
          w-full py-3 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 
          text-white text-lg font-semibold tracking-wide 
          shadow-xl hover:shadow-[0_0_25px_rgba(163,230,53,0.7)] 
          hover:scale-[1.02] active:scale-95 
          transition-all duration-300
        "
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-right">
          <button className="text-xs text-gray-500 hover:text-lime-600 hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-gray-300" />
          <p className="text-xs text-gray-600">OR</p>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="
        group relative flex items-center justify-center gap-3 py-3 
        rounded-xl cursor-pointer bg-gray-100 
        shadow-[6px_6px_15px_#cfcfcf,-6px_-6px_15px_#ffffff]
        hover:shadow-[10px_10px_30px_#cfcfcf,-10px_-10px_30px_#ffffff]
        transition-all duration-300 ease-out border border-gray-200
      "
        >
          {/* Glow Effect */}
          <span
            className="
          absolute inset-0 rounded-xl bg-gradient-to-br
          from-white/10 to-lime-300/30 blur-xl opacity-0
          group-hover:opacity-100 transition duration-700
        "
          />

          <FcGoogle
            size={28}
            className="relative z-10 group-hover:scale-125 transition-transform duration-500"
          />

          <p className="relative z-10 text-gray-800 font-semibold tracking-wide group-hover:text-lime-600 transition duration-300">
            Continue with Google
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            state={from}
            className="text-lime-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
