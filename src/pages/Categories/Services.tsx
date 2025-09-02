import React, { useState, useEffect } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import Button from "../../components/reusable/Button";
import { useNavigate } from "react-router-dom";

const ServiceProviders: React.FC = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [service, setService] = useState("All Services");
  const [providers, setProviders] = useState<any[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fetch all sellers (service providers)
  useEffect(() => {
    fetch(
      "https://tradelink-backend-6z6y.onrender.com/api/v1/sellers/get/all/sellers",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.message === "Access denied. No token provided") {
          navigate("/login");
        } else {
          console.log(data);
          console.log(data.sellers);
          // setProviders(data.sellers);
          setFilteredProviders(data.sellers); // Initial population of filtered data
        }
      })
      .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  // Search sellers
  useEffect(() => {
    if (query) {
      fetch(`/api/v1/sellers/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredProviders(data.sellers);
        })
        .catch((error) => console.error("Error searching sellers:", error));
    } else {
      setFilteredProviders(providers); // Reset to all providers when query is empty
    }
  }, [query, providers]);

  const handleFilterChange = () => {
    const filtered = providers.filter(
      (p) =>
        (location === "All Locations" || p.location === location) &&
        (service === "All Services" || p.category === service)
    );
    setFilteredProviders(filtered);
  };

  const handleViewProfile = (providerId: string) => {
    navigate(`/service-provider/${providerId}`);
  };

  return (
    <div className="max-w-[1280px] mt-20 mx-auto px-4 py-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <MapPin size={16} className="text-gray-500" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Locations</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Port Harcourt</option>
            <option>Kano</option>
            <option>Enugu</option>
            <option>Ibadan</option>
            <option>Jos</option>
            <option>Benin City</option>
          </select>
        </div>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <Briefcase size={16} className="text-gray-500" />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full text-sm outline-none"
          >
            <option>All Services</option>
            <option>Plumber</option>
            <option>Electrician</option>
            <option>Carpenter</option>
            <option>Makeup Artist</option>
            <option>Tailor</option>
            <option>Hair Stylist</option>
            <option>Photographer</option>
            <option>Caterer</option>
          </select>
        </div>
        <Button
          className="flex items-center justify-center gap-2 text-sm"
          onClick={handleFilterChange}
        >
          Apply Filters
        </Button>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-4">
        {filteredProviders.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No providers found.
          </p>
        ) : (
          filteredProviders?.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col cursor-pointer"
              onClick={() => handleViewProfile(p.id)}
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-28 w-full object-cover rounded mb-3"
                />
              </div>

              <h3 className="font-semibold text-lg sm:text-sm text-orange-600">
                {p.businessCategory}
              </h3>
              <p className="font-medium text-[11px] sm:text-xs text-gray-800">
                {p.storeName}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">{p.phone}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">{p.email}</p>
              {/* <p className="text-[20px] text-yellow-600">⭐ {p.rating}</p> */}
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

export default ServiceProviders;
