import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SellerProfile() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!sellerId) return;

    // ✅ Fetch seller profile
    fetch(`https://tradelink-backend-6z6y.onrender.com/api/v1/sellers/get/profile?id=${sellerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSeller(data.seller);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching seller:", err);
        setLoading(false);
      });

    // ✅ Fetch seller products
    fetch(`https://tradelink-backend-6z6y.onrender.com/api/v1/products/seller/${sellerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Error fetching products:", err));

    // ✅ Fetch messages
    fetch(`https://tradelink-backend-6z6y.onrender.com/api/v1/messages/get/all/conversation/${sellerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [sellerId, token]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    fetch(`https://tradelink-backend-6z6y.onrender.com/api/v1/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        senderId: currentUserId,
        receiverId: sellerId,
        text: newMessage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [...prev, data.message]);
        setNewMessage("");
      })
      .catch((err) => console.error("Error sending message:", err));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!seller) return <div className="p-6">Seller not found.</div>;

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-20 bg-yellow-50 min-h-screen">
      {/* Back */}
      <Link to="/sellers" className="text-blue-600 underline mb-6 block">
        ← Back to Sellers
      </Link>

      {/* Seller Info */}
      <div className="bg-white p-6 rounded-2xl shadow flex flex-col sm:flex-row gap-6 items-center mb-10">
        <img
          src={seller.logo || "https://via.placeholder.com/150"}
          alt={seller.storeName}
          className="h-32 w-32 rounded-full object-cover shadow"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{seller.storeName}</h1>
          <p className="text-gray-600">📍 {seller.location?.address}</p>
          <p className="text-gray-500">📧 {seller.email}</p>
          <p className="text-gray-500">📞 {seller.phone}</p>
          <p className="text-gray-700">🏷 {seller.businessCategory}</p>
          {seller.description && <p className="mt-2 text-gray-600">{seller.description}</p>}
        </div>
      </div>

      {/* Products */}
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col"
            >
              <img
                src={product.productImg?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="h-28 w-full object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-sm text-orange-600">{product.name}</h3>
              <p className="text-xs text-gray-700">₦{product.price.toLocaleString()}</p>
              <p className="text-[10px] text-gray-500">Qty: {product.quantity}</p>
              <p className="text-[11px] text-gray-400">{product.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
        <div className="bg-[#F89216] text-white px-4 py-2 font-semibold">
          Chat with {seller.storeName}
        </div>
        <div className="flex-1 p-3 overflow-y-auto max-h-60">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${msg.senderId === currentUserId ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.senderId === currentUserId
                      ? "bg-[#F89216] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="p-2 flex gap-2 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-[#F89216] text-white px-4 py-2 rounded text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
