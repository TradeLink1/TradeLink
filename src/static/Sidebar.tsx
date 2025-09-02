import { Link } from "react-router-dom";
import Button from "../components/reusable/Button";
import { TbChevronDown } from "react-icons/tb";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdMiscellaneousServices, MdOutlineSell } from "react-icons/md";
import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";


const Sidebar = ({ handleToggle }: any) => {
  const [showDropdown, setShowDropwn] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropwn(!showDropdown);
  };



  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed left-0 w-full pb-10 h-[80vh] flex items-center justify-center z-30 max-mobile:h-[550px] bg-amber-50/94 backdrop-blur-lg rounded-b-3xl p-6 shadow-lg"
        style={{
          backdropFilter: "saturate(180%) blur(7px)",
          WebkitBackdropFilter: "saturate(180%) blur(4px)",
          boxShadow: "0 4px 16px 0 rgba(0,0,0,0.07)",
        }}
      >
        <section className="flex flex-col gap-7 text-[#333333] font-semibold text-center text-[16px] max-mobile:gap-3">
          {/* Categories */}
          <div
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center gap-1.5 hover:text-[#f89216] font-semibold border-b pb-2 border-[#f89216]"
          >
            <TbChevronDown size={20} /> Categories
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex flex-col justify-center gap-2 text-medium text-[#fff] rounded-md p-3"
                style={{ backgroundColor: "#30ac57" }}
              >
                <Link
                  to="Categories/Products"
                  onClick={handleToggle}
                  className="hover:text-[#f89216] flex items-center gap-1"
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other Links */}
          <Link to="/SellWithUs" onClick={handleToggle}>
            <nav className="hover:text-[#f89216] flex items-center gap-1 border-b pb-2 border-[#f89216]">
              <MdOutlineSell /> Sell with Us
            </nav>
          </Link>
          <Link to="/Faq" onClick={handleToggle}>
            <nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216]">
              FAQs
            </nav>
          </Link>
          <Link to="/Contact" onClick={handleToggle}>
            <nav className="hover:text-[#f89216] border-b pb-2 border-[#f89216]">
              Contact Us
            </nav>
          </Link>

          

      
          
      
            <a href="/Login" target="_blank" rel="noopener noreferrer">
              <Button
                name="Login"
                border="2px solid "
                borderColor="#f89216"
                hoverBgColor="#30ac57"
                hoverTextColor="white"
              />
            </a>
            <a href="/Register" target="_blank" rel="noopener noreferrer">
              <Button
                name="Register"
                bgColor="#f89216"
                hoverBgColor="#333333"
                hoverTextColor="white"
              />
            </a> 
          </section>
          {/* </section> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;