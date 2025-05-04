import React from 'react'

const Slider = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning thet gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src="https://cdn.elearningindustry.com/wp-content/uploads/2024/12/A-Step-By-Step-Guide-To-Successfully-Implementing-A-Corporate-LMS.jpg"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
  )
}

export default Slider
