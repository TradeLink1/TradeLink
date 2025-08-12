import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-[#333333] text-[#fef6e1] pt-10 pb-10">
      <div className="flex  justify-center gap-30 max-w-[1280px] mx-auto max-tablet:flex-col max-tablet:ml-10 max-tablet:gap-10  ">
        <div className="">
          <img className="w-[110px] mb-4" src="/footer logo.png" alt="" />
          <p className="max-w-[300px] text-[14px]">
            Connecting local buyers with trusted sellers. Discover amazing
            products and services in your community.
          </p>
          <div className="flex gap-6 mt-4 text-[18px]">
            <a
              href="https://www.facebook.com/TradeLink"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f89216]"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com/TradeLink"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f89216]"
            >
              <AiFillTwitterCircle />
            </a>
            <a
              href="https://www.instagram.com/TradeLink"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f89216]"
            >
              <AiFillInstagram />
            </a>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-[#f89216]">Quick Links</h3>
          <Link to="/Categories/Products">
            <h4 className="text-[14px] hover:text-[#f89216]">Products</h4>
          </Link>
          <Link to="/Categories/Services">
            <h4 className="text-[14px]  hover:text-[#f89216]">Services</h4>
          </Link>
          <Link to="/SellWithUs">
            <h4 className="text-[14px]  hover:text-[#f89216]">
              Become a Seller
            </h4>
          </Link>
          <Link to="/FAQ">
            <h4 className="text-[14px]  hover:text-[#f89216]">FAQ</h4>
          </Link>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-[#f89216]">Resources</h3>
          <Link to="/HelpCenter">
            <h4 className="text-[14px]  hover:text-[#f89216]">Help Center</h4>
          </Link>
          <Link to="/SellerGuide">
            <h4 className="text-[14px]  hover:text-[#f89216]">Seller Guide</h4>
          </Link>
          <Link to="/PrivacyPolicy">
            <h4 className="text-[14px]  hover:text-[#f89216]">
              Privacy Policy
            </h4>
          </Link>
          <Link to="/TermsOfService">
            <h4 className="text-[14px]  hover:text-[#f89216]">
              Terms of Service
            </h4>
          </Link>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-[#f89216]">Contact Us</h3>
          <h4>Lagos, Nigeria</h4>
          <h4 className="text-[14px]">
            +234 000 123 4567
            <Link to="/Support">
              <h4 className="text-[14px]  hover:text-[#f89216]">
                support@tradelink.com.ng
              </h4>
            </Link>
          </h4>
        </div>
      </div>
      <hr className="mt-10 flex justify-center text-[#fef6e1] max-w-[1280px] mx-auto" />
      <div className="mt-10 mb-5 flex flex-col items-center max-w-[1280px] mx-auto">
        <p className="text-[14px]">© 2025 TradeLink. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
