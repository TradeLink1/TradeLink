import { useState } from "react";

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    categoryType: "product",
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

    if (!formData.name.trim()) newErrors.name = "Product/Service name is required";
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("categoryType", formData.categoryType);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      console.log("Prepared product data:", Object.fromEntries(formDataToSend));
      alert("Product uploaded successfully! (Not sent to backend yet)");
    }
  };

  return (
    <div className="p-6 bg-[#fbf2e7] min-h-screen max-w-[1200px]">
      <h2 className="text-2xl font-bold text-[#f89216] mb-6 text-center">
        Upload Product / Service
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded space-y-4">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-[#333333] text-center">Product/Service Name</label>
            <input
              type="text"
              name="name"
              className="border-2 border-gray-400 p-2 w-full rounded mt-2 outline-0"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-semibold text-[#333333] text-center">Product / Service Price</label>
            <input
              type="number"
              name="price"
              className="border-2 border-gray-400 mt-2 p-2 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-[#333333] text-center">Category Type</label>
            <select
              name="categoryType"
              className="border-2 border-gray-400 mt-2 p-2 w-full rounded text-[#333333] font-semibold text-lg outline-0"
              style={{
                scrollbarColor: "#f89216 white ", 
              }}
              onChange={handleChange}
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
            {errors.categoryType && <p className="text-red-500">{errors.categoryType}</p>}
          </div>

          <div>
            <label className="block font-semibold text-[#333333] text-center">Category</label>
            <select
              name="category"
              className="border-2 border-gray-400 mt-2 p-2 w-full rounded text-[#333333] font-semibold text-lg outline-0"
              style={{
                scrollbarColor: "#333333 white ",
              
              }}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {formData.categoryType === "product" ? (
                <>
                  <option value="grocery">Groceries & Essential Items</option>
                  <option value="local">Local Perishable Items</option>
                  <option value="fashion">Fashion & Clothings</option>
                  <option value="home">Home & Kitchen Items</option>
                  <option value="building">Building & Hardwares</option>
                  <option value="electronics">Electronic & Gadgets</option>
                  <option value="autoparts">Auto Parts</option>

                </>
              ) : (
                <>
                  <option value="hair">Hair Stylist</option>
                  <option value="fashion">Fashion Designer</option>
                  <option value="caterer">Caterer</option>
                  <option value="plumbing">Plumber</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="photographer">Photographer</option>
                  <option value="electrician">Electrician</option>
                </>
              )}
            </select>
            {errors.category && <p className="text-red-500">{errors.category}</p>}
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-[#333333] text-center">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              className="border-2 border-gray-400 mt-2 p-2 w-full rounded outline-0"
              onChange={handleChange}

            />
            {errors.stock && <p className="text-red-500">{errors.stock}</p>}
          </div>

          <div>
            <label className="block font-semibold text-[#333333] text-center">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="border-2 mt-2 p-2 border-gray-400 w-full rounded outline-0"
              onChange={handleChange}
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>
        </div>

    
        <div>
          <label className="block font-semibold text-[#333333] text-center">Description</label>
          <textarea
            name="description"
            className="border-2 mt-2 p-2 w-full border-gray-400 rounded outline-0"
            onChange={handleChange}
          ></textarea>
        </div>
          <div className="flex justify-center items-center pt-10 ">
        {/* Submit */}
        <button type="submit" className="hover:bg-[#30ac57] py-2 text-[18px]  text-[#333333] px-10  rounded-4xl border-2 border-[#f89216] hover:text-white">
          Upload
        </button></div>
      </form>
    </div>
  );
};

export default UploadProduct;
