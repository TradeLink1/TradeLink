import { useState, useEffect } from "react";


interface Stats {
  totalProducts: number;
  pendingOrders: number;
  totalSales: number;
  messages: number;
}

interface Order {
  id: number;
  customer: string;
  product: string;
  status: "Pending" | "Completed";
}

interface Message {
  id: number;
  sender: string;
  message: string;
}

const Overview = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    pendingOrders: 0,
    totalSales: 0,
    messages: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this with real API call later
        setStats({
          totalProducts: 12,
          pendingOrders: 3,
          totalSales: 45000,
          messages: 5,
        });

        setRecentOrders([
          { id: 1, customer: "John Doe", product: "Gas Cooker", status: "Pending" },
          { id: 2, customer: "Jane Smith", product: "Blender", status: "Completed" },
          { id: 3, customer: "Paul Adams", product: "Yam Tubers", status: "Pending" },
        ]);

        setRecentMessages([
          { id: 1, sender: "John Doe", message: "Is the gas cooker still available?" },
          { id: 2, sender: "Mary Obi", message: "Can you deliver to Lagos Island?" },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fbf2e7] p-6 max-w-[1280px]">

      <h1 className="text-2xl font-bold mb-4 text-[#f89216]">
        Welcome back, <span className="text-[]">Rose’s Kitchen!</span>
      </h1>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        {[
          { label: "Total Products", value: stats.totalProducts },
          { label: "Pending Orders", value: stats.pendingOrders },
          { label: "Total Sales", value: `₦${stats.totalSales.toLocaleString()}` },
          { label: "Messages", value: stats.messages },
        ].map((item, index) => (
          <div key={index} className=" bg-white text-[#f89216] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#333333]">{item.label}</h2>
            <p className="text-3xl font-bold text-[#f89216]">{item.value}</p>
          </div>
        ))}
      </div>

    
      <div className="bg-[white] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#333333]">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <table className="w-full border-collapse">
            <thead >
              <tr className="bg-[#f89216] text-left  ">
                <th className="p-2 text-white text-[18px] font-bold">Customer</th>
                <th className="p-2 text-white text-[18px] font-bold">Product</th>
                <th className="p-2 text-white text-[18px] font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b ">
                  <td className="p-2 text-[#333333] font-bold ">{order.customer}</td>
                  <td className="p-2 text-[#333333] font-bold">{order.product}</td>
                  <td
                    className={`p-2 font-bold ${
                      order.status === "Pending" ? "text-[#333333]" : "text-[#f89216]"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent orders found.</p>
        )}
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#f89216]">Recent Messages</h2>
        {recentMessages.length > 0 ? (
          <ul className="space-y-2">
            {recentMessages.map((msg) => (
              <li key={msg.id} className="border-b pb-2 text-[#333333] font-bold">
                <strong>{msg.sender}:</strong> {msg.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Overview; 
