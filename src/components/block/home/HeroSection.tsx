import { useEffect, useState } from "react";

import hero1 from "../../../assets/images/hero-images/hero1.jpeg";
import hero2 from "../../../assets/images/hero-images/hero2.jpg";
import hero3 from "../../../assets/images/hero-images/hero3.png";
import hero4 from "../../../assets/images/hero-images/hero4.jpg";
import hero5 from "../../../assets/images/hero-images/hero5.png";
import hero6 from "../../../assets/images/hero-images/hero6.jpg";
import hero7 from "../../../assets/images/hero-images/hero7.png";
import hero8 from "../../../assets/images/hero-images/hero8.jpeg";
import hero9 from "../../../assets/images/hero-images/hero9.jpg";
import hero10 from "../../../assets/images/hero-images/hero10.jpeg";
import { useSearch } from "../../../context/SearchContext";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const slides = [
  {
    image: hero1,
    title: `"Connecting you to trusted sellers, artisans & local businesses"`,
  },
  {
    image: hero2,
    title: `"Bringing local markets to your fingertips, one vendor at a time"`,
  },
  {
    image: hero3,
    title: `“Where your next trusted artisan is just a click away.”`,
  },
  {
    image: hero4,
    title: `“Helping you discover everyday sellers doing extraordinary work.”`,
  },
  {
    image: hero5,
    title: `“From market stalls to your screen - TradeLink connects you.”`,
  },
  {
    image: hero6,
    title: `“Empowering sellers. Serving buyers. Building communities.”`,
  },
  {
    image: hero7,
    title: `“Find the service you need — from the people who live right around you.”`,
  },
  {
    image: hero8,
    title: `“Real people. Real businesses. Real connections.”`,
  },
  {
    image: hero9,
    title: `“Discover, connect, and support the hands behind the hustle.”`,
  },
  {
    image: hero10,
    title: `“Shop smart. Support local. TradeLink is your marketplace.”`,
  },
];

const HeroSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { query, setQuery } = useSearch();

  const goToNextSlide = () => {
    if (currentSlideIndex === slides.length - 1) {
      // If we're at the last slide, go back to the first
      setCurrentSlideIndex(0);
    } else {
      // Otherwise, move to the next slide
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex === 0) {
      // If we're at the first slide, go to the last
      setCurrentSlideIndex(slides.length - 1);
    } else {
      // Otherwise, move to the previous slide
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const triggerSearch = () => {
    if (query.trim()) {
      console.log("Search triggered:", query);
    } else {
      console.log("Search query is empty.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlideIndex]);

  return (
    <section className="relative max-w-[1280px]  mx-auto mt-45 rounded-[100px] h-[700px] overflow-hidden max-tablet:max-h-[500px] max-tablet:max-w-[700px] max-mobile:w-[370px] max-mobile:h-[310px] max-mobile:rounded-[65px] max-[510px]:h-[400px] max-[510px]:w-[450px]">
      {slides.map((slide, index) => {
        if (index === currentSlideIndex) {
          return (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 z-0"
            >
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 z-0"
            >
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        }
      })}

      {/* black overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      <div className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4 max-tablet:px-6 max-mobile:px-7">
        <h1
          key={currentSlideIndex}
          className="text-[60px] max-w-[800px] leading-16  font-bold mb-8 opacity-0 transition-opacity duration-600 ease-in-out animate-slide-up max-tablet:text-[43px] max-tablet:leading-12 max-mobile:text-[29px] max-mobile:w-[280px] max-mobile:leading-8 max-[510px]:text-[40px]"
        >
          {slides[currentSlideIndex].title}
        </h1>

        <div className="flex justify-between gap-3 max-[510px]:text-[14px]">
          <div className="rounded-l-full flex items-center bg-white overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  triggerSearch();
                }
              }}
              placeholder="Search for sellers, artisans..."
              className="px-45 py-4 text-black outline-none max-tablet:px-10 max-tablet:py-2 max-mobile:max-w-[150px] max-mobile:h-[10px] max-mobile:text-[8px]"
            />
          </div>
          <div>
            <button
              onClick={triggerSearch}
              className="bg-[#30ac57] rounded-r-full px-6 py-4 text-white hover:bg-[#f89216] transition-colors duration-300 max-mobile:px-3 max-mobile:py-2 max-mobile:text-[12px]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPreviousSlide}
        className="absolute left-5 max-mobile:left-2 top-1/2 transform -translate-y-1/2 text-[#f89216] hover:text-[#30ac57] text-5xl z-30 max-tablet:text-4xl max-mobile:text-3xl"
      >
        <IoIosArrowDropleftCircle />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-5 max-mobile:right-2 top-1/2  transform -translate-y-1/2 text-[#f89216] hover:text-[#30ac57] text-5xl z-30 max-tablet:text-4xl max-mobile:text-3xl"
      >
        <IoIosArrowDroprightCircle />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-[10] max-tablet:bottom-13 max-mobile:bottom-6 max-[510px]:bottom-7">
        {slides.map((_, index) => {
          if (index === currentSlideIndex) {
            return (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className="py-1.5 px-1.5 rounded-full cursor-pointer transition-all duration-300 bg-[#F89216] scale-125 max-tablet:px-1 max-tablet:py-1"
              />
            );
          } else {
            return (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className="py-1.5 px-1.5 rounded-full cursor-pointer transition-all duration-300 bg-white/40 max-tablet:px-1 max-tablet:py-1"
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default HeroSection;
