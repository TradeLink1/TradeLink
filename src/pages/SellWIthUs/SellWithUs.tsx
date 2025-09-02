"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoIosPeople } from "react-icons/io"
import { MdManageAccounts } from "react-icons/md"
import { TbBulb } from "react-icons/tb"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import api from "../../api/axios" // 👈 your axios instance

// BENEFITS DATA
const benefits = [
  {
    icon: <IoIosPeople size={50} color="#333333" />,
    title: "Reach More Customers",
    text: "Expand your business reach by showcasing your products and services online.",
  },
  {
    icon: <MdManageAccounts size={40} color="#333333" />,
    title: "Easy to Manage",
    text: "Manage listings, track messages, and update products easily in your dashboard.",
  },
  {
    icon: <TbBulb size={40} color="#333333" />,
    title: "Build Your Brand",
    text: "Showcase your business professionally and stand out from competitors.",
  },
]

const SellWithUs = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessLevel: "",
    category: "",
    address: "",
    description: "",
    // sampleImage: null as File | null, // ❌ commented out upload image
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<any>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showResendModal, setShowResendModal] = useState(false)
  const [resendEmail, setResendEmail] = useState("")
  const [resendLoading, setResendLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  const validateForm = () => {
    const newErrors: any = {}
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required"
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.businessLevel) newErrors.businessLevel = "Select a business level"
    if (!formData.category) newErrors.category = "Select a category"
    if (!formData.password.trim()) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Registration + Email Verification
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setLoading(true)

      const payload = {
        name: formData.ownerName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        storeName: formData.businessName,
        businessLevel: formData.businessLevel,
        category: formData.category,
        address: formData.address,
        description: formData.description,
        // sampleImage: formData.sampleImage, // ❌ commented out upload image
        role: "seller",
      }

      await api.post("/api/v1/auth/register", payload)

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Please check your email to verify your account.",
        confirmButtonColor: "#30ac57",
      })

      // Don’t log them in yet → wait for verification
      navigate("/login")
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message || "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = () => {
    setShowResendModal(true)
    setResendEmail("") // Clear previous email
  }

  const handleResendSubmit = async (e: any) => {
    e.preventDefault()

    if (!resendEmail.trim()) {
      return Swal.fire("Error", "Please enter your email address", "error")
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resendEmail)) {
      return Swal.fire("Error", "Please enter a valid email address", "error")
    }

    try {
      setResendLoading(true)

      await api.post("/api/v1/auth/resend-verification", {
        email: resendEmail,
      })

      Swal.fire({
        icon: "success",
        title: "Email Sent 📧",
        text: "Verification link has been resent to your email.",
        confirmButtonColor: "#30ac57",
      })

      setShowResendModal(false)
      setResendEmail("")
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to resend verification email",
      })
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="pt-25">
        {/* HERO SECTION */}
        <motion.section
          className="py-16 text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[42px] max-[510px]:text-[35px] text-[#333333] font-bold max-mobile:text-[25px] mb-2">
            Start Selling on TradeLink
          </h1>
          <p className="mb-6 text-[23px] max-tablet:text-[20px] font-medium text-[#333333] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:mx-auto">
            Join thousands of sellers connecting with more customers daily.
          </p>
          <a href="#register-form">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#30ac57] text-[#ffffff] px-7 py-3 cursor-pointer rounded-[10px] font-semibold hover:text-white hover:bg-[#333333] hover:rounded-full transition-all"
            >
              Start Selling Now
            </motion.button>
          </a>
        </motion.section>

        {/* BENEFITS SECTION */}
        <section className="flex flex-wrap justify-center items-center gap-6 mx-auto">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              className="w-[300px] h-max bg-[#f89216] text-white px-6 py-5 rounded-3xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {item.icon}
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </section>

        {/* REGISTRATION FORM */}
        <motion.section
          id="register-form"
          className="py-12 px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[42px] max-[510px]:text-[35px] text-[#333333] font-bold max-mobile:text-[25px] text-center mb-9">
            Seller Registration Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-[30px] grid md:grid-cols-2 gap-4 mb-20 shadow-lg"
          >
            {/* Text Inputs */}
            {[
              { name: "businessName", label: "Business Name", type: "text" },
              { name: "ownerName", label: "Seller's Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone", type: "tel" },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="block font-medium mb-2 text-[#333333]">{label}</label>
                <input
                  type={type}
                  name={name}
                  className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                  onChange={handleChange}
                />
                {errors[name] && <p className="text-red-500">{errors[name]}</p>}
              </div>
            ))}

            {/* Business Level */}
            <div>
              <label className="block font-medium mb-2 text-[#333333]">Business Level</label>
              <select
                name="businessLevel"
                className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                onChange={handleChange}
              >
                <option value="">-- Select Level --</option>
                <option value="individual">Individual Seller</option>
                <option value="small">Small Business</option>
                <option value="enterprise">Large Enterprise</option>
              </select>
              {errors.businessLevel && <p className="text-red-500">{errors.businessLevel}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium mb-2 text-[#333333]">Category</label>
              <select
                name="category"
                className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>
                <option value="products">Products</option>
                <option value="services">Services</option>
              </select>
              {errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2 text-[#333333]">Business Address</label>
              <input
                type="text"
                name="address"
                className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-2 text-[#333333]">Business Description</label>
              <textarea
                name="description"
                className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-2xl outline-none transition-all duration-200"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Upload Sample - Commented Out */}
            {/*
            <div className="md:col-span-2">
              <label className="block font-medium mb-2 text-[#333333]">Upload Sample (Optional)</label>
              <input
                type="file"
                name="sampleImage"
                accept="image/*"
                className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                onChange={handleChange}
              />
            </div>
            */}

            {/* Passwords */}
            {[
              {
                name: "password",
                label: "Password",
                show: showPassword,
                setShow: setShowPassword,
              },
              {
                name: "confirmPassword",
                label: "Confirm Password",
                show: showConfirmPassword,
                setShow: setShowConfirmPassword,
              },
            ].map(({ name, label, show, setShow }) => (
              <div key={name} className="relative">
                <label className="block font-medium mb-2 text-[#333333]">{label}</label>
                <input
                  type={show ? "text" : "password"}
                  name={name}
                  className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-15 transform -translate-y-1/2 text-gray-500"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors[name] && <p className="text-red-500">{errors[name]}</p>}
              </div>
            ))}

            {/* Submit */}
            <div className="md:col-span-2 text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="bg-[#f89216] mt-6 text-[#ffffff] px-7 py-3 cursor-pointer rounded-[10px] font-semibold hover:text-white hover:bg-[#30ac57] hover:rounded-full transition-all disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register as Seller"}
              </motion.button>

              <p className="mt-4 text-gray-600">
                Didn't get the email?{" "}
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-[#30ac57] font-semibold hover:underline"
                >
                  Resend Verification
                </button>
              </p>
            </div>
          </form>
        </motion.section>
      </div>

      {/* Resend Modal */}
      {showResendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-[#333333] mb-4 text-center">Resend Verification Email</h3>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address to receive a new verification link.
            </p>

            <form onSubmit={handleResendSubmit}>
              <div className="mb-6">
                <label className="block font-medium mb-2 text-[#333333]">Email Address</label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border-2 border-gray-300 focus:border-[#30ac57] focus:ring-4 focus:ring-[#30ac57]/30 p-3 w-full rounded-full outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowResendModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={resendLoading}
                  className="flex-1 bg-[#30ac57] text-white py-3 rounded-full font-semibold hover:bg-[#2a9b4f] transition-all disabled:opacity-50"
                >
                  {resendLoading ? "Sending..." : "Send Email"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default SellWithUs
