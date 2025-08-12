import { useEffect, useRef, useState } from "react";

// Importing all category images
import cat1 from "../../../assets/images/categories-images/cat1.png";
import cat2 from "../../../assets/images/categories-images/cat2.png";
import cat3 from "../../../assets/images/categories-images/cat3.png";
import cat4 from "../../../assets/images/categories-images/cat4.png";
import cat5 from "../../../assets/images/categories-images/cat5.png";
import cat6 from "../../../assets/images/categories-images/cat6.png";
import cat7 from "../../../assets/images/categories-images/cat7.png";
import cat8 from "../../../assets/images/categories-images/cat8.png";
import cat9 from "../../../assets/images/categories-images/cat9.png";

import Button from "../../reusable/Button";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { PiArrowBendDownLeftBold } from "react-icons/pi";
import { Link } from "react-router-dom";

// All the seller categories with title, image, and description
const sellerCategories = [
  {
    title: "Market Men & Women",
    image: cat1,
    description:
      "From street stalls to open markets – TradeLink brings their fresh goods closer to you.",
  },
  {
    title: "Product Vendors",
    image: cat2,
    description:
      "Groceries, snacks, drinks & more — TradeLink connects you with everyday vendors.",
  },
  {
    title: "Clothing & Fashion Sellers",
    image: cat3,
    description:
      "Native wear, ready-made fashion & accessories — easily discoverable on TradeLink.",
  },
  {
    title: "Artisans & Skilled Workers",
    image: cat4,
    description:
      "Shoemakers, welders, carpenters — TradeLink links buyers with trusted artisans.",
  },
  {
    title: "Caterers & Food Sellers",
    image: cat5,
    description:
      "Party trays, home meals, snacks — TradeLink connects you to local kitchens.",
  },
  {
    title: "Hair & Beauty Professionals",
    image: cat6,
    description:
      "Discover nearby braiders, stylists, and MUA experts — all on TradeLink.",
  },
  {
    title: "Household Essentials Sellers",
    image: cat7,
    description:
      "Need a new mop or basin? Find household basics from real vendors on TradeLink.",
  },
  {
    title: "Building Materials Dealers",
    image: cat8,
    description:
      "From cement to ceiling boards — TradeLink connects builders with local suppliers.",
  },
  {
    title: "Furniture & Home-ware Sellers",
    image: cat9,
    description:
      "Discover handmade chairs, beds & cabinets from local makers on TradeLink.",
  },
];

//  main component //
const Category = () => {
  //  This is a reference to the scrollable box (the container with the category cards)
  const scrollBoxRef = useRef<HTMLDivElement | null>(null);

  //  This keeps track of whether your mouse is currently hovering on the scroll box
  const [mouseIsHovering, setMouseIsHovering] = useState(false);

  // ↔ This tells us the current direction the box should scroll (either 'left' or 'right')
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">(
    "right"
  );

  // ⚙️ This runs when the component is mounted and keeps updating the scroll position
  useEffect(() => {
    const box = scrollBoxRef.current;
    if (!box) return;

    // Start a timer that moves the scroll position every 20ms
    const scrollTimer = setInterval(() => {
      // If the mouse is NOT hovering, keep scrolling
      if (!mouseIsHovering) {
        if (scrollDirection === "right") {
          box.scrollLeft += 1; // Move right
          // If we reach the end, switch to left
          if (box.scrollLeft + box.clientWidth >= box.scrollWidth) {
            setScrollDirection("left");
          }
        } else {
          box.scrollLeft -= 1; // Move left
          // If we reach the start, switch to right
          if (box.scrollLeft <= 0) {
            setScrollDirection("right");
          }
        }
      }
    }, 20);

    // Cleanup the timer when component unmounts or scrollDirection changes
    return () => clearInterval(scrollTimer);
  }, [mouseIsHovering, scrollDirection]);

  return (
    <section className="bg-[#f89216] pt-22 pb-24 mt-30" id="categories">
      {/* Header text */}
      <div className="flex flex-col justify-center text-center max-w-[1280px] mx-auto px-4">
        <h1 className="text-[42px] max-[510px]:text-[35px] text-[#ffffff] font-bold max-mobile:text-[25px]">
          Categories
        </h1>
        <p className="text-[23px] max-tablet:text-[20px] font-medium max-w-[600px] leading-8 mx-auto text-[#333333] max-mobile:text-[17px] max-mobile:max-w-[350px] max-mobile:leading-6">
          "Meet the people behind the services — TradeLink connects you to real
          sellers in your area."
        </p>
      </div>

      {/* Scrollable categories row */}
      <div
        ref={scrollBoxRef} // This makes the div scrollable via JavaScript
        onMouseEnter={() => setMouseIsHovering(true)} // Stop scrolling when mouse is on it
        onMouseLeave={() => setMouseIsHovering(false)} // Resume scrolling when mouse leaves
        className="mt-10 max-w-[1280px] mx-auto flex overflow-x-auto space-x-5 px-4 scrollbar-hide scroll-smooth"
      >
        {sellerCategories.map((item, index) => (
          <div
            key={index}
            className="w-max mb-13 flex-shrink-0 bg-[#30ac57] hover:border-1 hover:border-[#5e5e5e] px-6 py-5 rounded-3xl transform transition-transform duration-300 hover:scale-105"
          >
            <h1 className="mb-3 font-semibold text-[20px] max-mobile:text-[18px] text-[#fef6e1]">
              {item.title}
            </h1>
            <div className="rounded-2xl overflow-hidden h-[180px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[14px] max-w-[300px] max-mobile:text-[12px] bg-[#ffffff] border-1 border-[#f89216] p-3 rounded-2xl text-[#333333] mt-3 leading-4">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom section with buttons */}
      <div className="text-center mt-13 max-w-[1280px] mx-auto px-4">
        <div>
          <h1 className="text-[#fef6e1] max-[510px]:text-[35px] max-[510px]:max-w-[350px] max-[510px]:mx-auto text-[42px] mb-2 font-bold max-mobile:text-[25px] max-tablet:leading-12 max-mobile:leading-9 max-mobile:mb-3.5">
            Connect with Local Sellers{" "}
          </h1>
          <p className="text-[23px] max-tablet:text-[20px] font-medium max-w-[900px] leading-6 mx-auto text-[#333333] max-mobile:text-[17px] max-mobile:max-w-[350px]">
            Discover amazing products and services from trusted local businesses
            in your community. Support local commerce while finding exactly what
            you need.
          </p>
        </div>

        {/* Call-to-action buttons */}
        <div className="mt-8 gap-4 flex justify-center items-center max-mobile:flex-col">
          <PiArrowBendDownRightBold
            id="beat"
            className=" max-mobile:rotate-90"
            size={30}
            color="#fef6e1"
          />
          <Link to="/Categories/Products">
            <Button
              name="Shop Products"
              bgColor="#333333"
              hoverBgColor="#30ac57"
              hoverTextColor="white"
              textColor="white"
            />
          </Link>
          <Link to="/Categories/Services">
            <Button
              name="Find Services"
              bgColor="#30ac57"
              hoverBgColor="white"
              hoverTextColor="#333333"
              textColor="white"
            />
          </Link>
          <PiArrowBendDownLeftBold
            id="beat"
            className="max-mobile:rotate-90"
            size={30}
            color="#333333"
          />
        </div>
      </div>
    </section>
  );
};

export default Category;
