import { ChevronDown, Menu, School, Search, SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";
// import { FiRefreshCw, FiDatabase, FiGitCommit } from "react-icons/fi";
// import { WiSnow } from "react-icons/wi";
// import { FaTerminal } from "react-icons/fa";
import { FiRefreshCw, FiDatabase, FiGitCommit, FiShield, FiCloud, FiGlobe } from "react-icons/fi";
import { WiSnow } from "react-icons/wi";
import { FaTerminal, FaCode, FaCube } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import theeduocenlogo from '../assets/theeduoceanlogo.png'; // adjust path as needed


const Data = {
  "Project Management": {
    icon: <FiRefreshCw className="mr-2 text-gray-500 dark:text-gray-300" />,
    items: [
      {
        name: "PMP Certification Training",
        link: "/course/search?query=PMP",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/prince-2-practitioner-and-foundation.svg",
      },
      {
        name: "Certified Scrum Master(CSM)Certification",
        link: "/course/search?query=CAPM",
        icon: "https://www.agile42.com/wp-content/media/images/csm_logo_jwfqFz7.original.png",
      },
      {
        name: "Project Management Training [Masters...",
        link: "/course/search?query=RMP",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/PMP.svg",
      },
      {
        name: "Professional Scrum Master (PSM)Certification Training)",
        link: "/course/search?query=Prince",
        icon: "https://scrumorg-website-prod.s3.amazonaws.com/drupal/inline-images/PSM-I_600.png",
      },
      {
        name: "PRINCE2 Foundation & Practitioner Certification Course",
        link: "/course/search?query=Prince",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/prince-2-practitioner-and-foundation.svg",
      },
      {
        name: "Advance Executive Certificate in Supply Chain Strategy",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "CSPO Certification Training Course",
        link: "/blockchain",
        icon: "https://www.agile42.com/wp-content/media/images/cspo_logo_VkQvEku.original.png",
      },
      {
        name: "Executive Post Graduate Programme in HRM",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "Advance Executive Certificate in Product Management",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "Executive Development Programme in General Management",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "Advance Executive Certificate in Business Management in digital",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "PMI agile Certified Practitioner Training",
        link: "/blockchain",
        icon: "https://d20f8czie2ltiw.cloudfront.net/images/vendors/pmi-atp-badge-2024-rgb.png",
      },
      {
        name: "Project and Infrastructure Financing",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "PMI-RMP Certification Training Course",
        link: "/blockchain",
        icon: "https://d20f8czie2ltiw.cloudfront.net/images/vendors/pmi-atp-badge-2024-rgb.png",
      },
      {
        name: "Six Sigma Green Belt Certification Training",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
      {
        name: "PgMP Certification Training Course",
        link: "/blockchain",
        icon: "https://d20f8czie2ltiw.cloudfront.net/images/vendors/pmi-atp-badge-2024-rgb.png",
      },
    ],
  },

  "Data Science": {
    icon: <FiDatabase className="mr-2 text-gray-500 dark:text-gray-300" />,
    items: [
      {
        name: "Python for Data Science",
        link: "/bi-visualization",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "BI Visualization",
        link: "/bi-visualization",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/Microsoft-Power-BI.svg",
      },
      {
        name: "Cyber Security",
        link: "/cyber-security",
        icon: "https://img.icons8.com/color/48/000000/cyber-security.png",
      },
      {
        name: "Web Development",
        link: "/web-development",
        icon: "https://img.icons8.com/color/48/000000/source-code.png",
      },
      {
        name: "Blockchain",
        link: "/blockchain",
        icon: "https://img.icons8.com/color/48/000000/blockchain-technology.png",
      },
    ],
  },

  "Cloud Computing": {
    icon: <FiCloud className="mr-2 text-gray-500 dark:text-gray-300" />,
    items: [
      {
        name: "AWS Solutions Architecture Associate",
        link: "/azure",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "AWS Solutions Architecture Professional",
        link: "/azure",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "AWS Certified Cloud Practitioner CLF-C01",
        link: "/google-cloud",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "AWS Certified DevOps Engineer - Professional DOP-C01",
        link: "/devops",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "AZ 900 Exam: Microsoft Azure Fundamentals",
        link: "/docker-kubernetes",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AZURE.svg",
      },
      {
        name: "AZ-104: Microsoft Azure Administrator",
        link: "/docker-kubernetes",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AZURE.svg",
      },
      {
        name: "AZ 305: Designing Microsoft Azure Infrastructure Solutions",
        link: "/docker-kubernetes",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AZURE.svg",
      },
      {
        name: "AZ-204: Developing Solutions For Microsoft Azure Certification",
        link: "/docker-kubernetes",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AZURE.svg",
      },
      {
        name: "Microsoft Azure DevOps 400",
        link: "/docker-kubernetes",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AZURE.svg",
      },
      {
        name: "DevOps Certification Courses Training",
        link: "/docker-kubernetes",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
    ],
  },

  "ITSM": {
    icon: <FiGitCommit className="mr-2 text-gray-500 dark:text-gray-300" />,
    items: [
      {
        name: "ITIL Foundation",
        link: "/courses/itil-foundation",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "DevOps Practitioner",
        link: "/courses/devops",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
    ],
  },

  "DevOps": {
    icon: <FaTerminal className="mr-2 text-neutral-500" />,
    items: [
      {
        name: "Kubernetes Certification Training Course: Administrator (CKA)",
        link: "/courses/docker-kubernetes",
        icon: "https://www.cloudops.com/images/cka-logo.png",
      },
      {
        name: "Certified Kubernetes Application Developer (CKAD)",
        link: "/courses/terraform",
        icon: "https://miro.medium.com/v2/resize:fit:1024/1*JxNyk6ELTDf6N9QTCqVHKw.png",
      },
    ],
  },

  "BI & Visualization": {
    icon: <MdBarChart className="mr-2 text-neutral-500 text-xl" />,
    items: [
      {
        name: "Power BI / Tableau",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
    ],
  },

  "Cyber Security": {
    icon: <FiShield className="mr-2 text-neutral-500" />,
    items: [
      {
        name: "OSCP Certification Exam",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "Certified Information Systems Security Professional(CISSP)",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "Certified Cloud Security Professional(CISSP)",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "Certified Information System Auditor(CISA)",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "Certified Information Security Manager (CISM)",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "AWS Security Certification Courses Training",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "AWS Certified Security-Specialty(Security Engineering on AWS) ",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "CompTIA-SYO-601-Security+ SYO-601",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/mega_menu/AWS.svg",
      },
      {
        name: "CompTIA Network+ (N10-008)N10-008",
        link: "/courses/ethereum-development",
        icon: "Confidentiality, Integrity & Availability(CIA triad)",
      },
    ],
  },

  "Agile Management": {
    icon: <FaCode className="mr-2 text-neutral-500" />,
    items: [
      {
        name: "Ethereum Development",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
    ],
  },

  "Software Testing": {
    icon: <FaCube className="mr-2 text-neutral-500" />,
    items: [
      {
        name: "Selenium Essentials Training",
        link: "/courses/web3-fundamentals",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
      {
        name: "ISTQB Foundation Level",
        link: "/courses/ethereum-development",
        icon: "https://register.expleoacademy.com/content/img/ISTQB_AccreditedTrainingProvider.png",
      },
      {
        name: "Cucumber Training",
        link: "/courses/nft-dapps",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
    ],
  },
  "Others": {
    icon: <FiGitCommit className="mr-2 text-gray-500 dark:text-gray-300" />,
    items: [
      {
        name: "Graduate Record Examinations(GRE)",
        link: "/courses/web3-fundamentals",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
      {
        name: "Graduate Management Admission Test(GMAT)",
        link: "/courses/ethereum-development",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
      {
        name: "Statical Process Control (SPC)",
        link: "/courses/nft-dapps",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
      {
        name: "Salesforce : Administrator and App Builder",
        link: "/courses/nft-dapps",
        icon: "https://d2o2utebsixu4k.cloudfront.net/assets/resources/CSM.svg",
      },
    ],
  },
};

const categories = Object.keys(Data);


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const dropdownRef = useRef(null);


  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };
  const categories = Object.keys(Data);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);


  const mainMenuItems = [
    // { name: "All Courses", href: "#" },
    { name: "Resources", href: "#", dropdown: true },
    // { name: "Domain", href: "#", dropdown: true },

    // { name: "Events", href: "#" },
    // { name: "Help", href: "#", dropdown: true },
  ];

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      {/* <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              deducation
            </h1>
          </Link>
        </div> */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to="/" className="flex items-center">
          <img
            src={theeduocenlogo}
            alt="E-Learning Logo"
            className="h-14 w-28 sm:h-16 sm:w-32 md:h-20 md:w-36 lg:h-24 lg:w-40 object-contain flex-shrink-0"
          />
        </Link>






        <div className="flex items-center gap-3 w-full max-w-lg" ref={dropdownRef}>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 focus:outline-none border border-gray-300 dark:border-gray-600 shadow-md rounded-[0.5rem]"
          >
            <span className="truncate">All Courses</span>
            <ChevronDownIcon
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>


          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white dark:bg-gray-800 rounded-[0.5rem] shadow-md overflow-hidden flex-grow"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="text-left flex-grow border-none focus:outline-none focus:ring-0 px-4 py-2 text-gray-900 dark:text-white placeholder-grey-400 dark:placeholder-gray-400"

            />
          </form>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="fixed top-[4rem] left-0 w-full z-40 px-4 sm:px-6 lg:px-10">
              <div className="flex flex-col md:flex-row gap-6 max-w-screen-xl mx-auto px-6 py-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-300 items-start">

                {/* Left - Category List */}
                <div className="w-full md:w-1/4 space-y-3 border-r border-gray-300 dark:border-gray-700 pr-4">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">
                        Categories
                      </h2>
                    </div>
                    <div className="w-20 h-[2px] bg-gray-500 dark:bg-blue-400 rounded-sm mt-2 mb-4"></div>
                  </div>

                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer flex items-center gap-2 text-base font-medium px-3 py-2 rounded-lg transition-all duration-300
                           ${selectedCategory === category
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          : "hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                    >
                      <span className="text-lg">{Data[category].icon}</span>
                      {category}
                    </div>
                  ))}
                </div>

                {/* Right - Items */}
                <div className="w-full md:w-3/4">
                  {/* Title for Right Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">
                        Certifications
                      </h2>
                    </div>
                    <div className="w-20 h-[2px] bg-gray-500 dark:bg-blue-400 rounded-sm mt-2 mb-4"></div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Data[selectedCategory]?.items.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-5 h-5"
                        />
                        <span className="text-base text-gray-800 dark:text-gray-200 font-medium">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group">
            <Link to="https://www.linkedin.com/company/theeduocean/?viewAsMember=true" className="flex items-center text-[#363d47] hover:text-[#5358ec] px-2 py-2 text-sm font-medium dark:text-gray-200">
              LinkedIn
            </Link>
          </div>
          {mainMenuItems.map((item) => (
            <div key={item.name} className="relative group">
              <button
                className="flex items-center text-[#363d47] hover:text-[#5358ec] px-2 py-2 text-sm font-medium dark:text-gray-200"
                onClick={() => item.dropdown && toggleDropdown(item.name)}
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""
                      }`}
                  />
                )}
              </button>

              {item.dropdown && openDropdown === item.name && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 dark:ring-gray-600 p-2 z-50">
                  <div className="py-1">
                    <Link
                      to="/Become-an-instructor"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center text-[#363d47] hover:text-[#5358ec] px-2 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-[#5358ec]"
                    >
                      Become an Instructor
                    </Link>
                    <Link
                      to="/interview-preprations"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center text-[#363d47] hover:text-[#5358ec] px-2 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-[#5358ec]"
                    >
                      Interview Prepration
                    </Link>
                  </div>
                </div>
              )}

            </div>
          ))}

          <div className="relative group">
            <Link
              to="/interview-preprations"
              className="flex items-center whitespace-nowrap text-[#363d47] hover:text-[#5358ec] px-2 py-2 text-sm font-medium dark:text-gray-200"
            >
              Project Help
            </Link>
          </div>
        </div>



        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>






              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="profile">Edit Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl"><Link to="/" className="flex items-center">
          <img
            src={theeduocenlogo}
            alt="E-Learning Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link></h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const dropdownRef = useRef(null);

  const logoutHandler = async () => {
    await logoutUser();
    setOpen(false);
    navigate("/login");
  };
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex justify-end px-2 ml-10" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:w-auto text-left px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 focus:outline-none border border-gray-300 dark:border-gray-600 shadow-md rounded-[0.5rem]"
        >
          <span className="truncate">All Courses</span>
          <ChevronDownIcon
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="fixed top-[4rem] left-0 w-full z-40 px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row gap-6 max-w-screen-xl mx-auto px-6 py-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-300 items-start">

              {/* Left - Category List */}
              {!selectedCategory && (
                <div className="w-full md:w-1/4 space-y-3 border-r border-gray-300 dark:border-gray-700 pr-4 max-h-96 overflow-y-auto">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">
                        Categories
                      </h2>
                    </div>
                    <div className="w-20 h-[2px] bg-gray-500 dark:bg-blue-400 rounded-sm mt-2 mb-4"></div>
                  </div>

                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer flex items-center gap-2 text-base font-medium px-3 py-2 rounded-lg transition-all duration-300
                    ${selectedCategory === category
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          : "hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                    >
                      <span className="text-lg">{Data[category].icon}</span>
                      {category}
                    </div>
                  ))}
                </div>
              )}

              {/* Right - Items */}
              <div className="w-full md:w-3/4">
                {/* Back Button */}
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mb-4 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
                  >
                    &larr; Back to Categories
                  </button>
                )}

                {/* Title for Right Section */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    {/* <h2 className="text-base font-semibold text-gray-600 dark:text-gray-300 tracking-wide uppercase">
                  {selectedCategory ? "Certifications" : "Select a Category"}
                </h2> */}
                  </div>
                  {/* <div className="w-20 h-[2px] bg-gray-500 dark:bg-blue-400 rounded-sm mt-2 mb-4"></div> */}
                </div>

                {/* Items Grid */}
                {selectedCategory ? (
                  <div className="max-h-80 overflow-y-auto"> {/* Scrollable Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Data[selectedCategory]?.items.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-5 h-5"
                          />
                          <span className="text-base text-gray-800 dark:text-gray-200 font-medium">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

            </div>
          </div>
        )}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle>
              <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
                <img src={theeduocenlogo} alt="E-Learning Logo" className="h-10 w-auto object-contain" />
              </Link>
            </SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="my-2" />

          <nav className="flex flex-col space-y-4">
            <Link to="https://www.linkedin.com/company/theeduocean/?viewAsMember=true" onClick={() => setOpen(false)}>
              LinkedIn
            </Link>
            <Link to="/Become-an-instructor" onClick={() => setOpen(false)}>
              Become an Instructor
            </Link>
            <Link to="/interview-preprations" onClick={() => setOpen(false)}>
              Interview Preparation
            </Link>
            <Link to="/interview-preprations" onClick={() => setOpen(false)}>
              Project Help
            </Link>

            {user ? (
              <>
                <Link to="/my-learning" onClick={() => setOpen(false)}>
                  My Learning
                </Link>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  Edit Profile
                </Link>
                <button onClick={logoutHandler}>Log out</button>

                {user?.role === "instructor" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      navigate("/admin/dashboard");
                    }}
                  >
                    Dashboard
                  </Button>
                )}
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { setOpen(false); navigate("/login"); }}>
                  Login
                </Button>
                <Button onClick={() => { setOpen(false); navigate("/login"); }}>
                  Signup
                </Button>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};


