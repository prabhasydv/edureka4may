import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Check, CheckCircle2, Lock } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);
  const [selectedOption, setSelectedOption] = useState(null); // 👈 state for selected pricing option

  const handleOptionChange = (option) => {
    setSelectedOption(option); // Update selected option when user selects a pricing option
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Course Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">{course?.subTitle || "Course Sub-title"}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name || "Instructor Name"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0]}</p>
          </div>
          {/* <p>Students enrolled: {course?.enrolledStudents?.length}</p> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 space-y-5">
          {/* Course Description */}
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          />

          {/* Curriculum Section */}
          <Card>
            <CardHeader>
              <CardTitle>Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.length > 0 ? (
                course?.lectures?.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="h-20 flex items-center gap-4 px-4 rounded-xl border bg-card text-card-foreground shadow"
                  >
                    <span>
                      {true ? (
                        <div className="w-5 h-5 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      ) : (
                        <Lock size={14} className="text-gray-600 dark:text-gray-400" />
                      )}
                    </span>
                    <p className="text-left">{lecture.lectureTitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No lectures available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              
              {/* Course Video */}
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures?.[0]?.videoUrl}
                  controls={true}
                  light={course?.courseThumbnail || "/default-thumbnail.jpg"}
                />
              </div>

              {/* Course Highlights */}
              {[
                "Boost Your Skills, Elevate Your Career!",
                "Your Growth Starts Here!",
                "Turn Knowledge into Action!",
                "Learn Fast, Earn Faster!",
              ].map((text, index) => (
                <div className="flex items-center mt-[15px]" key={index}>
                  <CheckCircle2 size={24} className="text-green-500 mx-2" />
                  <h1>{text}</h1>
                </div>
              ))}

              <Separator className="my-4" />

              {/* Pricing Options */}
              <h1 className="text-lg md:text-xl font-semibold mb-2">Pricing Options</h1>
              <div className="space-y-2">
                {course?.pricingOptions?.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 cursor-pointer border rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <input
                      type="radio"
                      name="pricingOption"
                      value={option.optionName}
                      onChange={() => handleOptionChange(option)} 
                      checked={selectedOption?.optionName === option.optionName}
                    />
                    <div className="flex justify-between w-full">
                      <span>{option.optionName}</span>
                      <span className="font-semibold">${option.price}</span>
                    </div>
                  </label>
                ))}
              </div>

            </CardContent>

            {/* Action Button */}
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} selectedOption={selectedOption} />
              )}
            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;



