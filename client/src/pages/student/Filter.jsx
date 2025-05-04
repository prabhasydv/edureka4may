import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { ArrowUpRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  // { id: "nextjs", label: "Next JS" },
  // { id: "data science", label: "Data Science" },
  // { id: "frontend development", label: "Frontend Development" },
  // { id: "fullstack development", label: "Fullstack Development" },
  // { id: "mern stack development", label: "MERN Stack Development" },
  // { id: "backend development", label: "Backend Development" },
  // { id: "javascript", label: "Javascript" },
  // { id: "python", label: "Python" },
  // { id: "docker", label: "Docker" },
  // { id: "mongodb", label: "MongoDB" },
  // { id: "html", label: "HTML" },

  { id: "agile management", label: "Agile Management" },
  { id: "project management", label: "Project Management" },
  { id: "cloud computing", label: "Cloud Computing" },
  { id: "it service management", label: "IT Service Management" },
  { id: "data science", label: "Data Science" },
  { id: "devops", label: "DevOps" },
  { id: "bi and visualization", label: "BI And Visualization" },
  { id: "cyber security", label: "Cyber Security" },
  { id: "web development", label: "Web Development" },
  { id: "blockchain", label: "Blockchain" },
  { id: "programming", label: "Programming" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const navigate = useNavigate(); // <-- initialize navigate

  const handleCategoryChange = (categoryId) => {
    const newCategory = categoryId === selectedCategory ? "" : categoryId;
    setSelectedCategory(newCategory);
    handleFilterChange(newCategory ? [newCategory] : [], sortByPrice);
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategory ? [selectedCategory] : [], selectedValue);
  };

  return (
    // <div className="w-full md:w-[20%]">
    //   <div className="flex items-center justify-between">
    //     <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
    //     <Select onValueChange={selectByPriceHandler}>
    //       <SelectTrigger>
    //         <SelectValue placeholder="Sort by" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectGroup>
    //           <SelectLabel>Sort by price</SelectLabel>
    //           <SelectItem value="low">Low to High</SelectItem>
    //           <SelectItem value="high">High to Low</SelectItem>
    //         </SelectGroup>
    //       </SelectContent>
    //     </Select>
    //   </div>
    //   <Separator className="my-4" />
    //   <div>
    //     <h1 className="font-semibold mb-2">CATEGORY</h1>
    //     {categories.map((category) => (
    //       <div key={category.id} className="flex items-center space-x-2 my-2">
    //         <Checkbox
    //           id={category.id}
    //           checked={selectedCategory === category.id}
    //           onCheckedChange={() => handleCategoryChange(category.id)}
    //         />
    //         <Label
    //           htmlFor={category.id}
    //           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //         >
    //           {category.label}
    //         </Label>
    //       </div>
    //     ))}
    //     <button
    //   onClick={() => navigate(`/course/search?query`)}
    //   className="inline-flex items-center gap-1 mt-2 hover:underline"
    // >
    //   <span className="font-medium">Browse All Courses</span>
    //   <ArrowUpRightIcon className="w-5 h-5" />
    // </button>

    //   </div>
    // </div>
    <section className="w-full md:w-[25%]">
      <div class="relative w-full max-w-sm mb-3">
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid">
        <div className="md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
          <div className="box rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-full md:max-w-sm">
            <h6 className="font-medium text-base leading-7 text-black dark:text-white mb-5">
              CATEGORY
            </h6>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2 my-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategory === category.id}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                  className="mb-2"/>
                <Label
                  htmlFor={category.id}
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300 w-full">
                  {category.label}
                </Label>
              </div>
            ))}
            <button
              onClick={() => navigate(`/course/search?query`)}
              className="inline-flex items-center gap-1 mt-2 hover:underline text-black dark:text-white">
              <span className="font-medium">Browse All Courses</span>
              <ArrowUpRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;
