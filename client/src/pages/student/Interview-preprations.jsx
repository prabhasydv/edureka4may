import React from 'react';

const Interview = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Banner Image */}
      <div
        className="bg-cover bg-center text-center overflow-hidden rounded-xl shadow-lg mb-10"
        style={{
          minHeight: '400px',
          backgroundImage: "url('https://www.unitasterdays.com/bespoke-pages/bpid161/img2020430275.jpg')"
        }}
        title="Interview Preparation Banner"
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold p-10">Interview Preparation</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Why Interview Preparation Matters</h2>
        <p className="text-base leading-7 text-gray-700 dark:text-gray-300 mb-6">
          Interview preparation is key to improving your chances of success. From getting comfortable in mock sessions to receiving expert feedback, preparation gives you a competitive edge in the real world.
        </p>

        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
          <li><strong>Practice:</strong> Build confidence and fluency through mock interviews.</li>
          <li><strong>Feedback:</strong> Get expert insight on areas for improvement.</li>
          <li><strong>Realistic Simulation:</strong> Mimic actual interviews and challenges.</li>
          <li><strong>Customized Training:</strong> Focus on specific weaknesses or skill sets.</li>
        </ul>

        <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
          Gain unlimited access to 3000+ real interview questions from top IT companies including FAANG, detailed algorithm solutions, and industry-standard tools.
        </p>

        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">What is a Technical Interview?</h3>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
          A technical interview assesses your real-world coding, problem-solving, and technical communication skills. It’s more about your logical approach than memorizing answers. With multiple rounds including coding and behavioral sessions, being well-prepared is crucial.
        </p>

        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">How to Prepare for a Technical Interview?</h3>
        <ul className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
          <li>Study the job description and relevant technologies.</li>
          <li>Showcase your problem-solving approach clearly.</li>
          <li>Don’t hesitate to ask clarifying questions during interviews.</li>
          <li>Practice with coding challenges and real-world project problems.</li>
        </ul>

        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Sample Interview Questions</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
          <li>Which programming languages do you use regularly?</li>
          <li>Can you describe a rewarding project and your contribution to it?</li>
          <li>How do you ensure accurate project estimations?</li>
          <li>Explain two-tier architecture and its use cases.</li>
        </ul>

        <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
          Our 45-60 minute mock interview sessions are led by engineers from top tech companies. You’ll receive a pre-interview plan, a detailed post-session evaluation, and optional resume feedback — all at a flat fee.
        </p>
      </div>

      {/* Gallery Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">Interview Prep in Action</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <img src="https://icdb.info/wp-content/uploads/2019/02/2.jpg" alt="Mock Interview" className="rounded-lg shadow-md" />
          <img src="https://professionalsearchgroup.com.au/wp-content/uploads/2021/06/How-to-prepare-for-a-job-interview.jpg" alt="Resume Review" className="rounded-lg shadow-md" />
          <img src="https://knowzieslearning.com/wp-content/uploads/2019/05/Conducting_Professional_Interviews.jpg" alt="Technical Interview Prep" className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default Interview;
