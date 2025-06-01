"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'
import styles from './animations.module.css';
import emailjs from '@emailjs/browser';
import { FormEvent } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<Array<{ left: number; top: number }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null; message: string}>({
    type: null,
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
    // Initialize floating elements positions
    setFloatingElements(
      Array(10).fill(null).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100
      }))
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({
        x: (clientX / window.innerWidth - 0.5) * 20,
        y: (clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('uqsCm_Maqt80_Znbl');
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        time: new Date().toLocaleString()
      };

      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(
        'service_a6vxmvq',
        'template_hdig26j',
        templateParams,
        'uqsCm_Maqt80_Znbl'
      );

      console.log('Success:', result.text);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });
      form.reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/50 backdrop-blur-lg border-b border-gray-800/50 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Nikhil Goutham
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="#about" className="text-gray-300 hover:text-blue-400 transition-all duration-300">About</Link>
              <Link href="#projects" className="text-gray-300 hover:text-blue-400 transition-all duration-300">Experience</Link>
              <Link href="#skills" className="text-gray-300 hover:text-blue-400 transition-all duration-300">Skills</Link>
              <Link href="#contact" className="text-gray-300 hover:text-blue-400 transition-all duration-300">Contact</Link>
            </div>
          </div>

          {/* Mobile menu */}
          <div 
            className={`md:hidden transform transition-all duration-300 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            } pt-4`}
          >
            <div className="flex flex-col space-y-4">
              <Link 
                href="#about" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#projects" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </Link>
              <Link 
                href="#skills" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link 
                href="#contact" 
                className="text-gray-300 hover:text-blue-400 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
        {/* Mouse-following gradient */}
        <div 
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 100%)`,
            transition: 'background 0.3s ease',
          }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className={`absolute w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl ${styles['animate-blob']} mix-blend-multiply`}
               style={{ transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)` }}></div>
          <div className={`absolute right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl ${styles['animate-blob']} ${styles['animation-delay-2000']} mix-blend-multiply`}
               style={{ transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)` }}></div>
          <div className={`absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-3xl ${styles['animate-blob']} ${styles['animation-delay-4000']} mix-blend-multiply`}
               style={{ transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }}></div>
        </div>
        
        {/* Floating elements with mouse interaction */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {floatingElements.map((pos, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400/50 rounded-full ${styles['animate-float']}`}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
                animationDelay: `${i * 0.5}s`,
                transition: 'transform 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto relative z-10">
          <div 
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
              transition: 'transform 0.3s ease'
            }}
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text ${styles['animate-gradient']}`}>
              Hi, I&apos;m Nikhil Goutham
            </h1>
            <p className={`text-xl md:text-2xl text-gray-300 mb-8 ${styles['animate-fade-in']}`}>
              Data Scientist with expertise in Machine Learning, Deep Learning, and Data Engineering
            </p>
            <div className={`flex flex-col md:flex-row gap-4 justify-center ${styles['animate-fade-in-up']}`}>
              <Link 
                href="#projects"
                className="group px-8 py-3 text-gray-300 border border-transparent rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative inline-block transform transition-transform group-hover:translate-x-1">
                  View My Work
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
              <Link 
                href="#contact"
                className="group px-8 py-3 text-gray-300 border border-gray-500/50 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:scale-105"
              >
                <span className="relative inline-block transform transition-transform group-hover:translate-x-1">
                  Get in Touch
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
        <div className="container mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">About Me</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <p className="text-lg text-gray-300 leading-relaxed">
                Data Scientist with over 3 years of experience in building machine learning models, developing data pipelines, and extracting insights
                from complex datasets. Expertise in supervised and unsupervised learning, deep learning, and natural language processing.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Skilled in Python, SQL, and cloud-based data engineering solutions. Proven ability to design scalable AI models, optimize ETL workflows, and
                deploy data-driven solutions that enhance business decision-making.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 transform hover:scale-[1.02] transition-transform duration-500 mx-auto max-w-[400px]">
        <Image
                  src="/profile.jpg"
                  alt="Nikhil Goutham"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
          priority
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
        <div className="container mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Masters Degree */}
            <div className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-500/10 border border-white/10 h-full ${styles['interactive-card']}`}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Master of Science in Data Science</h3>
                  <p className="text-xl text-blue-400 mb-2">New Jersey Institute of Technology (NJIT)</p>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-gray-400">Graduated: December 2024</p>
                    <div className="flex items-center">
                      <span className="text-emerald-400 font-semibold">GPA: 3.95</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="space-y-2 text-gray-300">
                      <p>• Specialized in advanced analytics, machine learning, and data engineering</p>
                      <p>• Focused on developing scalable solutions for real-world data challenges</p>
                      <p>• Applied AI/ML techniques to solve complex business problems</p>
                    </div>
                    <div className="mt-6">
                      <p className="text-gray-300 font-medium mb-3">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Big Data</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Machine Learning</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Deep Learning</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Cloud Computing</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Data Visualization</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Data Mining</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">Statistics</span>
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">R</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bachelors Degree */}
            <div className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-500/10 border border-white/10 h-full ${styles['interactive-card']}`}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Technology in Mechanical Engineering</h3>
                  <p className="text-xl text-blue-400 mb-2">BML Munjal University, New Delhi, India</p>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-gray-400">August 2017 - August 2021</p>
                    <div className="flex items-center">
                      <span className="text-emerald-400 font-semibold">GPA: 3.5</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-gray-300">
                    <p>• Received academic scholarship for outstanding performance</p>
                    <p>• Sports Coordinator, Hero Challenge Fest (Jan-Feb 2018)</p>
                    <p>• Sports Representative Head, Banyan League (Jan-Feb 2019)</p>
                    <div className="mt-4 pl-6 text-sm text-gray-400 space-y-2">
                      <p>- Managed logistics for multiple teams, overseeing transportation, deliveries, inventory, and supply chain processes</p>
                      <p>- Collaborated with cross-functional stakeholders to optimize workflows and enhance team productivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Experience & Projects</h2>
          <div className="grid md:grid-cols-1 gap-8">
            {/* Verizon Capstone Project */}
            <div className="bg-[#1a1f35] rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition duration-300 border border-gray-800">
              <div className="h-48 bg-[#1a1f35] relative flex items-center justify-center p-8">
                <div className="relative w-[280px] h-[100px]">
                  <Image
                    src="/verizon-logo.png"
                    alt="Verizon Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Verizon Capstone Project</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Led the development of an advanced fault detection system using XGBoost models. Processed and analyzed large-scale JSON logs for pattern recognition, and created comprehensive Tableau dashboards for real-time operational monitoring. Implemented automated data pipelines for continuous model training and validation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 bg-blue-500/10 rounded-full text-sm text-blue-400">XGBoost</span>
                  <span className="px-4 py-1.5 bg-blue-500/10 rounded-full text-sm text-blue-400">Tableau</span>
                  <span className="px-4 py-1.5 bg-blue-500/10 rounded-full text-sm text-blue-400">Snowflake</span>
                  <span className="px-4 py-1.5 bg-blue-500/10 rounded-full text-sm text-blue-400">Python</span>
                  <span className="px-4 py-1.5 bg-blue-500/10 rounded-full text-sm text-blue-400">Machine Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-purple-900/10" />
        <div className="container mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className={`p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${styles['scale-on-hover']}`}>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Programming & ML</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Python</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>R</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>SQL</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>TensorFlow</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>PyTorch</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Scikit-Learn</span>
                </li>
              </ul>
            </div>

            <div className={`p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 ${styles['scale-on-hover']}`}>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Data Engineering</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Apache Airflow</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Snowflake</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Databricks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Apache Spark</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Hadoop</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>ETL Pipelines</span>
                </li>
              </ul>
            </div>

            <div className={`p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 ${styles['scale-on-hover']}`}>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Cloud & DevOps</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>AWS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Google Cloud</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Azure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Docker</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Kubernetes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>CI/CD Pipelines</span>
                </li>
              </ul>
            </div>

            <div className={`p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 ${styles['scale-on-hover']}`}>
              <h3 className="text-xl font-bold mb-4 text-indigo-400">Data Analysis</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Tableau</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Power BI</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>A/B Testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Statistical Analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Data Visualization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Time Series Analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Interested in collaborating or have a project in mind? I&apos;d love to hear from you.
              Let&apos;s create something amazing together.
            </p>
          </div>

          <div className={`bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-500/10 border border-white/10 ${styles['interactive-card']}`}>
            <form onSubmit={handleSubmit} className={`space-y-6 ${styles['interactive-card']}`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500 ${styles['glow-on-hover']}`}
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500 ${styles['glow-on-hover']}`}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500 ${styles['glow-on-hover']}`}
                  placeholder="What's this about?"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500 ${styles['glow-on-hover']}`}
                  placeholder="Your message here..."
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              {submitStatus.type && (
                <div className={`p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium 
                    hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 
                    ${styles['scale-on-hover']} ${styles['glow-on-hover']}
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16">
            <div className="flex items-center justify-center gap-8">
              <a
                href="mailto:bnikhilgoutham@gmail.com"
                className={`p-3 text-gray-300 hover:text-blue-400 transform transition-all duration-300 rounded-full hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 ${styles['bounce-on-hover']}`}
                title="Email me"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"/>
                </svg>
              </a>
              <a
                href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
                className={`p-3 text-gray-300 hover:text-blue-400 transform transition-all duration-300 rounded-full hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 ${styles['bounce-on-hover']}`}
                title="GitHub Profile"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
          </a>
          <a
                href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
                className={`p-3 text-gray-300 hover:text-blue-400 transform transition-all duration-300 rounded-full hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 ${styles['bounce-on-hover']}`}
                title="LinkedIn Profile"
          >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
          </a>
        <a
                href="https://www.kaggle.com/nikhilbudarayavalasa"
          target="_blank"
          rel="noopener noreferrer"
                className={`p-3 text-gray-300 hover:text-blue-400 transform transition-all duration-300 rounded-full hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 ${styles['bounce-on-hover']}`}
                title="Kaggle Profile"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.248.495-.248h3.239c.144 0 .236.083.275.248.034.129.009.236-.079.32l-6.555 6.344 6.836 8.507c.095.104.117.208.07.32"/>
                </svg>
        </a>
        <a
                href="https://medium.com/@nikhilgoutham.b"
          target="_blank"
          rel="noopener noreferrer"
                className={`p-3 text-gray-300 hover:text-blue-400 transform transition-all duration-300 rounded-full hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 ${styles['bounce-on-hover']}`}
                title="Medium Blog"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Nikhil Goutham</h3>
              <p className="text-gray-300">
                Data Scientist focused on building scalable AI solutions and data-driven insights.
              </p>
              <p className="text-gray-300 mt-4">
                <a href="mailto:bnikhilgoutham@gmail.com" className="hover:text-blue-400 transition">bnikhilgoutham@gmail.com</a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-gray-300 hover:text-blue-400 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-gray-300 hover:text-blue-400 transition">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-gray-300 hover:text-blue-400 transition">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-300 hover:text-blue-400 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="mailto:bnikhilgoutham@gmail.com"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"/>
                  </svg>
        </a>
        <a
                  href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Nikhil Goutham. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
