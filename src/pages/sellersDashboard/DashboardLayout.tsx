import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiUpload,
  FiList,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // ✅ Redirect-only logout (no API, no localStorage changes)
  const handleLogout = () => {
    closeSidebar();
    navigate("/"); // go to homepage
  };

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: <FiHome size={18} /> },
    {
      name: "Upload Products",
      path: "/dashboard/upload",
      icon: <FiUpload size={18} />,
    },
    {
      name: "My Listings",
      path: "/dashboard/listings",
      icon: <FiList size={18} />,
    },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: <FiMessageSquare size={18} />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FiSettings size={18} />,
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Sidebar */}
      <aside
        className={`
          bg-[#1e1e1e]  p-10
          w-70 transition-transform duration-300 ease-in-out
          md:translate-x-0 h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          fixed md:relative left-0 z-40
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#d6d6d6] mb-7 pb-5">
          <h2 className="text-xl pl-3 font-bold text-[#f89216]">
            Seller{" "}
            <span className="font-medium text-[#ffffff]"> Dashboard</span>
          </h2>
          <button
            className="md:hidden p-1 rounded-md cursor-pointer bg-[#f89216]"
            onClick={toggleSidebar}
          >
            <IoClose size={24} color="white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f89216] text-white shadow-md"
                    : "text-[#ffffff] hover:bg-[#e9e7e7] hover:text-[#333333]"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-15 flex ">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-white px-6 py-2 rounded-[50px] text-[16px] border-1 border-[#f89216] font-semibold hover:bg-[#f89216] hover:text-white transition-all duration-200"
          >
            <FiLogOut size={18} />
            Back To Home
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4">
          {!isOpen && (
            <button
              className="p-2 rounded-md shadow-md bg-[#f89216] cursor-pointer"
              onClick={toggleSidebar}
            >
              <FiMenu size={24} color="white" />
            </button>
          )}
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
