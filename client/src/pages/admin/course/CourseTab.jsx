// import RichTextEditor from "@/components/RichTextEditor";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   useEditCourseMutation,
//   useGetCourseByIdQuery,
//   usePublishCourseMutation,
// } from "@/features/api/courseApi";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";

// const CourseTab = () => {
  
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const params = useParams();
//   const courseId = params.courseId;
//   const { data: courseByIdData, isLoading: courseByIdLoading , refetch} =
//     useGetCourseByIdQuery(courseId);

//     const [publishCourse, {}] = usePublishCourseMutation();
 
//   useEffect(() => {
//     if (courseByIdData?.course) { 
//         const course = courseByIdData?.course;
//       setInput({
//         courseTitle: course.courseTitle,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         courseLevel: course.courseLevel,
//         coursePrice: course.coursePrice,
//         courseThumbnail: "",
//       });
//     }
//   }, [courseByIdData]);

//   const [previewThumbnail, setPreviewThumbnail] = useState("");
//   const navigate = useNavigate();

//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };
//   const selectCourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };
//   // get file
//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);

//     await editCourse({ formData, courseId });
//   };

//   const publishStatusHandler = async (action) => {
//     try {
//       const response = await publishCourse({courseId, query:action});
//       if(response.data){
//         refetch();
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to publish or unpublish course");
//     }
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "Course update.");
//     }
//     if (error) {
//       toast.error(error.data.message || "Failed to update course");
//     }
//   }, [isSuccess, error]);

//   if(courseByIdLoading) return <h1>Loading...</h1>
 
//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make changes to your courses here. Click save when you're done.
//           </CardDescription>
//         </div>
//         <div className="space-x-2">
//           <Button disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={()=> publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
//             {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div>
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="courseTitle"
//               value={input.courseTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Fullstack developer"
//             />
//           </div>
//           <div>
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
//             />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <RichTextEditor input={input} setInput={setInput} />
//           </div>
//           <div className="flex items-center gap-5">
//             <div>
//               <Label>Category</Label>
//               <Select
//                 defaultValue={input.category}
//                 onValueChange={selectCategory}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {/* <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Frontend Development">
//                       Frontend Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Javascript">Javascript</SelectItem>
//                     <SelectItem value="Python">Python</SelectItem>
//                     <SelectItem value="Docker">Docker</SelectItem>
//                     <SelectItem value="MongoDB">MongoDB</SelectItem>
//                     <SelectItem value="HTML">HTML</SelectItem>
//                   </SelectGroup> */}
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Agile Management">Agile Management</SelectItem>
//                     <SelectItem value="Project Management">Project Management</SelectItem>
//                     <SelectItem value="Cloud Computing">
//                     Cloud Computing
//                     </SelectItem>
//                     <SelectItem value="Data Science">
//                     Data Science
//                     </SelectItem>
//                     <SelectItem value="DevOps">
//                     DevOps
//                     </SelectItem>
//                     <SelectItem value="BI And Visualization">BI And Visualization</SelectItem>
//                     <SelectItem value="Cyber Security">Cyber Security</SelectItem>
//                     <SelectItem value="Web Developmentr">Web Development</SelectItem>
//                     <SelectItem value="Blockchain">Blockchain</SelectItem>
//                     <SelectItem value="Programming">Programming</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Course Level</Label>
//               <Select
//                 defaultValue={input.courseLevel}
//                 onValueChange={selectCourseLevel}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a course level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Course Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Price in (USD)</Label>
//               <Input
//                 type="number"
//                 name="coursePrice"
//                 value={input.coursePrice}
//                 onChange={changeEventHandler}
//                 placeholder="199"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div>
//             <Label>Course Thumbnail</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit"
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 className="e-64 my-2"
//                 alt="Course Thumbnail"
//               />
//             )}
//           </div>
//           <div>
//             <Button onClick={() => navigate("/admin/course")} variant="outline">
//               Cancel
//             </Button>
//             <Button disabled={isLoading} onClick={updateCourseHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;


import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    courseThumbnail: "",
    pricingOptions: [{ optionName: "", price: "" }],
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();
  const navigate = useNavigate();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        courseThumbnail: "",
        pricingOptions: course.pricingOptions || [{ optionName: "", price: "" }],
      });
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handlePriceChange = (index, field, value) => {
    const updatedPrices = [...input.pricingOptions];
    updatedPrices[index][field] = value;
    setInput({ ...input, pricingOptions: updatedPrices });
  };

  const addPriceOption = () => {
    setInput({
      ...input,
      pricingOptions: [...input.pricingOptions, { optionName: "", price: "" }],
    });
  };

  const removePriceOption = (index) => {
    const updatedPrices = input.pricingOptions.filter((_, i) => i !== index);
    setInput({ ...input, pricingOptions: updatedPrices });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("courseThumbnail", input.courseThumbnail);
    formData.append("pricingOptions", JSON.stringify(input.pricingOptions));

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <Label>Category</Label>
              <Select defaultValue={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Agile Management">Agile Management</SelectItem>
                    <SelectItem value="Project Management">Project Management</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="BI And Visualization">BI And Visualization</SelectItem>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select defaultValue={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} className="w-64 my-2" alt="Course Thumbnail" />
            )}
          </div>

          {/* Price Options Section */}
          <div>
            <Label>Price Options (USD)</Label>
            {input.pricingOptions.map((option, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <Input
                  placeholder="Option Name (e.g. Basic, Premium)"
                  value={option.optionName}
                  onChange={(e) => handlePriceChange(index, "optionName", e.target.value)}
                  className="w-[180px]"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={option.price}
                  onChange={(e) => handlePriceChange(index, "price", e.target.value)}
                  className="w-[120px]"
                />
                {input.pricingOptions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removePriceOption(index)}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPriceOption}
              className="mt-1"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Option
            </Button>
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
