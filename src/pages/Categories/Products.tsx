import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import Button from "../../components/reusable/Button";
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Categories");
  const [sellers, setSellers] = useState<any[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<any[]>([]);
  const navigate = useNavigate();

  // ✅ Fetch sellers from API
  useEffect(() => {
    fetch("https://tradelink-backend-5a6c.onrender.com/api/v1/sellers/get/all/sellers", {
      headers: {
        "Content-Type": "application/json",
        // If token needed:
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSellers(data.sellers || []);
        setFilteredSellers(data.sellers || []);
      })
      .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  // 🔍 Filter sellers
  const handleFilterChange = () => {
    const filtered = sellers.filter((s) => {
      const matchesQuery =
        query === "" ||
        s.storeName.toLowerCase().includes(query.toLowerCase()) ||
        (s.businessCategory || "").toLowerCase().includes(query.toLowerCase());

      const matchesLocation =
        location === "All Locations" ||
        (s.location?.address || "").toLowerCase() === location.toLowerCase();

      const matchesCategory =
        category === "All Categories" ||
        (s.businessCategory || "").toLowerCase() === category.toLowerCase();

      return matchesQuery && matchesLocation && matchesCategory;
    });

    setFilteredSellers(filtered);
  };

  const handleViewProfile = (sellerId: string) => {
    navigate(`/sellers/${sellerId}`); // ✅ Goes to SellerProfile.tsx
  };

  return (
    <div className="max-w-[1280px] mt-20 mx-auto px-4 py-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 grid gap-4 md:grid-cols-4">
        {/* Search */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Search sellers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <MapPin size={16} className="text-gray-500" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Locations</option>
            {[...new Set(sellers.map((s) => s.location?.address).filter(Boolean))].map(
              (loc) => (
                <option key={loc}>{loc}</option>
              )
            )}
          </select>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Briefcase size={16} className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Categories</option>
            {[...new Set(sellers.map((s) => s.businessCategory).filter(Boolean))].map(
              (cat) => (
                <option key={cat}>{cat}</option>
              )
            )}
          </select>
        </div>

        {/* Apply Filters */}
        <Button
          className="flex items-center justify-center gap-2 text-sm"
          onClick={handleFilterChange}
        >
          Apply Filters
        </Button>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-4">
        {filteredSellers.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No sellers found.
          </p>
        ) : (
          filteredSellers.map((s) => (
            <div
              key={s._id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
              onClick={() => handleViewProfile(s._id)}
            >
              <div className="relative">
                <img
                  src={s.logo || "https://via.placeholder.com/150"}
                  alt={s.storeName}
                  className="h-28 w-full object-cover rounded mb-3"
                />
              </div>

              <h3 className="font-semibold text-lg sm:text-sm text-orange-600">
                {s.businessCategory || "Uncategorized"}
              </h3>
              <p className="font-medium text-[11px] sm:text-xs text-gray-800">
                {s.storeName}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {s.location?.address || "No address"}
              </p>
              <p className="text-[12px] text-gray-600">
                📞 {s.phone || "N/A"}
              </p>
              <Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600 text-xs py-1.5">
                View Profile
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
