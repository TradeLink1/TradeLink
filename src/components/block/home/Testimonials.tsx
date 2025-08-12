import buyer1 from "../../../assets/images/testimonials-images/buyer1.png";
import buyer2 from "../../../assets/images/testimonials-images/buyer2.png";
import buyer3 from "../../../assets/images/testimonials-images/buyer3.png";
import seller1 from "../../../assets/images/testimonials-images/seller1.png";
import seller2 from "../../../assets/images/testimonials-images/seller2.png";
import seller3 from "../../../assets/images/testimonials-images/seller3.png";
import { FaArrowCircleRight } from "react-icons/fa";
const cardData = [
  {
    icon: buyer1,
    title:
      " I used to struggle finding reliable artisans near me. Thanks to TradeLink, i found a tailor just two streets away - and she did an amazing job. ",
    description: "⇾ Chinwe, Ikorodu Lagos.",
  },
  {
    icon: buyer2,
    title:
      "TradeLink helped me discover a local woman who sells fresh plantains every morning, i just call her before i leave home and she packs my order - so convenient!",
    description: "⇾ Uche, Sangotedo Lagos.",
  },
  {
    icon: buyer3,
    title:
      "I love how TradeLink lets me explore real sellers, not just faceless products, its like walking throughh a real market from my phone.",
    description: "⇾ Damilola, Somolu Lagos.",
  },
];

const cardData2 = [
  {
    icon: seller1,
    title:
      " Before TradeLink, I only sold to people who walked past my shop. Now, people find me online and even pre-order - my business is growing!  ",
    description: "⇾ Mama Esther, Foodstuffs Vendor.",
  },
  {
    icon: seller2,
    title:
      "Uploading my voice note on TradeLink helped customers trust me more. They say it feels like they know me before calling!.",
    description: "⇾ Tunde, Furniture Maker.",
  },
  {
    icon: seller3,
    title:
      "TradeLink is different, it gives us market people a place to shine - now i get more calls, more orders and more confidence.",
    description: "⇾ Aunty Shade, Hair Stylist.",
  },
];

const Testimonials = () => {
  return (
    <div>
      <section id="tessection" className="pt-20 pb-25 bg-[#f89216]">
        <div>
          <div className="flex max-w-[1280px] mx-auto flex-col items-center justify-center text-center ">
            <h1 className="text-[42px] max-[510px]:text-[35px] text-[#fef6e1] font-bold max-mobile:text-[25px]">
              What Our Users Say
            </h1>

            <p className="text-[23px] mb-7 max-tablet:text-[20px] font-medium max-w-[600px] leading-8 mx-auto text-[#333333] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:leading-6">
              Hear from our community of local sellers and buyers who are
              transforming their businesses with TradeLink.
            </p>

            <h3 className="  mb-10   rounded-2xl flex items-center gap-2 text-[35px]  max-[510px]:text-[25px] text-[#fef6e1] font-semibold max-mobile:text-[20px]">
              <FaArrowCircleRight color="#333333" /> Buyers Testimonials
            </h3>
          </div>
        </div>
        <div className=" rounded-4xl  flex max-w-[1280px]  mx-auto justify-center">
          <div className="flex flex-wrap justify-center gap-12 max-w-[1280px] mx-auto px-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="w-[320px] p-8 bg-white rounded-4xl  transform  hover:border-1 hover:border-[#5e5e5e]  hover:scale-105 hover:shadow-lg transition duration-300"
              >
                <img
                  className="h-[100px] mb-4    rounded-3xl"
                  src={card.icon}
                  alt={card.title}
                />
                <p className="text-[#555] text-[14px] leading-4.5 mb-2 max-mobile:text-[14px] ">
                  {card.title}
                </p>

                <h3 className="  text-[15px]  mb-3 font-medium text-[#30ac57] max-mobile:text-[15px]">
                  {card.description}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-[35px] flex items-center gap-2 justify-center mb-10 text-center mt-15 max-[510px]:text-[25px] text-[#fef6e1] font-semibold max-mobile:text-[20px]">
          <FaArrowCircleRight color="#333333" /> Sellers Testimonials
        </h3>

        <div className=" rounded-4xl  flex max-w-[1280px]  mx-auto justify-center">
          <div className="flex flex-wrap justify-center gap-12 max-w-[1280px] mx-auto px-4">
            {cardData2.map((card, index) => (
              <div
                key={index}
                className="w-[320px] p-8 bg-white rounded-4xl  transform  hover:border-1 hover:border-[#5e5e5e]  hover:scale-105 hover:shadow-lg transition duration-300"
              >
                <img
                  className="h-[100px] mb-4    rounded-3xl"
                  src={card.icon}
                  alt={card.title}
                />
                <p className="text-[#555] text-[14px] leading-4.5 mb-2 max-mobile:text-[14px] ">
                  {card.title}
                </p>

                <h3 className="  text-[15px]  mb-3 font-medium text-[#f89216] max-mobile:text-[15px]">
                  {card.description}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
