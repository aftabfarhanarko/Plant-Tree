import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const axiosw = axios;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // form submit handler
  const handelSignUp = (data) => {
    console.log("Signup User", data);
    const email = data.email;
    const password = data.password;
    const displayName = data.name;
    const profileImg = data.profileI[0];
    console.log(profileImg);

    // IBB_KEY
    createUser(email, password)
      .then((result) => {
        console.log(result);

        const fromData = new FormData();
        fromData.append("image", profileImg);
        const uriIBB = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imge_hoset
        }`;
        axiosw.post(uriIBB, fromData).then((res) => {
          const photoURL = res.data.data.url;

          updateUserProfile(displayName, photoURL).then(() => {
            toast.success("Signup Successful");
            navigate(from);
          });
        });
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
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-200 via-white to-lime-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute w-72 h-72 bg-lime-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white/40 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div
        className="flex flex-col w-full max-w-md p-10 rounded-2xl shadow-2xl backdrop-blur-2xl bg-white/60 border border-white/40 
      hover:shadow-[0_0_50px_rgba(163,230,53,0.35)] transition-all duration-500 relative z-10"
      >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-lime-600 font-medium  transition-all duration-200"
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
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide drop-shadow-md">
            Sign Up
          </h1>
          <p className="text-sm mt-5 text-gray-700  opacity-80">
            Welcome to PlantNet 🌿
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handelSignUp)}
          noValidate=""
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <div className="group">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="
              w-full px-4 py-3 border border-lime-500 rounded-lg bg-gray-100 
              focus:ring-2 focus:ring-lime-500 focus:bg-white
              shadow-sm group-hover:shadow-lime-200 focus:outline-none group-hover:shadow-lg 
              transition-all duration-300
            "
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-xs mt-1">
                  Please provide your name.
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Profile Image
              </label>
              <input
                type="file"
                {...register("profileI")}
                accept="image/*"
                className="
              block w-full text-sm border-lime-400 focus:outline-none text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:bg-lime-50 file:text-lime-700
              hover:file:bg-lime-100 bg-gray-100 border border-dashed border-lime-400 
              rounded-lg cursor-pointer focus:ring-2 focus:outline-none focus:ring-lime-400 py-2
              transition-all duration-300
            "
              />
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, JPEG (Max 2MB)
              </p>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="
              w-full px-4 py-3 border border-lime-400 rounded-lg bg-gray-100
              focus:ring-2 focus:ring-lime-500 focus:outline-none focus:bg-white
              shadow-sm group-hover:shadow-lime-200 group-hover:shadow-lg
              transition-all duration-300
            "
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <label className="block mb-1 text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type={show ? "password" : "text"}
                {...register("password")}
                placeholder="*******"
                className="
              w-full px-4 py-3 border rounded-lg border-lime-400 bg-gray-100
              focus:ring-2 focus:ring-lime-500 focus:outline-none focus:bg-white
              shadow-sm group-hover:shadow-lime-200 group-hover:shadow-lg
              transition-all duration-300
            "
              />
              <div
                className=" absolute right-3 top-10.5"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
          w-full py-3 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 
          text-white text-lg font-semibold shadow-lg
          hover:shadow-[0_0_25px_rgba(163,230,53,0.7)]
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

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-gray-300"></div>
          <p className="text-xs text-gray-600">OR</p>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        {/* Google Button (Premium) */}
        <div
          onClick={handleGoogleSignIn}
          className="
        group relative flex items-center justify-center gap-3 py-3 rounded-xl cursor-pointer bg-gray-100 
        shadow-[6px_6px_15px_#cfcfcf,-6px_-6px_15px_#ffffff]
        hover:shadow-[10px_10px_30px_#cfcfcf,-10px_-10px_30px_#ffffff]
        border border-gray-200 transition-all duration-300
      "
        >
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-lime-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
