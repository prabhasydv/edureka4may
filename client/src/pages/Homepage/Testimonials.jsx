import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kenzie Edgar",
      image: "https://i.pravatar.cc/100?img=1",
      text: "The courses at Eduocean were life-changing! The content was well-structured, and the instructors were experts in their fields. I learned so much and gained skills that helped me advance in my career!"
    },
    {
      name: "Stevie Tifft",
      image: "https://i.pravatar.cc/100?img=2",
      text: "Eduocean made learning fun and easy! The interactive lessons and the support from the community made it easy to stay motivated and engaged throughout the course."
    },
    {
      name: "Tommie Ewart",
      image: "https://i.pravatar.cc/100?img=3",
      text: "I had an amazing experience with Eduocean. The courses are comprehensive, and the tutors are always available to provide guidance and assistance. I highly recommend it to anyone looking to expand their knowledge!"
    },
    {
      name: "Charlie Howse",
      image: "https://i.pravatar.cc/100?img=4",
      text: "Eduocean has transformed the way I learn. The platform is user-friendly, and I was able to easily track my progress. The real-world examples in the courses helped me understand the subject matter better."
    },
    {
      name: "Nevada Herbertson",
      image: "https://i.pravatar.cc/100?img=5",
      text: "Eduocean's courses provided me with practical knowledge that I could apply right away. The instructors were supportive, and the materials were detailed. I feel confident using what I learned in my professional life."
    },
    {
      name: "Kris Stanton",
      image: "https://i.pravatar.cc/100?img=6",
      text: "The Eduocean experience was fantastic! The courses are well-organized, and I appreciated the flexible learning schedule. I now have a solid understanding of the subjects I studied and can apply them confidently."
    }
  ];

  return (
    <div className="min-w-screen min-h-screen bg-gray-50 dark:bg-[#141414] flex items-center justify-center py-5">
      <div className="w-full bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-700 px-5 py-16 md:py-24 text-gray-800 dark:text-gray-200">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600 dark:text-gray-100">What people <br/>are saying.</h1>
            <h3 className="text-xl mb-5 font-light text-gray-500 dark:text-gray-300">Our clients love what we do. From design to delivery, we’re proud to share some of the feedback that keeps us going.</h3>
            <div className="text-center mb-10">
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
              <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
              <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            </div>
          </div>
          {/* Flexbox Layout Update */}
          <div className="flex flex-wrap -mx-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-3 md:w-1/3 w-full mb-6">
                <div className="w-full mx-auto rounded-lg bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 p-5 text-gray-800 dark:text-gray-200 font-light">
                  <div className="w-full flex mb-4 items-center">
                    <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="flex-grow pl-3">
                      <h6 className="font-bold text-sm uppercase text-gray-600 dark:text-gray-300">{testimonial.name}</h6>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 dark:text-gray-600 mr-1">"</span>{testimonial.text}<span className="text-lg leading-none italic font-bold text-gray-400 dark:text-gray-600 ml-1">"</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
