import React from 'react';

const AboutUs = () => {
  return (
    <section className="min-h-screen  darK:bg-slate-900 py-8 w-full flex justify-center p-5 h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">About Us</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-btn-main mb-4">Our Mission</h2>
          <p className="dark:text-white">
            At TopNerve, our mission is to empower learners by providing an extensive collection of practice questions and tools that enable them to achieve their full potential. We are committed to helping users enhance their knowledge and skills through consistent practice and detailed feedback.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-btn-main mb-4">What We Offer</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-btn-main">Unlimited Practice</h3>
              <p className="dark:text-white">
                Practice as much as you want with our vast collection of questions across various subjects and difficulty levels. Our platform ensures that you have ample opportunities to test your knowledge and improve your skills.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-btn-main">Detailed Analysis</h3>
              <p className="dark:text-white">
                Get in-depth analysis of your performance to understand your strengths and areas for improvement. Our detailed reports help you track your progress and focus on the topics that need more attention.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-btn-main">Performance Tracking</h3>
              <p className="dark:text-white">
                Monitor your performance over time with our comprehensive tracking tools. See your improvement trends and set goals to stay motivated on your learning journey.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-btn-main">Handcrafted Tests</h3>
              <p className="dark:text-white">
                Take tests that are carefully crafted by our experts to simulate real exam conditions. Our handcrafted tests are designed to challenge you and help you prepare effectively for your exams.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-btn-main">And Much More</h3>
              <p className="dark:text-white">
                Explore a range of additional features designed to enhance your learning experience, including personalized recommendations, interactive quizzes, and more.
              </p>
            </div>
          </div>
        </section>
        
      </div>
    </section>
  );
}

export default AboutUs;
