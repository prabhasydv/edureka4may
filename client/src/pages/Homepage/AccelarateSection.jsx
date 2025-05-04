"use client";

import { Users, BookOpen, Award, Star } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <BookOpen className="w-12 h-12 text-[#c04542] dark:text-[#f87171]" />, // Adjusted for dark mode
    title: "Personalized Career Mentoring",
    description:
      "Connect with industry experts who guide you through every step of your learning journey.",
  },
  {
    id: 2,
    icon: <Users className="w-12 h-12 text-[#c04542] dark:text-[#f87171]" />,
    title: "Live Instructor-Led Training",
    description:
      "Engage in interactive sessions with certified instructors who share real-world examples.",
  },
  {
    id: 3,
    icon: <Award className="w-12 h-12 text-[#c04542] dark:text-[#f87171]" />,
    title: "Globally Recognized Certifications",
    description:
      "Earn credentials from top accreditation bodies that boost your resume and career prospects.",
  },
  {
    id: 4,
    icon: <Star className="w-12 h-12 text-[#c04542] dark:text-[#f87171]" />,
    title: "Blended Learning Approach",
    description:
      "Get the best of both worlds with a combination of live classes, hands-on projects, and self-paced content.",
  },
];

export default function AcceleratorSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#363d47] dark:text-gray-100 mb-4">
            Accelerate Your Career with Our Expert Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've created a comprehensive learning platform to help you master in-demand skills and
            advance your career faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="grid grid-cols-1 gap-8">
              {features.slice(0, 2).map((feature) => (
                <div key={feature.id} className="flex gap-4">
                  <div className="flex-shrink-0 bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#363d47] dark:text-gray-100 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-first md:order-none mb-8 md:mb-0">
            <div className="relative h-72 md:h-96 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="relative w-3/4 h-3/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="mx-auto w-24 h-24 bg-blue-100 dark:bg-blue-700 rounded-full flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-[#c04542] dark:bg-[#f87171] rounded-full" />
                  </div>
                  <h3 className="font-bold text-[#363d47] dark:text-gray-100 text-lg">Experience Innovative Learning</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Our unique approach combines theory with practical application
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {features.slice(2, 4).map((feature) => (
                <div key={feature.id} className="flex gap-4">
                  <div className="flex-shrink-0 bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#363d47] dark:text-gray-100 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#c04542] dark:text-[#f87171]">450,000+</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Professionals Trained</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#45be91] dark:text-[#34d399]">4,500+</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Organizations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f6c911] dark:text-[#facc15]">100+</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
