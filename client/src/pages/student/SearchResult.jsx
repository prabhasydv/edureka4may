// import { Badge } from "@/components/ui/badge";
// import React from "react";
// import { Link } from "react-router-dom";

// const SearchResult = ({ course }) => {
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
//       <Link
//         to={`/course-detail/${course._id}`}
//         className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
//       >
//         <div className="w-full md:w-56 aspect-video overflow-hidden rounded">
//           <img
//             src={course.courseThumbnail}
//             alt="course-thumbnail"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
//           <p className="text-sm text-gray-600">{course.subTitle}</p>
//           <p className="text-sm text-gray-700">
//             Instructor: <span className="font-bold">{course.creator?.name}</span>
//           </p>
//           <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
//         </div>
//       </Link>
//       <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
//         <h1 className="font-bold text-lg md:text-xl">${course.coursePrice}</h1>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;

import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  // Find lowest and highest price
  const prices = course?.pricingOptions?.map(option => option.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : course.coursePrice;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : course.coursePrice;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <div className="w-full md:w-56 aspect-video overflow-hidden rounded">
          <img
            src={course.courseThumbnail}
            alt="course-thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold">{course.creator?.name}</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        {/* Displaying price range */}
        {minPrice === maxPrice ? (
          <h1 className="font-bold text-lg md:text-xl">${minPrice}</h1>
        ) : (
          <h1 className="font-bold text-lg md:text-xl">
            ${minPrice} - ${maxPrice}
          </h1>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

