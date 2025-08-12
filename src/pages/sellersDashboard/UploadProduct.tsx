import { useState } from "react";

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    categoryType: "product", // "product" or "service"
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null as File | null,
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

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.categoryType) newErrors.categoryType = "Category type is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Price must be a valid number";
    if (!formData.stock || isNaN(Number(formData.stock)))
      newErrors.stock = "Stock must be a valid number";
    if (!formData.image) newErrors.image = "Please upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Product Data:", formData);
      alert("Product uploaded successfully!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Upload Product / Service</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded space-y-4">

        {/* Name & Price Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium">Product Price</label>
            <input
              type="number"
              name="price"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
        </div>

        {/* Category Type & Category Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Category Type</label>
            <select
              name="categoryType"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
            {errors.categoryType && <p className="text-red-500">{errors.categoryType}</p>}
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <select
              name="category"
              className="border p-2 w-full rounded"
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {formData.categoryType === "product" ? (
                <>
                  <option value="grocery">Groceries & Essentials</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                </>
              ) : (
                <>
                  <option value="hair">Hair Styling</option>
                  <option value="cleaning">House Cleaning</option>
                  <option value="catering">Catering</option>
                  <option value="plumbing">Plumbing</option>
                </>
              )}
            </select>
            {errors.category && <p className="text-red-500">{errors.category}</p>}
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />
          {errors.stock && <p className="text-red-500">{errors.stock}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border p-2 w-full rounded"
            onChange={handleChange}
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;