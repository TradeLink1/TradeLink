import { Link } from "react-router-dom";
import Button from "../../reusable/Button";
import { PiArrowBendDownLeftBold } from "react-icons/pi";
import { PiArrowBendDownRightBold } from "react-icons/pi";

const Readytosell = () => {
  return (
    <div>
      <section>
        <div className="flex max-w-[1280px] mx-auto flex-col items-center justify-center text-center px-4 py-16">
          <h1 className="text-[42px] max-[510px]:text-[35px] text-[#f89216] font-bold max-mobile:text-[25px]">
            Ready to Start Selling?
          </h1>
          <p className="text-[23px] mb-7 max-tablet:text-[20px] font-medium max-w-[600px] leading-8 mx-auto text-[#333333] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:leading-6">
            Join thousands of local businesses already using TradeLink to grow
            their customer base.
          </p>
          <div className="flex flex-col justify-center items-center gap-3">
            <PiArrowBendDownRightBold
              id="beat"
              className=" rotate-90"
              size={30}
              color="#333333"
            />

            <Link to="/SellWithUs">
              <Button
                name="Become a Seller"
                bgColor="#30ac57"
                hoverBgColor="#f89216"
                hoverTextColor="#333333"
                textColor="white"
              />
            </Link>
            <PiArrowBendDownLeftBold
              id="beat"
              className="rotate-90"
              size={30}
              color="#333333"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Readytosell;
