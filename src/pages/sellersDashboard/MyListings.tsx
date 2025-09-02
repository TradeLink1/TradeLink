import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import api from "../../api/axios";

interface Listing {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity?: number | null;
  productImg?: string;
  serviceImg?: string;
}

const MyListings = () => {
  const [activeTab, setActiveTab] = useState<"products" | "services">(
    "products"
  );
  const [products, setProducts] = useState<Listing[]>([]);
  const [services, setServices] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;
        const sellerId = user?.sellerId;

        if (!sellerId) {
          setError("Seller ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch products
        const productRes = await api.get(`/api/v1/products/seller/${sellerId}`);
        setProducts(productRes.data.products || []);

        // Fetch services
        const serviceRes = await api.get(`/api/v1/services/seller/${sellerId}`);
        setServices(serviceRes.data.services || []);
      } catch (err: any) {
        setError("Failed to fetch listings.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id: string, type: "products" | "services") => {
    try {
      await api.delete(`/api/v1/${type}/${id}`);
      if (type === "products") {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(`Failed to delete ${type}:, err`);
    }
  };

  const renderListings = (items: Listing[], type: "products" | "services") => {
    if (loading) return <p>Loading {type}...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (items.length === 0) return <p>No {type} uploaded yet.</p>;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-[30px] shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.productImg || item.serviceImg || "/placeholder.jpg"}
                alt={item.name}
                className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#333333]">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-[#30ac57] font-bold mt-2">
                ₦{item.price.toLocaleString()}
              </p>
              {item.quantity != null && (
                <p className="text-sm text-gray-600 mt-1">
                  Stock: {item.quantity}
                </p>
              )}
              <div className="flex gap-3 mt-4">
                <button className="flex items-center gap-1 bg-[#F89216] hover:bg-[#30ac57] text-white px-4 py-2 rounded-full text-sm transition cursor-pointer">
                  <FiEdit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id, type)}
                  className="flex items-center gap-1 bg-[#333333] hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition cursor-pointer"
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen max-w-[1200px] mx-auto">
      <h2 className="text-3xl text-[#333333] font-bold mb-8">My Listings</h2>
      <div className="relative flex w-80 mb-8 bg-[#f892163d] rounded-full p-1">
        <motion.div
          layout
          className="absolute top-1 bottom-1 w-1/2 bg-[#F89216] rounded-full"
          initial={false}
          animate={{ x: activeTab === "products" ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
        <button
          onClick={() => setActiveTab("products")}
          className={`relative z-10 flex-1 text-center font-medium py-2 transition-colors ${
            activeTab === "products" ? "text-white" : "text-[#333333]"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`relative z-10 flex-1 text-center font-medium py-2 transition-colors ${
            activeTab === "services" ? "text-white" : "text-[#333333]"
          }`}
        >
          Services
        </button>
      </div>
      {activeTab === "products"
        ? renderListings(products, "products")
        : renderListings(services, "services")}
    </div>
  );
};

export default MyListings;