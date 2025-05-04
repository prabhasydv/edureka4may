import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
// import Image from "next/image";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }
  const logos = [
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_Reliance-8d98162977754c8b9583c132028cd967.svg',
      alt: 'Reliance Retail',
    },
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_Infosys-69007f6080d94039b856ddd607aca191.svg',
      alt: 'Infosys BPM',
    },
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_HP-2860f6848ad5400ba9b52db0077bb097.svg',
      alt: 'HP Enterprise',
    },
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_Tiger-4ff6b27ed592481881edf61e4d019df1.svg',
      alt: 'Tiger',
    },
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_Welspun-4e17b025b5a8445395b02df62d9fd1f3.svg',
      alt: 'Welspun',
    },
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_terrapay-12651a4aa23148108427a29818c0dc52.svg',
      alt: 'Terrapay',
    },
    {
      src: 'https://d2o2utebsixu4k.cloudfront.net/Transform%20workflow%20logos_Bennett-f4e76491af3446748bd163bf3a61b564.svg',
      alt: 'Bennett',
    },
  ];

  return (
    <section className="bg-mono-whiteSubdued dark:bg-gray-900 py-8 md:py-12 transition-colors duration-300 rounded-b-128 rounded-b-38">
      <div className="section-container px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 text-center relative lg:-top-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-mono-black dark:text-white leading-tight">
            Learn In-Demand Skills for Tomorrow's Jobs
            <span className="relative block max-w-xs mx-auto"></span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Experience learning that delivers results. We&apos;re disrupting the way you learn
            new-age technologies and we&apos;ll help you get job-ready, fast.
          </p>

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-lg font-medium px-6 py-6 rounded-md transition duration-300 ease-in-out"
          >
            Explore Courses
          </Button>

          <div className="flex flex-col gap-2 py-4 pt-16 text-sm">
            {/* "Trusted by" stays on top, aligned left */}
            <div className="font-semibold text-neutral-600 text-left">
              Trusted by
            </div>

            {/* Swiper below it */}
            <Swiper
              modules={[Autoplay]}
              slidesPerView={'auto'}
              spaceBetween={12}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              speed={1000}
              grabCursor={true}
            >
              {logos.map((logo, index) => (
                <SwiperSlide key={index} className="!w-auto px-1">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 md:h-8 object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>




        {/* Right Visual Grid */}
        <div className="relative h-[400px] md:h-[600px]">
          <img
            src="https://d2o2utebsixu4k.cloudfront.net/Webp-d0585444145e4b4a88e9a7f5f8f4588b.svg" // replace with your actual image path
            alt="Decorative"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>



  );
};

export default HeroSection;
