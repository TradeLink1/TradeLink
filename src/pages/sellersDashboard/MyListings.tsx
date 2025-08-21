import { useState } from "react";
import tomatoes from "../../assets/images/listing-images/tomatoes.jpg"
import shoes from "../../assets/images/listing-images/shoes.jpg"
import airpods from "../../assets/images/listing-images/airpods.jpg"
import braids from "../../assets/images/listing-images/braids.jpg"
import blazzers from "../../assets/images/listing-images/blazzer.jpg"
import cake from "../../assets/images/listing-images/cake.jpg"

const MyListings = () => {
  const [activeTab, setActiveTab] = useState("products");

  const products = [
    {
      id: 1,
      name:"Fresh Tomatoes", 
      category: "Local & perishables",
      price: 2500,
      stock: 20,
      image: tomatoes
    },
    {
      id: 2,
      name: "Men’s Sneakers",
      category: "Clothing & Fashion",
      price: 18000,
      stock: 10,
      image: shoes
    },
   
    {
      id:4,
      name:"Airpods",
      category:"Electronics & Gadgets",
      price: 25000,
      stock:12,
      image:airpods

    },
  ];

  const services = [
    {
      id: 1,
      name: "Beautiful Braids",
      category: "Hair Styling",
      price: 7000,
      stock: null,
      image: braids
    },
    {
      id: 2,
      name: "Blazzer's",
      category: "Fashion Design",
      price: 10000,
      stock: null,
      image: blazzers
    },
        {
      id: 3,
      name: "Bridal Cake",
      category: "Catering",
      price: 50000,
      stock: null,
      image:cake
    }
  ];

  const handleDelete = (id: number, type: string) => {
    if (type === "products") {
      alert(`Deleted product with id: ${id}`);
    } else {
      alert(`Deleted service with id: ${id}`);
    }
  };

  const renderItems = (items: any[], type: string) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {items.map(item => (
        <div key={item.id} className="bg-white p-4 shadow rounded">
          <img src={item.image} alt={item.name} className="w-full h-60 object-cover rounded" />
          <h3 className="mt-2 text-lg font-semibold text-[#f89216]">{item.name}</h3>
          <p className="text-[#333333]">{item.category}</p>
          {item.price && <p className="text-[#30ac57] font-bold">₦{item.price}</p>}
          {item.stock !== null && <p className="text-sm text-[#333333]">Stock: {item.stock}</p>}
          
          <div className="flex gap-2 mt-4">
            <button className="bg-[#f89216] text-white px-3 py-1 rounded cursor-pointer">Edit</button>
            <button 
              onClick={() => handleDelete(item.id, type)}
              className="bg-[#30ac57] text-white px-3 py-1 rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-[#fbf2e7] min-h-screen max-w-[1200px]">
      <h2 className="text-2xl text-[#f29816] font-bold mb-6">My Listings</h2>

    
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "products" ? "bg-[#30ac57] text-white" : "bg-[#f29816] text-white"}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "services" ? "bg-[#30ac57] text-white" : "bg-[#f29816] text-white"}`}
        >
          Services
        </button>
      </div>

      
      {activeTab === "products" ? renderItems(products, "products") : renderItems(services, "services")}
    </div>
  );
};

export default MyListings;
