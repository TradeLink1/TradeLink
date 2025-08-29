import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { motion } from "framer-motion"; 
import Swal from "sweetalert2";  
import api from "../../api/axios"; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"user" | "seller">("user");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  // ✅ Show modal if user just verified email via link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verified = params.get("verified");

    if (verified === "true") {
      Swal.fire({
        icon: "success",
        title: "Email Verified!",
        text: "Your email has been successfully verified. You can now login.",
        confirmButtonColor: "#F89216",
      });

      // Remove the query param from URL
      window.history.replaceState({}, document.title, "/login");
    }
  }, []);

  // ✅ Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Signing in...",
      text: "Please wait while we log you in",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await api.post("api/v1/auth/login", {
        email,
        password,
        role, // ✅ send selected role to backend
      });

      const { token, role: backendRole, emailVerified } = res.data;

      // ✅ Role mismatch check
      if (backendRole !== role) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Role mismatch",
          text:
            backendRole === "seller"
              ? "This account is registered as a seller. Please select 'I'm a seller'."
              : "This account is registered as a buyer. Please select 'I'm a buyer'.",
        });
        return;
      }

      // Save to localStorage properly
      localStorage.setItem("token", token);
      localStorage.setItem("role", backendRole);

      Swal.close();
      Toast.fire({
        icon: "success",
        title: "Login successful 🎉",
      });

      // Navigate based on role
      if (backendRole === "user") {
        navigate("/");
      } else if (backendRole === "seller") {
        navigate("/dashboard");
      } else {
        navigate("/"); // fallback
      }
    } catch (err: any) {
      Swal.close();

      Toast.fire({
        icon: "error",
        title: err.response?.data?.message || "Invalid email or password",
      });
    }
  };

  // ✅ Forgot Password Modal
  const handleForgotPassword = async () => {
    const { value: forgotEmail } = await Swal.fire({
      title: "Forgot Password?",
      input: "email",
      inputLabel: "Enter your registered email",
      inputPlaceholder: "example@email.com",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      confirmButtonColor: "#F89216",
      cancelButtonColor: "#333333",
    });

    if (forgotEmail) {
      Swal.fire({
        title: "Sending reset link...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        await api.post("api/v1/auth/forgot-password", { email: forgotEmail });
        Swal.close();

        Toast.fire({
          icon: "success",
          title: "Password reset link sent! 📧",
        });
        
      } catch (err: any) {
        Swal.close();
        Toast.fire({
          icon: "error",
          title: err.response?.data?.message || "Failed to send reset link",
        });
      }
    }
  };

  // ✅ Reset Password Modal (when token from email is present)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      Swal.fire({
        title: "Reset Password",
        html: `
          <input type="password" id="newPassword" class="swal2-input" placeholder="Enter new password"/>
          <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm password"/>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Reset",
        preConfirm: () => {
          const newPassword = (document.getElementById("newPassword") as HTMLInputElement)?.value;
          const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value;

          if (!newPassword || !confirmPassword) {
            Swal.showValidationMessage("Please fill in both fields");
            return;
          }

          if (newPassword !== confirmPassword) {
            Swal.showValidationMessage("Passwords do not match");
            return;
          }

          return { newPassword };
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.post("api/v1/auth/reset-password", {
              token,
              password: result.value.newPassword,
            });

            Swal.fire("Success", "Password reset successful ✅", "success");
            navigate("/login");
          } catch (error: any) {
            Swal.fire(
              "Error",
              error.response?.data?.message || "Reset failed",
              "error"
            );
          }
        }
      });
    }
  }, [navigate]);

  return (
    <section
      id="loginbg"
      className="bg-[#f89216] min-h-screen flex flex-col items-center justify-center"
    >
      <div>
        {/* Go Back Button */}
        <motion.button
          onClick={handleGoBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[14px] text-[#333333] font-normal hover:text-[#ffffff] hover:rounded-full hover:bg-[#30ac57] py-2 px-4 mb-6"
        >
          <FaArrowLeft />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-max w-[400px] max-mobile:w-[335px] bg-white rounded-[30px] shadow-md p-7"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-[#333333]">
            Welcome Back <span className="wave">👋</span>
          </h2>
          <p className="text-[14px] mb-3 text-center text-[#333333]">
            Sign in to your TradeLink account
          </p>

          {/* Role Switch */}
          <div className="flex justify-between w-max p-0.5 bg-[#f9eac5] border border-[#FEF6E1] mx-auto rounded-full mb-6">
            <button
              onClick={() => setRole("user")}
              className={`px-9 py-2 rounded-full text-sm ${
                role === "user"
                  ? "bg-[#F89216] text-white"
                  : "hover:bg-[#F89216]/30"
              }`}
            >
              I’m a buyer
            </button>
            <button
              onClick={() => setRole("seller")}
              className={`px-9 py-2 rounded-full text-sm ${
                role === "seller"
                  ? "bg-[#F89216] text-white"
                  : "hover:bg-[#F89216]/30"
              }`}
            >
              I’m a seller
            </button>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4 text-left">
              <label className="block text-sm mb-1 text-[#333333]">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-full outline-none focus:ring-2 pl-10 focus:ring-[#F89216] placeholder:text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4 text-left">
              <label className="block text-sm mb-1 text-[#333333]">
                Password
              </label>
              <div className="relative">
                <GoLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 placeholder:text-sm border rounded-full pr-10 outline-none focus:ring-2 focus:ring-[#F89216]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
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
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#F89216] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#50ac57" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-20 mx-auto flex bg-[#333333] text-white py-3 rounded-full text-sm font-medium"
            >
              Sign In
            </motion.button>
          </form>

          {/* Conditional Bottom Text */}
          <div className="text-center mt-4 text-sm">
            {role === "user" ? (
              <p>
                Don’t have an account?{" "}
                <Link
                  to="/Register"
                  className="text-[#F89216] font-medium hover:underline"
                >
                  Signup
                </Link>
              </p>
            ) : (
              <p>
                New to selling?{" "}
                <Link
                  to="/SellWithUs"
                  className="text-[#F89216] font-medium hover:underline"
                >
                  Join as a seller
                </Link>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;
