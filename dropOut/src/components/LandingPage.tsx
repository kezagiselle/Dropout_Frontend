import landing from "../../src/img/landing.png";
import landing22 from "../../src/img/landing22.png";
import React from 'react';
import { FaGraduationCap, FaBrain, FaClipboardList, FaChartLine, FaComments, FaStar, FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="text-2xl text-black" />
            <span className="text-xl font-bold text-black">BrightWay.</span>
          </div>
          
                     <nav className="hidden md:flex items-center space-x-8">
             <a href="#home" className="text-black hover:text-gray-600 transition-colors font-bold">Home</a>
             <a href="#about" className="text-black hover:text-gray-600 transition-colors font-bold">About</a>
             <a href="#features" className="text-black hover:text-gray-600 transition-colors font-bold">Features</a>
             <a href="#contact" className="text-black hover:text-gray-600 transition-colors font-bold">Contact</a>
           </nav>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-black border border-black rounded-lg hover:bg-gray-50 transition-colors">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-orange-500 font-semibold">BrightWay</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Let's <span className="text-orange-500">Prevent DropOuts</span> and Secure Futures of our{' '}
                <span className="text-orange-500">Students</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform leverages data analytics and predictive technology to identify at-risk students early, enabling timely interventions and reducing dropout rates in schools.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of schools, teachers, and parents already using our system to make a difference in students' lives.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                 <button className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-semibold">
                   Get Started
                 </button>
                                 <button className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-medium">
                   Watch a Demo
                 </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <img 
                  src={landing} 
                  alt="BrightWay Platform Preview" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Platform */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            About Our Platform
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            BrightWay is a system education platform designed to identify students at risk of dropping out before it happens. By analyzing academic performance, attendance patterns, and engagement metrics, we provide schools with actionable insights and intervention strategies to support every student's educational journey.
          </p>
        </div>
      </section>

      {/* Why Choose BrightWay */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <img 
                  src={landing22} 
                  alt="Data Analytics and Insights" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Why Choose BrightWay ?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaBrain className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Early Risk Detection</h3>
                    <p className="text-gray-600">Identify at-risk students before problems escalate with our predictive analytics.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClipboardList className="text-orange-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Interventions</h3>
                    <p className="text-gray-600">Tailored support strategies based on individual student needs and challenges.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaComments className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Engagement</h3>
                    <p className="text-gray-600">Connect students, parents, teachers, and counselors in a supportive network.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Key Features
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform offers powerful tools to help educational institutions reduce dropout rates and improve student success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBrain className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Predictive Analytics</h3>
              <p className="text-gray-600 mb-4">AI-powered algorithms identify at-risk students based on multiple factors.</p>
              <div className="text-3xl font-bold text-blue-600 mb-1">93%</div>
              <div className="text-sm text-gray-500">Accuracy in early detection</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClipboardList className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Intervention Plans</h3>
              <p className="text-gray-600 mb-4">Customized action plans for teachers and counselors to support students.</p>
              <div className="text-3xl font-bold text-orange-600 mb-1">87%</div>
              <div className="text-sm text-gray-500">Intervention success rate</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 mb-4">Real-time dashboards to monitor student improvement and engagement.</p>
              <div className="text-3xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-500">Continuous monitoring</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaComments className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Communication Hub</h3>
              <p className="text-gray-600 mb-4">Integrated messaging system connecting all stakeholders in a student's success.</p>
              <div className="text-3xl font-bold text-orange-600 mb-1">65%</div>
              <div className="text-sm text-gray-500">Increased parent engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Success Stories
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how schools and districts have transformed their student retention with our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Michael Johnson</h4>
                  <p className="text-sm text-gray-600">Principal, Lincoln High School</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Since implementing BrightWay, we've seen a 42% reduction in our dropout rate. The early warning system has been a game-changer for our counseling team."
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-blue-500" />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-orange-600 font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Martinez</h4>
                  <p className="text-sm text-gray-600">District Administrator, Oakwood Schools</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The data insights have helped us allocate resources more effectively. We're now able to provide targeted support to students who need it most."
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-blue-500" />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-semibold">DC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">David Chen</h4>
                  <p className="text-sm text-gray-600">School Counselor, Westview Academy</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The intervention plans save me hours of work each week. I can focus on actually helping students rather than trying to identify who needs help."
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-blue-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Statistics Bar */}
       <section className="py-16 bg-blue-100">
         <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                         <div>
               <div className="text-4xl font-bold text-blue-800 mb-2">38%</div>
               <div className="text-blue-700 text-sm">Average Dropout Reduction</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-blue-800 mb-2">500+</div>
               <div className="text-blue-700 text-sm">Schools Using Our Platform</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-blue-800 mb-2">125K+</div>
               <div className="text-blue-700 text-sm">Students Supported</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-blue-800 mb-2">98%</div>
               <div className="text-blue-700 text-sm">Customer Satisfaction</div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Have questions about our platform? Our support team is ready to help you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaEnvelope className="text-blue-500 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get a response within 24 hours</p>
              <a href="mailto:support@dropout.com" className="text-blue-500 underline">
                support@dropout.com
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaPhone className="text-orange-500 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Available Mon-Fri, 9am-5pm EST</p>
              <div className="text-orange-500 font-semibold">+1 (800) 555-1234</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FaWhatsapp className="text-blue-500 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick responses for urgent inquiries</p>
              <div className="text-blue-500 font-semibold">+1 (800) 555-4321</div>
            </div>
          </div>
          
          {/* Demo Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Schedule a Demo</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="School/Institution"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
                                                           <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-semibold"
                >
                  Request Demo
                </button>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Reduce Dropout Rates?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join hundreds of schools already using our platform to improve student retention and success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                         <button className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold">
               Start Free Trial
             </button>
            <button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integration</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Data Processing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FERPA Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-gray-300">123 Education Ave Boston, MA 02115</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-gray-300">info@dropout.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-gray-400" />
                  <span className="text-gray-300">+1 (800) 555-1234</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
