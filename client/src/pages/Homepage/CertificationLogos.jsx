import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing Lucide icons
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function CertificationLogos() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const certificationLogos = [
    { name: "AWS", color: "bg-blue-100 dark:bg-blue-800" },
    { name: "Microsoft", color: "bg-blue-100 dark:bg-blue-800" },
    { name: "Scrum Alliance", color: "bg-red-100 dark:bg-red-800" },
    { name: "PMI", color: "bg-blue-100 dark:bg-blue-800" },
    { name: "Scaled Agile Inc.", color: "bg-red-100 dark:bg-red-800" },
    { name: "DevOps Institute", color: "bg-purple-100 dark:bg-purple-800" },
    { name: "EC-Council", color: "bg-green-100 dark:bg-green-800" },
    { name: "ICAgile", color: "bg-blue-100 dark:bg-blue-800" },
    { name: "IIBA", color: "bg-yellow-100 dark:bg-yellow-800" },
    { name: "IASSC", color: "bg-purple-100 dark:bg-purple-800" },
    { name: "Scrum.Org", color: "bg-blue-100 dark:bg-blue-800" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.7
          : scrollLeft + clientWidth * 0.7;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check on mount
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const certifications = [
    {
      id: 1,
      title: 'Scrum Alliance',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/REA-New%20Logo-b5b7e812ead6484baec67fa9d4784a4d.svg',
    },
    {
      id: 2,
      title: 'PMI',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/Badges-10-d954f30869f046229358cccfb304cdc6.svg',
    },
    {
      id: 3,
      title: 'Microsoft',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/Badges-08-5cc405936a8b4c75b220cac6e9e910af.svg',
    },
    {
      id: 4,
      title: 'AWS',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/Badges-02-6c95913e7b804651babdfd8822b3c757.svg',
    },
    {
      id: 5,
      title: 'ICAgile',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/Badges-06-de54f5c0eba7499f933a20bd21e362f9.svg',
    },
    {
      id: 6,
      title: 'DevOps Institute ',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/Badges-03-5e5c5b39fc9345b7abcb578473a22ac4.svg',
    },
    {
      id: 7,
      title: 'DevOps Institute ',
      imageUrl: 'https://d2o2utebsixu4k.cloudfront.net/Badges-03-5e5c5b39fc9345b7abcb578473a22ac4.svg',
    },
  ];

  return (
//     <section className="py-10 bg-white dark:bg-gray-900 transition duration-300">
//   <div className="container mx-auto px-6">
//     <h2 className="text-2xl md:text-3xl font-bold text-center text-[#363d47] dark:text-white mb-8">
//       Leap Ahead with Career-Boosting Certifications
//     </h2>

//     <div className="relative flex items-center">
//       {/* Left Arrow */}
//       {showLeftArrow && (
//         <div
//           className="absolute left-0 cursor-pointer hover:scale-110 transition-all"
//           onClick={() => scroll("left")}
//           aria-label="Scroll left"
//         >
//           <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//         </div>
//       )}

//       <div
//         ref={scrollRef}
//         id="scrollContainer"
//         className="flex overflow-x-scroll py-4 gap-6 scrollbar-hide"
//         onScroll={handleScroll}
//         style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
//       >
//         {certificationLogos.map((logo, index) => (
//           <div key={index} className="flex-shrink-0 w-36 h-14 rounded-md flex items-center justify-center">
//             <div className={`p-3 rounded ${logo.color} transition-all`}>
//               <p className="font-medium text-sm text-gray-700 dark:text-gray-200 text-center">
//                 {logo.name}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       {showRightArrow && (
//         <div
//           className="absolute right-0 cursor-pointer hover:scale-110 transition-all"
//           onClick={() => scroll("right")}
//           aria-label="Scroll right"
//         >
//           <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//         </div>
//       )}
//     </div>
//   </div>
// </section>
<div className="bg-white dark:bg-gray-900 py-2 px-6 rounded-3xl shadow-2xl mb-10 max-w-5xl mx-auto mt-5">
  <h2 className="text-xl font-semibold mb-3 text-center text-gray-800 dark:text-white mt-5">
    Leap Ahead with Career-Boosting Certifications
  </h2>

  <Swiper
    slidesPerView={5}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 5 },
    }}
    spaceBetween={30}
    autoplay={{
      delay: 1500,
      disableOnInteraction: false,
    }}
    loop={true}
    modules={[Autoplay]}
    className="certification-swiper"
  >
    {certifications.map((cert) => (
      <SwiperSlide
        key={cert.id}
        className="flex flex-col items-center justify-center text-center p-2"
      >
        <div className="flex justify-center items-center w-full h-16 mb-2">
          <img
            src={cert.imageUrl}
            alt={cert.title}
            className="w-10 h-10 object-contain"
          />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {cert.title}
        </p>
      </SwiperSlide>
    ))}
  </Swiper>
</div>








  );
}
