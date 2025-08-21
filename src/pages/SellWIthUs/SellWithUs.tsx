import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellWithUs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessLevel: "",
    category: "",
    address: "",
    description: "",
    sampleImage: null as File | null,
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.businessLevel)
      newErrors.businessLevel = "Select a business level";
    if (!formData.category) newErrors.category = "Select a category";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Seller Registration Data:", formData);
      alert("Seller registered successfully!");

      navigate("/login");
    }
  };

  return (
    <div className="bg-[#fbf2e7] min-h-screen pt-25">
      {/* HERO SECTION */}
      <section className="bg-[#fb2e7] text- py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Start Selling on <span className="text-[#f89216]"> TradeLink </span>
        </h1>
        <p className="mb-6 text-lg text-[#333333]">
          Join thousands of sellers connecting with more customers daily.
        </p>
        <a href="#register-form">
          <button className="bg-[#30ac57] text-white px-6 py-3 rounded font-semibold hover:bg-[#e78110]">
            Start Selling Now
          </button>
        </a>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-[#f89216] shadow-lg p-6 rounded">
          <h3 className="font-bold text-lg mb-2 text-white">
            Reach More Customers
          </h3>
          <p className="text-white">
            Expand your business reach by showcasing your products and services
            online.
          </p>
        </div>
        <div className="bg-[#f89216] shadow-lg  text-white p-6 rounded">
          <h3 className="font-bold text-lg mb-2">Easy to Manage</h3>
          <p>
            Manage listings, track messages, and update products easily in your
            dashboard.
          </p>
        </div>
        <div className="bg-[#f89216] text-white shadow-lg p-6 rounded ">
          <h3 className="font-bold text-lg mb-2">Build Your Brand</h3>
          <p>
            Showcase your business professionally and stand out from
            competitors.
          </p>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="register-form" className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#30ac57]">
          Seller Registration Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded grid md:grid-cols-2 gap-6"
        >
          {/* Business Name */}
          <div>
            <label className="block font-medium text-[#333333] ">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              className="border-2 border-gray-400  p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.businessName && (
              <p className="text-red-500">{errors.businessName}</p>
            )}
          </div>

          {/* Owner Name */}
          <div>
            <label className="block font-medium text-[#333333]">
              Seller's Name
            </label>
            <input
              type="text"
              name="ownerName"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.ownerName && (
              <p className="text-red-500">{errors.ownerName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-[#333333]">Email</label>
            <input
              type="email"
              name="email"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-[#333333]">Phone</label>
            <input
              type="tel"
              name="phone"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          {/* Business Level */}
          <div>
            <label className="block font-medium text-[#333333]">
              Business Level
            </label>
            <select
              name="businessLevel"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            >
              <option value="">-- Select Level --</option>
              <option value="individual">Individual Seller</option>
              <option value="small">Small Business</option>
              <option value="enterprise">Large Enterprise</option>
            </select>
            {errors.businessLevel && (
              <p className="text-red-500">{errors.businessLevel}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-[#333333]">Category</label>
            <select
              name="category"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              <option value="products">Products</option>
              <option value="services">Services</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-medium text-[#333333]">
              Business Address
            </label>
            <input
              type="text"
              name="address"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium text-[#333333]">
              Business Description
            </label>
            <textarea
              name="description"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Upload Sample */}
          <div className="md:col-span-2">
            <label className="block font-medium text-[#333333]">
              Upload Sample (Optional)
            </label>
            <input
              type="file"
              name="sampleImage"
              accept="image/*"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium text-[#333333]">Password</label>
            <input
              type="password"
              name="password"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium text-[#333333]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="border-2 border-gray-400 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#30ac57] text-white px-6 py-3 rounded font-semibold hover:bg-green-600"
            >
              Register as Seller
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SellWithUs;
