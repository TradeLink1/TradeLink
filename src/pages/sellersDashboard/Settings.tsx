import { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "seller@example.com", // dummy
    phone: "",
    address: "",
    logo: null as File | null,
    description: "",
    businessCategory: "",
    notifications: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Settings Saved:", formData);
    alert("Settings saved successfully (dummy). Backend will handle real save.");
  };

  const handleDeactivate = () => {
    alert("Your account has been deactivated (dummy). Backend will handle this later.");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted (dummy). Backend will handle real delete.");
    }
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#fbf2e7" }}>
      <h2 className="text-2xl font-bold mb-6 text-[#f89216]">Settings</h2>

      {/* Preview Section */}
      <div className="bg-white p-6 shadow-md rounded mb-6">
        <h3 className="text-lg font-semibold mb-4 text-[#30ac57]">Store Preview</h3>
        <div className="flex items-center gap-4">
          {/* Logo Preview */}
          <div className="w-20 h-20 border rounded flex items-center justify-center overflow-hidden">
            {formData.logo ? (
              <img
                src={URL.createObjectURL(formData.logo)}
                alt="Logo Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Logo</span>
            )}
          </div>

          {/* Store Info */}
          <div>
            <p className="font-bold text-lg text-[#f89216]">
              {formData.name || "Business Name"}
            </p>
            <p className="text-sm text-gray-500">
              {formData.description || "Store description will appear here..."}
            </p>
            <p className="text-xs text-[#30ac57] mt-1">
              {formData.businessCategory
                ? formData.businessCategory.toUpperCase()
                : "No Category"}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded space-y-6"
      >
        {/* Profile Info */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-[#30ac57]">
            Profile Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Name / Business Name</label>
              <input
                type="text"
                name="name"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                // disabled
                // readOnly
                onChange={handleChange}
                className="border p-2 w-full rounded "
              />
            </div>
            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="address"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Store Settings */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-[#30ac57]">Store Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Store Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="block font-medium">Business Category</label>
              <select
                name="businessCategory"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="products">Products</option>
                <option value="services">Services</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        </section>

        {/* Account Settings */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-[#30ac57]">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="border p-2 w-full rounded"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <label className="font-medium">Enable Notifications</label>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-[#30ac57] hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Save Settings
        </button>
      </form>

      {/* Danger Zone */}
      <div className="bg-white p-6 shadow-md rounded mt-6 border border-[#f89216]">
        <h3 className="text-lg font-semibold text-[#30ac57] mb-4">Danger Zone</h3>
        <p className="text-sm text-gray-600 mb-4">
          Be careful! These actions cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleDeactivate}
            className="bg-[#f89216] hover:bg-[#333333] text-white px-4 py-2 rounded cursor-pointer"
          >
            Deactivate Account
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
