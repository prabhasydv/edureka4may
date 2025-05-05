import { useSubmitContactFormMutation, useSubmitInstructorApplicationMutation } from '@/features/api/authApi';
import React, { useState } from 'react';

const Becomeaninstructor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [submitContactForm, { isLoading, error, isSuccess }] = useSubmitInstructorApplicationMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(formData).unwrap();
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
  {/* Banner */}
  <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 text-white p-8 rounded-lg shadow-md mb-10 text-center">
    <h1 className="text-3xl font-bold mb-2">Become an Instructor</h1>
    <p className="text-lg">Share your expertise, inspire learners, and grow with us at TheEduOcean.</p>
  </div>

  {/* Content Sections */}
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Are you passionate about teaching?</h2>
    <p className="mb-2">Looking for an opportunity to share your knowledge, connect with professionals, and earn supplemental income while doing it? This is the right place for you.</p>
    <p className="mb-2">With TheEduOcean, we continuously strive to build a global network of top-notch trainers and industry experts to create high-quality courseware that resonates with professionals all over the world.</p>
    <p>Come join us on our journey!</p>
  </section>

  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">How does it benefit me?</h2>
    <p className="mb-2">The material you produce will be used to train professionals worldwide, giving you global visibility and a larger audience for your content.</p>
  </section>

  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">What does it take?</h2>
    <ul className="list-disc list-inside space-y-2">
      <li>A passion for teaching and knowledge-sharing</li>
      <li>Domain expertise with certifications</li>
      <li>Strong communication and presentation skills</li>
      <li>A commitment to deliver best-in-class training globally</li>
    </ul>
  </section>

  {/* Contact Form */}
  <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto mt-10">
    <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-center">Interested in Working with Us?</h2>
    <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
      Please fill out this form and a <span className="font-semibold">TheEduOcean</span> representative will get in touch with you.
    </p>

    <form onSubmit={handleSubmit} className="grid gap-6" aria-label="Instructor Application Form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Select Course</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
            className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select a Course --</option>
            <option value="AWS Certified DevOps Engineer – Professional DOP-C01">AWS Certified DevOps Engineer – Professional</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Big Data Engineering">Big Data Engineering</option>
            <option value="Deep Learning">Deep Learning</option>
            <option value="NLP with Python">NLP with Python</option>
            <option value="Cloud Computing">Cloud Computing</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows="5"
          className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 p-3 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg transition duration-200 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
        }`}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>

    {isSuccess && (
      <p className="text-green-600 dark:text-green-400 mt-6 text-center font-medium">Form submitted successfully!</p>
    )}
    {error && (
      <p className="text-red-600 mt-6 text-center font-medium">There was an error submitting the form.</p>
    )}
  </section>
</div>

  );
};

export default Becomeaninstructor;
