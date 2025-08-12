import { Link } from "react-router-dom";
import Button from "../components/reusable/Button";
import { TbChevronDown } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { useState } from "react";

const Sidebar = ({ handleToggle }: any) => {
  const [showDropdown, setShowDropwn] = useState(false);
  const toggleDropdown = () => {
    setShowDropwn(!showDropdown);
  };

  return (
    <div
      className="fixed   left-0 w-full  pb-10  h-[85vh]  flex items-center justify-center  z-30 max-mobile:h-[550px] bg-amber-50/94 backdrop-blur-lg border-4 border-white/50  rounded-b-3xl p-6 shadow-lg   "
      style={{
        backdropFilter: "saturate(180%) blur(7px)",
        WebkitBackdropFilter: "saturate(180%) blur(4px)",
        boxShadow: "0 4px 16px 0 rgba(0,0,0,0.07)",
      }}
    >
      <section className="flex flex-col gap-7  text-[#333333] font-semibold text-center text-[16px] max-mobile:gap-3">
        <div
          onClick={toggleDropdown}
          className="cursor-pointer flex items-center gap-1.5 hover:text-[#f89216] font-semibold border-b pb-2 border-[#f89216]"
        >
          {" "}
          <TbChevronDown size={20} /> Categories
        </div>
        {showDropdown && (
          <div
            className=" mt-2 flex flex-col justify-center gap-2 text-medium text-[#fff]  rounded-md p-3 "
            style={{ backgroundColor: "#30ac57" }}
          >
            <Link
              to="Categories/Products"
              onClick={handleToggle}
              className=" hover:text-[#f89216] flex items-center gap-1"
            >
              <HiOutlineShoppingCart /> Products
            </Link>
            <Link
              to="Categories/Services"
              onClick={handleToggle}
              className="hover:text-[#f89216] flex items-center gap-1"
            >
              <MdMiscellaneousServices /> Services
            </Link>
          </div>
        )}
        <Link to="/AddBusiness" onClick={handleToggle}>
          <nav className="hover:text-[#f89216] flex items-center gap-1 border-b pb-2 border-[#f89216] ">
            <MdOutlineSell />
            Sell with Us
          </nav>
        </Link>
        <Link to="/Faq" onClick={handleToggle}>
          <nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216]">
            FAQs
          </nav>
        </Link>
        <Link to="/Contact" onClick={handleToggle}>
          <nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216] ">
            Contact Us
          </nav>
        </Link>

        <section className="flex flex-col gap-3 pt-3 text-[15px] font-semibold w-full">
          <Link to="/Login">
            {" "}
            <Button
              name="Login"
              border="2px solid "
              borderColor="#f89216"
              hoverBgColor="#30ac57"
              hoverTextColor="white"
            />
          </Link>
          <Link to="/Register">
            {" "}
            <Button
              name="Register"
              bgColor="#f89216"
              hoverBgColor="#333333"
              hoverTextColor="white"
            />
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Sidebar;
