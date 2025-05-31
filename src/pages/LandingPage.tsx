import { useNavigate } from 'react-router-dom';
import React from 'react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the splash screen
    navigate('/splash');
  };

  const handleDownloadApp = () => {
    // Handle download app logic (e.g., link to app store)
    console.log('Download App clicked');
    // Replace with actual download link or logic
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="logo flex items-center">
            {/* Replace with actual logo path and styling */}
            <img src="/viva-logo.png" alt="Viva Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold text-gray-800">Viva</span>
          </div>
          <nav className="landing-nav hidden md:flex space-x-6">
            <a href="#hero" className="nav-link text-gray-600 hover:text-purple-700 transition-colors duration-200 font-medium">Home</a>
            <a href="#about" className="nav-link text-gray-600 hover:text-purple-700 transition-colors duration-200 font-medium">About</a>
            <a href="#subjects" className="nav-link text-gray-600 hover:text-purple-700 transition-colors duration-200 font-medium">Subjects</a>
            <a href="#features" className="nav-link text-gray-600 hover:text-purple-700 transition-colors duration-200 font-medium">App Features</a>
            <a href="#contact" className="nav-link text-gray-600 hover:text-purple-700 transition-colors duration-200 font-medium">Contact</a>
          </nav>
          <div className="auth-buttons space-x-4 flex items-center">
            {/* Add your button styling classes */}
            <button className="hidden md:inline-block px-6 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm font-medium" onClick={handleDownloadApp}>Download App</button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-medium" onClick={handleGetStarted}>Get Started</button>
          </div>
           {/* Mobile menu button - Implement actual mobile menu functionality */}
           <button className="md:hidden text-gray-600 hover:text-purple-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
           </button>
           {/* Mobile menu dropdown - Implement actual mobile menu functionality */}
           {/* Add state and logic to toggle this menu */}
           {/* <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
                <a href="#hero" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a>
                <a href="#about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</a>
                <a href="#subjects" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Subjects</a>
                <a href="#features" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">App Features</a>
                <a href="#contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</a>
            </div> */}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section py-24 md:py-32 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center min-h-screen-minus-header relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between z-10">
          <div className="hero-content md:w-1/2 md:pr-8 text-center md:text-left mb-12 md:mb-0">
            <span className="tag bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-wide">Now Available in South Africa</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">Learn Smarter with <span className="text-purple-700">Viva</span></h1>
            <p className="text-lg text-gray-600 mt-4 max-w-md mx-auto md:mx-0">
              Interactive tutoring for Grades 8-12. Get personalized help with
              Mathematics, Physical Science, Life Sciences & more. Starting from
              only R500 per month.
            </p>
            <div className="hero-buttons mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center md:justify-start items-center">
              {/* Add your button styling classes */}
              <button className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center text-lg shadow-lg" onClick={handleGetStarted}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                 </svg>
                 Start Learning Today
              </button>
              <button className="w-full md:w-auto px-8 py-3 border border-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-lg shadow-lg" onClick={handleDownloadApp}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download App
              </button>
            </div>
          </div>
          <div className="hero-image md:w-1/2 mt-12 md:mt-0 flex justify-center z-10">
            {/* Replace with actual image path and styling */}
            <img 
              src="/public/assests/viva.PNG" 
              alt="Hero" 
              className="rounded-lg  w-[400px] h-[400px] object-contain" 
            />
          </div>
           {/* Abstract shapes/background elements if any based on image */}
           {/* Example: <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-20 z-0"></div> */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around text-center">
          <div className="stat-item w-1/2 md:w-auto mb-8 md:mb-0 px-4">
            <h3 className="text-4xl font-bold text-gray-800">5000+</h3>
            <p className="text-gray-600">Active Learners</p>
          </div>
          <div className="stat-item w-1/2 md:w-auto mb-8 md:mb-0 px-4">
            <h3 className="text-4xl font-bold text-gray-800">95%</h3>
            <p className="text-gray-600">Pass Rate</p>
          </div>
          <div className="stat-item w-1/2 md:w-auto px-4">
            <h3 className="text-4xl font-bold text-gray-800">200+</h3>
            <p className="text-gray-600">Qualified Tutors</p>
          </div>
          <div className="stat-item w-1/2 md:w-auto px-4">
            <h3 className="text-4xl font-bold text-gray-800">4.9★</h3>
            <p className="text-gray-600">App Rating</p>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="subjects-section py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Master Every Subject</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Comprehensive tutoring across all major Grade 8-12 subjects with qualified South African educators.</p>
          <div className="subjects-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mt-12">
            {/* Subject Items (Repeat for each subject) */}
            <div className="subject-item bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center text-center border border-gray-200">
              {/* Replace with actual icon path and styling */}
              <img src="/public/assests/integration.png" alt="Mathematics Icon" className="mx-auto h-12 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Mathematics</h4>
              <p className="text-gray-600 mt-2 text-sm">Interactive lessons & practice</p>
            </div>
             <div className="subject-item bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center text-center border border-gray-200">
              {/* Replace with actual icon path and styling */}
              <img src="/public/assests/physics.png" alt="Physical Science Icon" className="mx-auto h-12 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Physical Science</h4>
              <p className="text-gray-600 mt-2 text-sm">Interactive lessons & practice</p>
            </div>
            <div className="subject-item bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center text-center border border-gray-200">
              {/* Replace with actual icon path and styling */}
              <img src="/public/assests/genetic-engineering.png" alt="Life Sciences Icon" className="mx-auto h-12 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Life Sciences</h4>
              <p className="text-gray-600 mt-2 text-sm">Interactive lessons & practice</p>
            </div>
             <div className="subject-item bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center text-center border border-gray-200">
              {/* Replace with actual icon path and styling */}
              <img src="/public/assests/maths.png" alt="Mathematical Literacy Icon" className="mx-auto h-12 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Mathematical Literacy</h4>
              <p className="text-gray-600 mt-2 text-sm">Interactive lessons & practice</p>
            </div>
             <div className="subject-item bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out flex flex-col items-center text-center border border-gray-200">
              {/* Replace with actual icon path and styling */}
              <img src="/public/assests/school.png" alt="Learner's License Icon" className="mx-auto h-12 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800">Learner's License</h4>
              <p className="text-gray-600 mt-2 text-sm">Interactive lessons & practice</p>
            </div>
            {/* ... other subjects */}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Affordable Learning Packages</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Quality education that doesn't break the bank</p>
          <div className="pricing-plans grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Basic Plan */}
            <div className="price-plan basic bg-white p-8 rounded-lg shadow flex flex-col items-center text-center border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">Basic</h3>
              <div className="price text-4xl font-bold text-purple-700 mt-4">R500<span className="text-xl font-normal text-gray-600">/month</span></div>
              <ul className="text-gray-600 text-left mt-6 space-y-2 flex-grow w-full">
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>1 Subject per month</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>3 Sessions per week</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Mobile app access</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Progress tracking</span></li>
              </ul>
              {/* Add your button styling classes */}
              <button className="w-full px-8 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 mt-8 shadow-lg" onClick={handleGetStarted}>Get Started</button>
            </div>
            {/* Standard Plan (Most Popular) */}
            <div className="price-plan standard most-popular bg-purple-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center relative border-2 border-orange-500 transform scale-105">
               <span className="popular-tag absolute -top-3 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
              <h3 className="text-2xl font-bold">Standard</h3>
              <div className="price text-4xl font-bold mt-4">R850<span className="text-xl font-normal text-purple-200">/month</span></div>
               <ul className="text-purple-100 text-left mt-6 space-y-2 flex-grow w-full">
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>2 Subjects per month</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>3 Sessions per week</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Priority tutor access</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Detailed progress reports</span></li>
              </ul>
              {/* Add your button styling classes */}
              <button className="w-full px-8 py-3 bg-white text-purple-700 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200 mt-8 shadow-lg" onClick={handleGetStarted}>Get Started</button>
            </div>
            {/* Premium Plan */}
            <div className="price-plan premium bg-white p-8 rounded-lg shadow flex flex-col items-center text-center border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800">Premium</h3>
              <div className="price text-4xl font-bold text-purple-700 mt-4">R1200<span className="text-xl font-normal text-gray-600">/month</span></div>
               <ul className="text-gray-600 text-left mt-6 space-y-2 flex-grow w-full">
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>3+ Subjects per month</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>5 Sessions per week</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>1-on-1 tutor sessions</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Exam preparation</span></li>
              </ul>
              {/* Add your button styling classes */}
              <button className="w-full px-8 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 mt-8 shadow-lg" onClick={handleGetStarted}>Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Viva Section */}
      <section id="about" className="why-choose-viva-section py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
           <div className="why-choose-content md:w-1/2 md:pr-8 text-center md:text-left mb-12 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Viva?</h2>
              <ul className="text-gray-600 text-left mt-6 space-y-2 max-w-md mx-auto md:mx-0">
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Interactive mobile app learning</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Qualified South African tutors</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Affordable monthly packages</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>3 tutoring sessions per week</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Grade 8-12 curriculum aligned</span></li>
                <li className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> <span>Progress tracking & reports</span></li>
              </ul>
               {/* Add your button styling classes */}
               <button className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 mt-8 shadow-lg" onClick={handleDownloadApp}>Try Our App Today</button>
           </div>
            <div className="why-choose-image md:w-1/2 mt-12 md:mt-0 flex justify-center">
              {/* Replace with actual image path and styling */}
              <img 
                src="/public/assests/viva-tutor.PNG" 
                alt="Why Choose Viva" 
                className="rounded-lg  w-[400px] h-[450px] object-contain" 
              />
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Learners Say</h2>
          <p className="text-gray-600 mt-4">Real success stories from real students</p>
          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Testimonial Item (Repeat for each testimonial) */}
            <div className="testimonial-item bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
              <div className="rating text-yellow-500 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic flex-grow">"Viva helped me improve my Mathematics from 45% to 78% in just 3 months!"</p>
              <div className="author font-semibold text-gray-800 mt-4">- Thabo M.</div>
              <div className="grade text-gray-600 text-sm">Grade 11</div>
            </div>
            <div className="testimonial-item bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
              <div className="rating text-yellow-500 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic flex-grow">"The interactive app made Physical Science so much easier to understand."</p>
              <div className="author font-semibold text-gray-800 mt-4">- Sarah K.</div>
              <div className="grade text-gray-600 text-sm">Grade 12</div>
            </div>
             <div className="testimonial-item bg-gray-50 p-6 rounded-lg shadow flex flex-col items-center text-center">
              <div className="rating text-yellow-500 text-xl mb-4">★★★★★</div>
              <p className="text-gray-600 italic flex-grow">"Great value for money and my daughter loves the tutors!"</p>
              <div className="author font-semibold text-gray-800 mt-4">- Parent - Mrs. Nkomo</div>
              <div className="grade text-gray-600 text-sm">Mother of Grade 10 learner</div>
            </div>
            {/* ... other testimonials */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-16 bg-purple-700 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Learning?</h2>
          <p className="text-purple-200 mt-4 max-w-2xl mx-auto">Join thousands of South African learners who have improved their grades with Viva. Start your journey today!</p>
          <div className="cta-buttons mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center">
             {/* Add your button styling classes */}
             <button className="w-full md:w-auto px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-purple-700 transition-colors duration-200 flex items-center justify-center shadow-lg" onClick={handleDownloadApp}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Free App
             </button>
             <button className="w-full md:w-auto px-8 py-3 bg-purple-900 text-white font-semibold rounded-md hover:bg-purple-800 transition-colors duration-200 shadow-lg" onClick={handleGetStarted}>Start Free Trial</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="footer-logo-col col-span-1 md:col-span-2">
             {/* Replace with actual logo path and styling */}
             <img src="/viva-logo.png" alt="Viva Logo" className="h-8 mb-4" />
            <span className="text-xl font-bold text-white">Viva</span>
             <p className="mt-4 text-sm">Empowering South African learners with interactive tutoring and personalized learning experiences. From Grade 8 to 12, we make learning engaging and effective.</p>
             <div className="social-icons mt-6 space-x-4 flex">
                {/* Add social media icons - Replace with actual icons/ SVGs */}
                <a href="#" className="text-gray-300 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.746v1.254h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-1.573c0-1.783 1.152-2.427 2.47-.206l1.53 1.493v-2.28z"/></svg></a>
                <a href="#" className="text-gray-300 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.188 4.382-3.43 7.975-7.815 7.975-1.406 0-2.73-.411-3.863-1.188.1.01.201.016.304.016 1.849 0 3.563-.622 4.935-1.671-1.729-.034-3.17-.597-3.68-1.39-.201.035-.406.052-.612.052-.398 0-.78-.066-1.145-.193.515.64 1.274 1.104 2.15 1.291-.746-.529-1.312-1.634-1.312-2.88 0-.635.214-1.228.546-1.726-.642.02-.12-.005-.182-.019 2.01-.97 4.474-2.451 5.756-3.313.2-.064.407-.118.617-.162-.204.129-.4.254-.59.38-.459.303-.92.596-1.38.89-.167.107-.322.202-.465.287.806-.198 1.636-.323 2.486-.355z"/></svg></a>
                <a href="#" className="text-gray-300 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm7 6.891h-2v-3.617c0-.801-.02-1.827-1.114-1.827-1.116 0-1.284.879-1.284 1.773v3.671h-2v-6h1.94c.28-.645.877-1.114 1.933-1.114 2.066 0 2.317 1.37 2.317 4.2v2.8z"/></svg></a>
             </div>
          </div>
           <div className="quick-links">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul>
                <li className="mb-2"><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li className="mb-2"><a href="#subjects" className="hover:text-white transition-colors duration-200">Subjects</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white transition-colors duration-200">Mobile App</a></li>
                <li className="mb-2"><a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
           </div>
            <div className="contact-info">
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
               <p className="flex items-center mb-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg> <span className="truncate">hello@viva.co.za</span></p>
               <p className="flex items-center mb-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.67 18 3 13.33 3 7V5z"/></svg> <span className="truncate">+27 (0) 11 123 4567</span></p>
               <p className="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> <span className="">Cape Town, South Africa</span></p>
            </div>
             <div className="made-with flex justify-start md:justify-end items-end mt-8 md:mt-0 col-span-1 md:col-span-1">
             </div>
            </div>
        <div className="copyright text-center text-gray-500 mt-8 text-sm">
          © 2025 Viva Tutoring. All rights reserved. Empowering learners across South Africa.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 