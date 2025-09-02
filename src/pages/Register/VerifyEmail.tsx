import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios"; // your axios instance

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Invalid verification link",
        });
        return;
      }

      try {
        // adjust endpoint to match backend
        await api.post("/api/v1/auth/verify-email", { token });

        Swal.fire({
          icon: "success",
          title: "Email verified successfully 🎉",
          text: "You can now log in with your account",
        }).then(() => {
          navigate("/login");
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Verification failed",
          text: error.response?.data?.message || "Link may have expired",
        });
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return <div>Verifying your email...</div>;
};

export default VerifyEmail;
