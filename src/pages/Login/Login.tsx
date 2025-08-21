import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const handleRoleChange = (selected: "buyer" | "seller") => {
    setRole(selected);
  };

  return (
    <div className="max-w-[1200px] flex items-center justify-center min-h-screen  px-4">
      <div className=" mt-[100px] w-full max-w-md  ">
        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm hover:text-white  hover:bg-[#F89216] px-4 py-2 rounded-md  mb-6"
        >
          <FaArrowLeft />
          Back to Home
        </button>
        <div className="h-[450px] w-[400px] bg-white rounded-lg shadow-md p-6 mb-[50px]">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-[#33333] ">
            Welcome Back
          </h2>
          <p className="text-[14px] text-center text-[#33333]">
            {" "}
            Sign in to your TradeLink account{" "}
          </p>
          <div className="flex justify-between bg-[#FEF6E1] border border-[#FEF6E1] rounded-[10px] mb-6 p-1">
            <button
              onClick={() => handleRoleChange("buyer")}
              className={`px-9 py-2 rounded-[10px] text-sm ${
                role === "buyer"
                  ? "bg-[#F89216] text-white"
                  : "hover:bg-[#F89216]/30"
              }`}
            >
              I’m a buyer
            </button>
            <button
              onClick={() => handleRoleChange("seller")}
              className={`px-9 py-2 rounded-[10px] text-sm ${
                role === "seller"
                  ? "bg-[#F89216] text-white"
                  : "hover:bg-[#F89216]/30"
              }`}
            >
              I’m a seller
            </button>
          </div>

          {/* Email */}
          <div className="mb-4 text-left">
            <label className="block text-sm mb-1 text-[#333333]">
              Email Address
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1 translate-y-1/2 text-gray-500" />
            </div>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 pl-10 focus:ring-2-[#F89216] placeholder:text-sm  "
              placeholder=" Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-left">
            <label className="block text-sm mb-1 text-[#333333]">
              Password
            </label>

            <div className="relative">
              <GoLock className="absolute left-3 top-1 translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pl-10 placeholder:text-sm border rounded-md pr-10 outline-none focus:ring-2 focus:ring-[#F89216]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#F89216]" />
              Remember me
            </label>
            <button className="text-[#F89216] hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button className="px-40 bg-[#F89216] hover:bg-[#e07c0f] text-white py-2 rounded-md text-sm font-medium">
            Sign In
          </button>

          {/* Conditional Bottom Text */}
          <div className="text-center mt-4 text-sm">
            {role === "buyer" ? (
              <p>
                Don’t have an account?{" "}
                <Link to="/Signup">
                  {" "}
                  <a
                    href="#"
                    className="text-[#F89216] font-medium hover:underline"
                  >
                    Signup
                  </a>{" "}
                </Link>
              </p>
            ) : (
              <p>
                New to selling?{" "}
                <Link to="/SellerForm">
                  <a
                    href="#"
                    className="text-[#F89216] font-medium hover:underline"
                  >
                    Join as a seller
                  </a>
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
