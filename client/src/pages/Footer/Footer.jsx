import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import theeduocenlogo from '../../assets/theeduoceanlogo.png'; // adjust path as needed
import { useSubmitContactFormMutation } from "@/features/api/authApi";
import { X } from "lucide-react"; // Import the cross icon



// const Footer = () => {
//   const footerSections = [
//     {
//       title: "Courses",
//       links: [
//         { name: "Agile Management", href: "/course/search?query=agile+management" },
//         { name: "Project Management", href: "/course/search?query=project+management" },
//         { name: "DevOps", href: "/course/search?query=devops" },
//         { name: "Data Science", href: "/course/search?query=data+science" },
//         { name: "Cloud Computing", href: "/course/search?query=cloud+computing" },
//       ],
//     },
//     {
//       title: "Offerings",
//       links: [
//         { name: "All Courses", href: "/course/search?query" },
//         { name: "Live Training", href: "#" },
//         { name: "Corporate Training", href: "#" },
//         { name: "Consulting", href: "#" },
//         { name: "Free Resources", href: "#" },
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         { name: "Blogs", href: "#" },
//         { name: "Tutorials", href: "#" },
//         { name: "Practice Tests", href: "#" },
//         { name: "Interview Questions", href: "#" },
//         { name: "Success Stories", href: "#" },
//       ],
//     },
//   ];

//   const socialLinks = [
//     { name: "Facebook", icon: <Facebook size={16} />, href: "#" },
//     { name: "Twitter", icon: <Twitter size={16} />, href: "#" },
//     { name: "Instagram", icon: <Instagram size={16} />, href: "#" },
//     { name: "LinkedIn", icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/theeduocean/?viewAsMember=true" },
//     { name: "YouTube", icon: <Youtube size={16} />, href: "#" },
//   ];

//   return (
//     <footer className="bg-[#f8f8fb] dark:bg-[#1a1a2e] pt-16 pb-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Logo and About */}
//           <div className="space-y-4">
//             <a href="/" className="inline-block">
//               <Link to="/" className="flex items-center">
//                           <img
//                             src={theeduocenlogo}
//                             alt="E-Learning Logo"
//                             className="h-12 md:h-14 w-auto object-contain"
//                           />
//                         </Link>
//             </a>
//             <p className="text-gray-600 dark:text-gray-400 text-sm">
//             TheEduOcean is an online bootcamp for IT & Management trainees and certification seekers across the world. With the versatile e-learning solutions, expert guidance, informative and less complex presentations.
//             </p>
//           </div>

//           {/* Footer Sections */}
//           {footerSections.map((section) => (
//             <div key={section.title} className="space-y-4">
//               <h3 className="font-bold text-[#363d47] dark:text-gray-300">{section.title}</h3>
//               <ul className="space-y-2">
//                 {section.links.map((link) => (
//                   <li key={link.name}>
//                     <a
//                       href={link.href}
//                       className="text-gray-600 dark:text-gray-400 hover:text-[#c04542] dark:hover:text-[#f05454] text-sm"
//                     >
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="bg-[#f6c911] dark:bg-[#ffbe0b] p-6 rounded-lg mb-12">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div>
//               <h3 className="text-[#363d47] dark:text-[#1a1a2e] font-bold text-xl">
//                 Book a Free Counseling Session Today
//               </h3>
//               <p className="text-[#363d47] dark:text-[#1a1a2e] text-sm">
//                 Speak with our experts to get personalized recommendations for your career growth.
//               </p>
//             </div>
//             <a
//               href="#"
//               className="bg-[#c04542] dark:bg-[#f05454] hover:bg-[#aa3e3b] dark:hover:bg-[#ff414d] text-white font-semibold py-2 px-6 rounded-md whitespace-nowrap"
//             >
//               Contact Us
//             </a>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="text-gray-500 dark:text-gray-400 text-sm">
//               © {new Date().getFullYear()} The Eduocean. All rights reserved.
//             </div>
//             <div className="flex space-x-4">
//               {socialLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className="text-gray-400 dark:text-gray-500 hover:text-[#c04542] dark:hover:text-[#f05454]"
//                   aria-label={link.name}
//                 >
//                   {link.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
//             <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
//               Terms & Conditions
//             </a>
//             <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
//               Sitemap
//             </a>
//             <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
//               Security Information
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const footerSections = [
    {
      title: "Courses",
      links: [
        { name: "Agile Management", href: "/course/search?query=agile+management" },
        { name: "Project Management", href: "/course/search?query=project+management" },
        { name: "DevOps", href: "/course/search?query=devops" },
        { name: "Data Science", href: "/course/search?query=data+science" },
        { name: "Cloud Computing", href: "/course/search?query=cloud+computing" },
      ],
    },
    {
      title: "Offerings",
      links: [
        { name: "All Courses", href: "/course/search?query" },
        { name: "Live Training", href: "#" },
        { name: "Corporate Training", href: "#" },
        { name: "Consulting", href: "#" },
        { name: "Free Resources", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blogs", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Practice Tests", href: "#" },
        { name: "Interview Questions", href: "#" },
        { name: "Success Stories", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <Facebook size={16} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={16} />, href: "#" },
    { name: "Instagram", icon: <Instagram size={16} />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/theeduocean/?viewAsMember=true" },
    { name: "YouTube", icon: <Youtube size={16} />, href: "#" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitContactForm, { isLoading, error, isSuccess }] = useSubmitContactFormMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the submitContactForm API mutation
      await submitContactForm(formData).unwrap();
      setFormData({ name: "", email: "", message: "" }); // Reset form after successful submission
    } catch (err) {
      console.error('Submission failed', err);
    }
  };



  return (
    <footer className="bg-[#f8f8fb] dark:bg-[#1a1a2e] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <Link to="/" className="flex items-center">
                <img
                  src={theeduocenlogo}
                  alt="E-Learning Logo"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </Link>
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              TheEduOcean is an online bootcamp for IT & Management trainees and certification seekers across the world. With the versatile e-learning solutions, expert guidance, informative and less complex presentations.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-bold text-[#363d47] dark:text-gray-300">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#c04542] dark:hover:text-[#f05454] text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-[#f6c911] dark:bg-[#ffbe0b] p-6 rounded-lg mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-[#363d47] dark:text-[#1a1a2e] font-bold text-xl">
                Book a Free Counseling Session Today
              </h3>
              <p className="text-[#363d47] dark:text-[#1a1a2e] text-sm">
                Speak with our experts to get personalized recommendations for your career growth.
              </p>
            </div>
            <button
              onClick={openModal}
              className="bg-[#c04542] dark:bg-[#f05454] hover:bg-[#aa3e3b] dark:hover:bg-[#ff414d] text-white font-semibold py-2 px-6 rounded-md whitespace-nowrap"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-6xl sm:max-w-2xl md:max-w-6xl relative flex flex-col md:flex-row overflow-auto max-h-full">

              {/* Left Section: Contact Details */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0 flex flex-col justify-start">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Please Drop a Message <br />
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Get in touch and let me know how I can help. Fill out the form, and I'll be in touch as soon as possible.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <span className="text-xl text-gray-500 dark:text-gray-400">📍</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Address:</p>
                      <p className="text-gray-600 dark:text-gray-300">45,3rd floor ,village Dun, industrial complex Dundahera Gurgaon,Haryana-122016</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <span className="text-xl text-gray-500 dark:text-gray-400">📞</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Phone:</p>
                      <p className="text-gray-600 dark:text-gray-300">(+1) (914) 863-1450</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <span className="text-xl text-gray-500 dark:text-gray-400">✉️</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Email:</p>
                      <p className="text-gray-600 dark:text-gray-300">info@theduocean.org</p>
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="mt-6 flex justify-center lg:justify-start gap-4">
                  <a href="#"
                    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-neutral-200 hover:w-32 transition-all overflow-hidden">
                    <span className="hidden group-hover:inline whitespace-nowrap mr-2">GitHub</span>🐙
                  </a>
                  <a href="#"
                    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-neutral-200 hover:w-36 transition-all overflow-hidden">
                    <span className="hidden group-hover:inline whitespace-nowrap mr-2">LinkedIn</span>💼
                  </a>
                  <a href="#"
                    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-neutral-200 hover:w-36 transition-all overflow-hidden">
                    <span className="hidden group-hover:inline whitespace-nowrap mr-2">Facebook</span>📘
                  </a>
                  <a href="#"
                    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-neutral-200 hover:w-36 transition-all overflow-hidden">
                    <span className="hidden group-hover:inline whitespace-nowrap mr-2">YouTube</span>▶️
                  </a>
                </div>
              </div>

              {/* Right Section: Contact Form */}
              <div className="w-full md:w-1/2 bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  <X size={24} />
                </button>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Your Email <span className="text-xs">(Required)</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Your Message <span className="text-xs">(Required)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </form>

                {/* Success/Error Message */}
                {isSuccess && <p className="mt-4 text-green-500 text-center">Your message was submitted successfully!</p>}
                {error && <p className="mt-4 text-red-500 text-center">Failed to submit. Please try again.</p>}
              </div>

            </div>
          </div>
        )}



        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} The Eduocean. All rights reserved.
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 dark:text-gray-500 hover:text-[#c04542] dark:hover:text-[#f05454]"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
              Sitemap
            </a>
            <a href="#" className="hover:text-[#c04542] dark:hover:text-[#f05454]">
              Security Information
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
