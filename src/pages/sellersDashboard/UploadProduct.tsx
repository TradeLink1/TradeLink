"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

const UploadProduct = () => {
  const [uploadType, setUploadType] = useState("product");

  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    price: string;
    quantity: string;
    description: string;
    imageFile: File | null;
  }>({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    imageFile: null,
  });

  type ErrorFields = {
    name?: string;
    category?: string;
    price?: string;
    quantity?: string;
    imageFile?: string;
    description?: string;
    submit?: string;
  };

  const [errors, setErrors] = useState<ErrorFields>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors: ErrorFields = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Price must be a valid number";

    if (
      uploadType === "product" &&
      (!formData.quantity || isNaN(Number(formData.quantity)))
    ) {
      newErrors.quantity = "Quantity must be a valid number";
    }

    if (!formData.imageFile) {
      newErrors.imageFile = `A ${uploadType} image is required`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("description", formData.description);

        if (uploadType === "product") {
          formDataToSend.append("quantity", formData.quantity);
          if (formData.imageFile) {
            formDataToSend.append("image", formData.imageFile);
          }
        } else {
          if (formData.imageFile) {
            formDataToSend.append("serviceImg", formData.imageFile);
          }
        }

        const endpoint =
          uploadType === "product"
            ? "/api/v1/products/create"
            : "/api/v1/services/create";

        const response = await api.post(endpoint, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(`${uploadType} created successfully:`, response.data);
        setSubmitSuccess(true);

        setFormData({
          name: "",
          category: "",
          price: "",
          quantity: "",
          description: "",
          imageFile: null,
        });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) (fileInput as HTMLInputElement).value = "";
      } catch (error) {
        if (typeof error === "object" && error !== null) {
          const err = error as {
            message?: string;
            response?: { status?: number; data?: any };
          };
          console.error("Error creating " + uploadType, {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });

          if (err.response?.data?.errors) {
            setErrors(err.response.data.errors);
          } else {
            setErrors({
              submit:
                err.response?.data?.message ||
                `Failed to upload ${uploadType}. Please try again.`,
            });
          }
        } else {
          console.error("Error creating " + uploadType, error);
          setErrors({
            submit: `Failed to upload ${uploadType}. Please try again.`,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-[30px] shadow-lg p-8">
        <h2 className="text-[30px] leading-8 font-bold text-center text-[#f89216] max-mobile:text-[25px] mb-8">
          Upload {uploadType === "product" ? "Product" : "Service"}
        </h2>
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {uploadType === "product" ? "Product" : "Service"} uploaded
            successfully!
            <button
              onClick={() => setSubmitSuccess(false)}
              className="ml-2 text-green-800 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
            {errors.submit}
          </div>
        )}

        <div className="relative flex w-72 mx-auto mb-8 bg-[#f8921651] rounded-full p-1">
          <motion.div
            layout
            className="absolute top-1 bottom-1 w-1/2 bg-[#f89216] rounded-full"
            initial={false}
            animate={{
              x: uploadType === "product" ? 0 : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          <button
            onClick={() => setUploadType("product")}
            className={`relative z-10 flex-1 text-center font-semibold py-2 transition-colors ${
              uploadType === "product" ? "text-white" : "text-gray-600"
            }`}
          >
            Product
          </button>
          <button
            onClick={() => setUploadType("service")}
            className={`relative z-10 flex-1 text-center font-semibold py-2 transition-colors ${
              uploadType === "service" ? "text-white" : "text-gray-600"
            }`}
          >
            Service
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {uploadType === "product" ? "Product Name" : "Service Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              className="w-full border border-gray-300 rounded-full p-3 bg-white focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {uploadType === "product" ? (
                <>
                  <option value="Groceries & Essentials">
                    Groceries & Essentials
                  </option>
                  <option value="Fresh & Perishables">
                    Fresh & Perishables
                  </option>
                  <option value="Fashion & Clothing">Fashion & Clothing</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Building Materials & Hardware">
                    Building Materials & Hardware
                  </option>
                  <option value="Electronics & Gadgets">
                    Electronics & Gadgets
                  </option>
                  <option value="Automobile & Parts">Automobile & Parts</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Toys, Baby & Kids">Toys, Baby & Kids</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Books, Stationery & Office">
                    Books, Stationery & Office
                  </option>
                </>
              ) : (
                <>
                  <option value="Hair Stylist">Hair Stylist</option>
                  <option value="Fashion Designer">Fashion Designer</option>
                  <option value="Caterer">Caterer</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Makeup Artist">Makeup Artist</option>
                  <option value="Barber">Barber</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Car Wash">Car Wash</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          {uploadType === "product" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
                onChange={handleChange}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="w-full border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            />
            {errors.imageFile && (
              <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              rows={4}
              className="w-full border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-[#f89216] outline-none"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-10 py-3 text-lg font-semibold text-white rounded-full shadow transform transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#f89216] hover:bg-[#333333] hover:scale-105"
              }`}
            >
              {isLoading
                ? "Uploading..."
                : `Upload ${uploadType === "product" ? "Product" : "Service"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
