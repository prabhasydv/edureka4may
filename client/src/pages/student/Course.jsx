// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Course = ({ course }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (

// <Link to={`/course-detail/${course._id}`}>
//   <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//     <div className="relative">
//       <img
//         src={course.courseThumbnail}
//         alt="course"
//         className="w-full object-cover rounded-t-lg aspect-video sm:h-36"
//       />
//     </div>
//     <CardContent className="px-5 py-4 space-y-3">
//       <h1 className="hover:underline font-bold text-lg truncate">
//         {course.courseTitle}
//       </h1>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <h1 className="font-medium text-sm">{course.creator?.name}</h1>
//         </div>
//         <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
//           {course.courseLevel}
//         </Badge>
//       </div>
//       <h5 className="hover:underline font-bold text-lg">Description</h5>

//       <div className={`text-sm ${isExpanded ? "" : "line-clamp-4 overflow-hidden"}`}>
//         <p dangerouslySetInnerHTML={{ __html: course.description }} />
//       </div>
//       <div className="text-lg font-bold">
//         <span>${course.coursePrice}</span>
//       </div>
//     </CardContent>
//   </Card>
// </Link>

//     <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//     <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md flex flex-col justify-between h-full min-h-[350px]">

//       <div className="relative mb-3">
//         <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded z-10">
//           RECOMMENDED
//         </span>

//         <img
//           src={course.courseThumbnail}
//           alt="PMP Training"
//           className="w-full h-[150px] object-cover rounded"
//         />
//       </div>

//       <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//         {course.courseTitle}
//       </h5>

//       <div className={`mb-2 text-sm text-gray-700 dark:text-gray-300 ${isExpanded ? "" : "line-clamp-4 overflow-hidden"}`}>
//         <p dangerouslySetInnerHTML={{ __html: course.description }} />
//       </div>

//       <p className="mb-1 text-gray-800 dark:text-gray-300">📜 Completion Certificate</p>
//       <p className="mb-1 text-gray-800 dark:text-gray-300">⏳ 36 Hrs of Live Classes</p>
//       <p className="mb-3 text-gray-800 dark:text-gray-300">📅 Weekend Classes</p>

//       <div className="text-lg font-bold text-gray-900 dark:text-white">
//         <span>${course.coursePrice}</span>
//       </div>

//       <Link to={`/course-detail/${course._id}`} className="mt-auto">
//   <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
//     View Course Details
//   </button>
// </Link>

//     </div>
//   </div>



//   );
// };

// export default Course;

import { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';  // if you need to import the styles as well
import { useSubmitContactFormAdvisorMutation } from "@/features/api/authApi";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate min and max price from pricing options
  const prices = course?.pricingOptions?.map(option => option.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : course.coursePrice;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : course.coursePrice;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseTitle: course?.courseTitle || '', // include courseTitle in the form data
  });

  const [submitContactFormAdvisor, { isLoading, isError, error, isSuccess }] = useSubmitContactFormAdvisorMutation();

  const [message, setMessage] = useState("");  // To show success/failure messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send formData including courseTitle
      const response = await submitContactFormAdvisor(formData).unwrap();
      console.log(response.message); // Success message from the backend
      setLoading(false); // Display success message
      setMessage("Success! Your request has been sent.");

      setTimeout(() => {
        setShowModal(false); // Close the modal
      }, 2000);

    } catch (err) {
      console.error('Error submitting form:', err);
      setLoading(false);
      setMessage("Failure! Something went wrong. Please try again."); // Display failure message
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="grid">
          <div className="course-card cloud active">
            <div className="max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full relative">
              <span className="absolute top-2 left-2 bg-green-600 text-white text-[9px] sm:text-[10px] px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded z-10 mt-2 ml-2">
                RECOMMENDED
              </span>

              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full h-48 object-cover p-2"
              />

              <div className="p-4 flex flex-col">
                <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{course.courseTitle}</h5>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Live Classroom</p>
                <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {minPrice === maxPrice ? (
                    <span>${minPrice}</span>
                  ) : (
                    <span>
                      ${minPrice} - ${maxPrice}
                    </span>
                  )}
                  <p>
                    <strong>Duration:</strong> 6 Weeks
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border-gray-200 px-4 py-2 flex flex-col sm:flex-row sm:justify-between gap-2">
                <Link to={`/course-detail/${course._id}`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded px-2 py-1 text-xs sm:text-sm hover:bg-indigo-50 focus:outline-none dark:hover:bg-indigo-700 dark:hover:text-white">
                    View Certification
                  </button>
                </Link>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto bg-gray-800 dark:bg-gray-700 text-white rounded px-2 py-1 text-xs sm:text-sm hover:bg-gray-700 focus:outline-none dark:hover:bg-gray-600"
                >
                  Contact Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transform scale-100 transition-transform duration-300 ease-out">

            {/* Modal Header with Thumbnail */}
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-10 h-10 rounded object-cover"
              />
              <span>
                Contact Advisor – <span className="text-blue-600 dark:text-blue-400">{course.courseTitle}</span>
              </span>
            </h2>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name Field */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-700 dark:text-white"
              />

              {/* Phone Number Field */}
              <PhoneInput
                international
                defaultCountry="US"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                className="phone-input w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-700 dark:text-white"
              />

              {/* Email Address Field */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-gray-700 dark:text-white"
              />

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 rounded-lg shadow-md transition-all"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <div className="w-8 h-8 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </form>

            {/* Success/Failure Message */}
            {message && (
              <div className={`mt-4 p-2 text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default Course;



