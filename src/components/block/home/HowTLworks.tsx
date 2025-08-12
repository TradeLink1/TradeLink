import Icon1 from "../../../assets/images/icons/icon1.png";
import Icon2 from "../../../assets/images/icons/icon2.png";
import Icon3 from "../../../assets/images/icons/icon3.png";

const cardData = [
  {
    icon: Icon1,
    title: "Discover Local Sellers",
    description:
      "Search for sellers near you by category or location - from market women to artisans and vendors.",
  },
  {
    icon: Icon2,
    title: "Connect & Explore their Offers",
    description:
      "View their profile, listen to seller voice notes, read reviews, or message them directly.",
  },
  {
    icon: Icon3,
    title: "Buy, Visit, or Patronize",
    description:
      "Call, message, or visit the seller - TradeLink connects you directly without middlemen.",
  },
];

const HowTLworks = () => {
  return (
    <section className="pt-25 pb-25 ">
      <div className="flex max-w-[1280px] mx-auto items-center justify-center mb-10 text-center">
        <h1 className="text-[42px] text-[#333333] font-bold max-[510px]:text-[35px] max-mobile:text-[25px]">
          How TradeLinks Works
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-12 max-w-[1280px] mx-auto px-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="w-[320px] p-8 bg-white rounded-3xl transform  hover:border-1 hover:border-[#5e5e5e] hover:scale-105 hover:shadow-lg transition duration-300"
          >
            <img className="h-[100px] mb-4" src={card.icon} alt={card.title} />
            <h1 className="text-[25px] leading-7 mb-3 font-semibold text-[#333333] max-mobile:text-[20px]">
              {card.title}
            </h1>
            <p className="text-[#555] max-mobile:text-[14px]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowTLworks;
