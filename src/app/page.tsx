"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './animations.module.css';
import emailjs from '@emailjs/browser';
import { FormEvent } from 'react';
import ProfileCard from "@/components/ProfileCard";
import Threads from "@/components/Threads";

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
  const formRef = useRef<HTMLFormElement>(null);

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
    // Initialize EmailJS with your public key
    emailjs.init("uqsCm_Maqt80_Znbl");
  }, []);

  // Email template HTML:
  /*
  <!DOCTYPE html>
  <html>
  <head>
      <title>Portfolio Contact Form</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9fafb;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              overflow: hidden;
          }
          .header {
              background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
              color: white;
              padding: 20px;
              text-align: center;
          }
          .content {
              padding: 20px;
          }
          .field {
              margin-bottom: 15px;
          }
          .label {
              font-weight: bold;
              color: #374151;
          }
          .value {
              margin-top: 5px;
              color: #1f2937;
          }
          .footer {
              background-color: #f3f4f6;
              padding: 15px;
              text-align: center;
              font-size: 14px;
              color: #6b7280;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h2 style="margin: 0;">New Portfolio Contact Message</h2>
          </div>
          <div class="content">
              <div class="field">
                  <div class="label">From:</div>
                  <div class="value">{{from_name}} ({{from_email}})</div>
              </div>
              <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">{{message}}</div>
              </div>
              <div class="field">
                  <div class="label">Sent at:</div>
                  <div class="value">{{time_sent}}</div>
              </div>
          </div>
          <div class="footer">
              This message was sent from your portfolio website contact form.
          </div>
      </div>
  </body>
  </html>
  */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      
      if (!name || !email || !message) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all fields'
        });
        return;
      }

      const templateParams = {
        user_name: name.trim(),
        user_email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
        to_name: "Nikhil Goutham",
        reply_to: email.trim()
      };

      console.log('Attempting to send email with params:', templateParams);

      await emailjs.send(
        'service_a6vxmvq',
        'template_hdig26j',
        templateParams,
        'uqsCm_Maqt80_Znbl'
      ).then(
        function(response) {
          console.log("SUCCESS!", response);
          setSubmitStatus({
            type: 'success',
            message: 'Thank you! Your message has been sent successfully.'
          });
          // Clear form fields manually
          if (form) {
            const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
            const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
            const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
            
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (messageInput) messageInput.value = '';
          }
        },
        function(error) {
          console.log("FAILED...", error);
          throw error;
        }
      );
    } catch (error) {
      console.error('Error in form submission:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Threads Background */}
      <div className="fixed inset-0 z-0">
        <Threads
          color={[0.4, 0.6, 0.8]}
          amplitude={0.8}
          distance={0.1}
          enableMouseInteraction={true}
        />
      </div>

      {/* Rest of your content with higher z-index */}
      <div className="relative z-10">
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
                <Link href="#resume" className="text-gray-300 hover:text-blue-400 transition-all duration-300">Resume</Link>
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
                  href="#resume" 
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resume
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
                Data Scientist with expertise in Data Analysis, Machine Learning, Deep Learning and AI
              </p>
              <div className={`flex flex-col md:flex-row gap-4 justify-center ${styles['animate-fade-in-up']}`}>
                <Link 
                  href="#projects"
                  className="group px-8 py-3 text-gray-300 border border-transparent rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 no-underline"
                >
                  <span className="relative inline-block transform transition-transform group-hover:translate-x-1">
                    View My Work
                  </span>
                </Link>
                <Link 
                  href="#contact"
                  className="group px-8 py-3 text-gray-300 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 bg-transparent no-underline"
                >
                  <span className="relative inline-block transform transition-transform group-hover:translate-x-1">
                    Get in Touch
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
              <div className="order-1 md:order-2 flex justify-center items-center p-4">
                <div className="w-full max-w-[380px]">
                  <ProfileCard
                    avatarUrl="/profile.jpg"
                    enableTilt={true}
                    className="w-full"
                  />
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Verizon Project Card */}
              <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-800/90">
                  <Image
                    src="/verizon-v.png"
                    alt="Verizon Logo"
                    fill
                    className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                    priority
                    quality={100}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Verizon Capstone Project</h3>
                    <p className="text-gray-200 text-sm">
                      Advanced fault detection system using ML
                    </p>
                  </div>

                  {/* Bottom Content - Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">XGBoost</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Tableau</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">ML</span>
                  </div>

                  {/* Hover Description - Hidden by default */}
                  <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Verizon Capstone Project</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Led the development of an advanced fault detection system using XGBoost models. 
                          Processed and analyzed large-scale JSON logs for pattern recognition, and created 
                          comprehensive Tableau dashboards for real-time operational monitoring. Leveraged NJIT&apos;s 
                          Wulver High Performance Computing system for efficient processing of 50GB+ dataset, 
                          utilizing multiple nodes and GPU acceleration for enhanced computational performance.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">XGBoost</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Tableau</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Snowflake</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Python</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">ML</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kansas City Crimes Project Card */}
              <Link 
                href="https://github.com/nikhilgouthamb/Kansas-City-Crimes-Visualization-and-Analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90">
                  <Image
                    src="/kansas-city-crime.jpg"
                    alt="Kansas City Crime Analysis"
                    fill
                    className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                    priority
                    quality={100}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Kansas City Crime Analysis</h3>
                    <p className="text-gray-200 text-sm">
                      Interactive crime data visualization and analysis
                    </p>
                  </div>

                  {/* Bottom Content - Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Tableau</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Data Analysis</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Visualization</span>
                  </div>

                  {/* Hover Description - Hidden by default */}
                  <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Kansas City Crime Analysis</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Developed an interactive Tableau dashboard analyzing crime data from 2016-2022. 
                          Features include COVID-19 impact analysis, crime hotspot identification, and 
                          demographic trend analysis. Created comprehensive visualizations for law enforcement 
                          and city planning insights.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Tableau</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Data Analysis</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Visualization</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">GIS</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Statistics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* R Web Scraping Project Card */}
              <Link 
                href="https://github.com/nikhilgouthamb/Web-scraping-using-R"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/90 to-purple-600/90">
                  <Image
                    src="/r-web-scraping.jpg"
                    alt="R Web Scraping Project"
                    fill
                    className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                    priority
                    quality={100}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Web Scraping with R</h3>
                    <p className="text-gray-200 text-sm">
                      Automated data extraction from Genome Biology articles
                    </p>
                  </div>

                  {/* Bottom Content - Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">R</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Web Scraping</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Data Analysis</span>
                  </div>

                  {/* Hover Description - Hidden by default */}
                  <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Web Scraping with R</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Developed an automated web scraping solution using R to extract and analyze articles 
                          from Genome Biology. The tool collects comprehensive data including titles, authors, 
                          affiliations, publication dates, abstracts, and full text content, enabling efficient 
                          scientific literature analysis.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">R Programming</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">rvest</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">dplyr</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Data Mining</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Web Scraping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* USA House Price Prediction Project Card */}
              <Link 
                href="https://github.com/nikhilgouthamb/USA-House-Price-Prediction"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-emerald-800/90">
                  <Image
                    src="/house.jpg"
                    alt="USA House Price Prediction"
                    fill
                    className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                    priority
                    quality={100}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">USA House Price Prediction</h3>
                    <p className="text-gray-200 text-sm">
                      ML-powered real estate price prediction system
                    </p>
                  </div>

                  {/* Bottom Content - Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Machine Learning</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Python</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Regression</span>
                  </div>

                  {/* Hover Description - Hidden by default */}
                  <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">USA House Price Prediction</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Developed a comprehensive machine learning solution using multiple regression models 
                          (Random Forest, Gradient Boosting, Ridge CV, ElasticNet CV) to predict U.S. house prices. 
                          Analyzed key variables including bedrooms, bathrooms, size, and location to extract patterns 
                          for accurate price predictions in real estate applications.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Random Forest</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Gradient Boosting</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Ridge CV</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">ElasticNet CV</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Feature Engineering</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Parkinson's Disease Prediction Project Card */}
              <Link 
                href="https://github.com/nikhilgouthamb/Parkinson-s-Disease-Progression-Prediction"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-indigo-800/90">
                  <Image
                    src="/Parkinsons_disease.jpg"
                    alt="Parkinson's Disease Progression Prediction"
                    fill
                    className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                    priority
                    quality={100}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Parkinson&apos;s Disease Prediction</h3>
                    <p className="text-gray-200 text-sm">
                      Time series forecasting for disease progression
                    </p>
                  </div>

                  {/* Bottom Content - Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Time Series</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">ARIMA</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Healthcare</span>
                  </div>

                  {/* Hover Description - Hidden by default */}
                  <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Parkinson&apos;s Disease Prediction</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Developed a predictive model for Parkinson&apos;s disease progression using time series 
                          forecasting with ARIMA models. Analyzed peptide abundance, protein expression, and clinical 
                          data to predict UPDRS scores. Implemented comprehensive data preprocessing and feature 
                          engineering for enhanced prediction accuracy.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Time Series Analysis</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">ARIMA Models</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Data Preprocessing</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Feature Engineering</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Healthcare Analytics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Library Database Project Card */}
              <Link 
                href="https://github.com/nikhilgouthamb/Library-Database-and-User-Interface-Implementation"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/90 to-orange-800/90">
                  <Image
                    src="/library.jpg"
                    alt="Library Database Management System"
                    fill
                    className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
                    priority
                    quality={100}
                  />
                </div>
                
                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top Content */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Library Management System</h3>
                    <p className="text-gray-200 text-sm">
                      Full-stack library database system with GUI
                    </p>
                  </div>

                  {/* Bottom Content - Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Python</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">SQLite</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Tkinter</span>
                  </div>

                  {/* Hover Description - Hidden by default */}
                  <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">Library Management System</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Developed a comprehensive library management system with a user-friendly GUI using Python and Tkinter. 
                          Features include document checkout/return, fine computation, reader management, and advanced search capabilities. 
                          Implemented robust database operations using SQLite for efficient data management and retrieval.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Python</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">SQLite</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Tkinter</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">GUI Development</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Database Design</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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

        {/* Resume Section */}
        <section id="resume" className="py-20 px-6 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Want to see my resume?
              </h2>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-800/50 transform hover:scale-105 transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="text-xl text-gray-300">
                    Plot twist: My resume is like a tech startup - 
                    <span className="italic"> constantly iterating and shipping new features! </span>
                  </div>
                  <p className="text-gray-400">
                    Between you and me, I&apos;m learning faster than my printer can keep up with! 
                    Drop me a line for the latest version - it might have changed while you were reading this! 😄
                  </p>
                  <Link 
                    href="#contact"
                    className="inline-block px-8 py-3 text-gray-300 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Request Latest Build v{new Date().toISOString().split('T')[0]} 🎮
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute w-64 h-64 -left-32 top-0 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute w-64 h-64 -right-32 bottom-0 bg-purple-500/20 rounded-full blur-3xl"></div>
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
                Have a question or want to work together? I&apos;d love to hear from you.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-blue-500/10 border border-white/10">
              <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500"
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-100 placeholder-gray-500"
                    placeholder="Your message here..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {submitStatus.type && (
                  <div 
                    className={`p-4 rounded-xl ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                    role="alert"
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                      rounded-xl text-white font-medium 
                      hover:from-blue-600 hover:to-purple-600 
                      transform transition-all duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 
                      focus:ring-offset-2 focus:ring-offset-gray-900
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                    `}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
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
                    href="https://linkedin.com/in/nikhilgoutham"
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
                  <a
                    href="https://github.com/nikhilgouthamb"
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
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.kaggle.com/nikhilgouthamb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    <svg 
                      className="w-6 h-6" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.248.495-.248h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                    </svg>
                  </a>
                  <a
                    href="https://nikhilgoutham.streamlit.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    <svg 
                      className="w-6 h-6" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M16.5 6.08c-1.78-.97-3.09-1.46-4.96-1.46-2.23 0-2.93.97-2.93 2.43 0 1.78.97 2.43 4.05 3.4 3.89 1.13 5.35 2.27 5.35 5.02 0 2.75-2.27 4.53-5.83 4.53-2.27 0-4.21-.81-5.67-1.94l1.13-2.27c1.46.97 2.92 1.46 4.53 1.46 2.43 0 3.24-.97 3.24-2.43 0-1.78-.81-2.43-3.89-3.4-3.89-1.13-5.51-2.27-5.51-5.02 0-2.75 2.27-4.53 5.51-4.53 2.27 0 3.89.65 5.35 1.62L16.5 6.08z"/>
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
      </div>
    </main>
  );
}
