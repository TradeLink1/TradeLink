import { useState, useEffect, useMemo } from "react";
import api from "../../api/axios";
import {
  ShoppingBag,
  ClipboardList,
  DollarSign,
  MessageSquare,
} from "lucide-react";

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

interface SellerProfile {
  storeName: String;
}

const Overview = () => {
  const [seller, setSeller] = useState<SellerProfile>({ storeName: "" });
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
       const token = localStorage.getItem("token");
        if (!token) {
          console.error("No auth token found!");
          return;
        }
      try {
        const res = await api.get("api/v1/sellers/get/profile")
          

        // const token = localStorage.getItem("token");
        // if (!token) {
        //   console.error("No auth token found!");
        //   return;
        // }

        const data = res.data;
        
        console.log(res.data)
        setSeller({ storeName: data.seller.storeName || "" });

        setStats({
          totalProducts: data.totalProducts,
          pendingOrders: data.pendingOrders,
          totalSales: data.totalSales,
          messages: data.messages,
        });

        setRecentOrders(data.recentOrders || []);
        setRecentMessages(data.recentMessages || []);
      
        
  
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }
      
    };

    fetchData();
  }, []);

  // stat cards
  const statCards = useMemo(
    () => [
      {
        title: "Total Products",
        value: stats.totalProducts,
        color: "from-orange-400 to-orange-600",
        icon: ShoppingBag,
      },
      {
        title: "Pending Orders",
        value: stats.pendingOrders,
        color: "from-yellow-400 to-yellow-600",
        icon: ClipboardList,
      },
      {
        title: "Total Sales",
        value: `₦${(stats.totalSales || 0).toLocaleString()}`,

        color: "from-green-400 to-green-600",
        icon: DollarSign,
      },
      {
        title: "Messages",
        value: stats.messages,
        color: "from-blue-400 to-blue-600",
        icon: MessageSquare,
      },
    ],
    [stats]
  );

  return (
    <div className="w-full h-full min-h-screen p-8 space-y-10">
      <h1 className="text-[30px] max-mobile:text-[24px] font-bold mb-5 text-[#333333]">
        Welcome back, {""}
        <span className="text-[#f89216]">
              { seller.storeName || " "}

        </span>
      </h1>

      {/* Stat Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${card.color} rounded-xl shadow-lg p-6 text-white flex flex-col gap-3 transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{card.title}</span>
              <div className="bg-white/20 p-2 rounded-lg">
                <card.icon size={26} />
              </div>
            </div>
            <div className="text-4xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg max-mobile:p-4 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <table className="w-full max-mobile:text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f89216] text-white rounded-lg overflow-hidden">
                <th className="p-3 text-left font-semibold">Customer</th>
                <th className="p-3 text-left font-semibold">Product</th>
                <th className="p-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-[#fff7f0] transition"
                >
                  <td className="p-3 font-medium text-[#333333]">
                    {order.customer}
                  </td>
                  <td className="p-3 text-[#555555]">{order.product}</td>
                  <td
                    className={`p-3 font-semibold ${
                      order.status === "Pending"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No recent orders found.</p>
        )}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recent Messages
        </h2>
        {recentMessages.length > 0 ? (
          <ul className="space-y-4">
            {recentMessages.map((msg) => (
              <li
                key={msg.id}
                className="flex items-start gap-4 border-b border-gray-100 last:border-none pb-4"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f89216]/20 text-[#f89216] font-semibold">
                  {msg.sender.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#333333]">{msg.sender}</p>
                  <p className="text-sm text-gray-600">{msg.message}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
