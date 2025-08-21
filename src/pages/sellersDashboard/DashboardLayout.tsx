import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";


const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    closeSidebar();
    localStorage.removeItem("authToken"); 
    navigate("/"); 
  };

  return (
    <div className="flex min-h-screen pt-[80px] relative max-w-[1200px]">
      
      <aside
        className={`
          bg-[#fbf2e7] border-r p-5 shadow-lg border-[#d6d6d6]
          md:sticky md:top-[80px] md:h-[calc(100vh-80px)]
          w-64 transition-transform duration-300 ease-in-out
          md:translate-x-0 max-tablet:h-full 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          fixed md:relative left-0 z-40
          top-[80px] h-auto md:h-[calc(100vh-80px)]
        `}
      >
      
        <div className="flex items-center justify-between border-b-2 border-[#d6d6d6] mb-7 pb-5 pt-6">
          <h2 className="text-xl pl-3 font-bold text-[#f89216]">Seller Dashboard</h2>
          <button
            className="md:hidden p-1 rounded-md cursor-pointer bg-[#f89216]"
            onClick={toggleSidebar}
          >
            <IoClose size={24} color="white" />
          </button>
        </div>

      
        <nav className="flex flex-col gap-4 text-[#333333] font-bold pl-3 ">
          <NavLink to="/dashboard" end onClick={closeSidebar}>
            <div className="hover:text-[#f89216] text-[#333333] bg-[white] p-2 shadow-lg rounded-2xl text-center">
              Overview
            </div>
          </NavLink>
          <NavLink to="/dashboard/upload" onClick={closeSidebar}>
            <div className="hover:text-[#f89216] text-[#333333] bg-[white] p-2  rounded-2xl shadow-lg text-center">
              Upload Products
            </div>
          </NavLink>
          <NavLink to="/dashboard/listings" onClick={closeSidebar}>
            <div className="hover:text-[#f89216] text-[#333333] bg-[white] p-2 shadow-lg rounded-2xl text-center">
              My Listings
            </div>
          </NavLink>
          <NavLink to="/dashboard/messages" onClick={closeSidebar}>
            <div className="hover:text-[#f89216] text-[#333333] bg-[white] p-2 shadow-lg rounded-2xl text-center">
              Messages
            </div>
          </NavLink>
          <NavLink to="/dashboard/settings" onClick={closeSidebar}>
            <div className="hover:text-[#f89216] text-[#333333] bg-[white] p-2 shadow-lg rounded-2xl text-center">
              Settings
            </div>
          </NavLink>
        </nav>

        
        <div className="pt-10 flex justify-center">
          <button type="button" onClick={() =>{
            console.log("LOGOUT CLICKED") 
            localStorage.removeItem("authToken");
            navigate("/")
          }} className="border-2 rounded-4xl border-[#f89216] px-7 py-2 mt-10 text-[18px] text-[#333333] font-semibold cursor-pointer hover:border-[#f89216] hover:bg-[#30ac57] hover:text-white"> Log Out</button>
        </div>
      </aside>

    
      <main className="flex-1 p-4">
      
        <div className="md:hidden pt-4">
          {!isOpen && (
            <button
              className="p-2  rounded-md shadow-md mb-4 bg-[#f89216] cursor-pointer"
              onClick={toggleSidebar}
            >
              <FiMenu size={24} color="white"/>
            </button>
          )}
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
