"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './page.module.css';
import emailjs from '@emailjs/browser';
import { FormEvent } from 'react';
import { type NextPage } from 'next';
import ProfileCard from '@/components/ProfileCard';
import Threads from '@/components/Threads';
import { motion } from 'framer-motion';
import { useScrollAnimation, scrollVariants, staggerContainer, fadeInUp, scaleIn } from '@/hooks/useScrollAnimation';

const Home: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null; message: string}>({
    type: null,
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null);

  const aboutAnimation = useScrollAnimation();
  const projectsAnimation = useScrollAnimation();
  const skillsAnimation = useScrollAnimation();
  const socialAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("uqsCm_Maqt80_Znbl");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
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
    <main className="flex min-h-screen flex-col items-center justify-between no-flash">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-6">
        {/* Content */}
        <div className="container mx-auto relative z-10">
          <div 
            className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
              Hi, I&apos;m Nikhil Goutham
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
              Data Scientist with expertise in Data Analysis, Machine Learning, Deep Learning and AI
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up">
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
      <section id="about" className="reveal relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20">
        <div className="absolute inset-0">
          <Threads />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-16">Who is this guy?</h2>
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
                <ProfileCard avatarUrl="/profile.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="reveal relative py-20 px-6 overflow-hidden">
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
      <section id="projects" className="reveal relative w-full min-h-screen flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-bold text-white mb-16">Experience & Projects</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="skills" className="reveal relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-bold text-white mb-16">Skills</h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105">
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

            <div className="p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105">
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

            <div className="p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:scale-105">
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

            <div className="p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:scale-105">
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
      <section id="resume" className="reveal py-20 px-6 relative overflow-hidden">
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
      <section id="contact" className="reveal relative w-full min-h-screen flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-bold text-white mb-16">Get in Touch</h2>
        <div className="max-w-3xl w-full px-4">
          <div className="text-center mb-16">
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

      {/* Social Section */}
      <section id="social" className="reveal relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-bold text-white mb-16">Find Me Here</h2>
        <ul className="m-0 p-0 flex flex-wrap justify-center gap-8">
          {/* LinkedIn */}
          <li className="reveal list-none" style={{ transitionDelay: '0.1s' }}>
            <a
              href="https://www.linkedin.com/in/nikhilgoutham"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[250px] h-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] text-left pl-5 
                       transition-all duration-500 rounded-xl border border-[rgba(255,255,255,0.1)]
                       hover:bg-[rgba(255,255,255,0.1)] hover:border-[#0077B5] hover:scale-105
                       hover:shadow-[0_0_30px_rgba(0,119,181,0.3)]"
            >
              <div className="flex items-center gap-4 h-full">
                <Image
                  src="/linkedin_cg.png"
                  alt="LinkedIn"
                  width={30}
                  height={30}
                  className="transition-all duration-500 filter invert opacity-50 group-hover:opacity-100 group-hover:invert-0"
                />
                <span className="text-[rgba(255,255,255,0.7)] tracking-[2px] text-lg font-light transition-colors duration-500 group-hover:text-[#0077B5]">
                  - LinkedIn
                </span>
              </div>
            </a>
          </li>

          {/* GitHub */}
          <li className="reveal list-none" style={{ transitionDelay: '0.2s' }}>
            <a
              href="https://github.com/nikhilgouthamb"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[250px] h-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] text-left pl-5 
                       transition-all duration-500 rounded-xl border border-[rgba(255,255,255,0.1)]
                       hover:bg-[rgba(255,255,255,0.1)] hover:border-white hover:scale-105
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <div className="flex items-center gap-4 h-full">
                <Image
                  src="/github_cg.png"
                  alt="GitHub"
                  width={30}
                  height={30}
                  className="transition-all duration-500 filter invert opacity-50 group-hover:opacity-100 group-hover:invert-0"
                />
                <span className="text-[rgba(255,255,255,0.7)] tracking-[2px] text-lg font-light transition-colors duration-500 group-hover:text-white">
                  - GitHub
                </span>
              </div>
            </a>
          </li>

          {/* Medium */}
          <li className="reveal list-none" style={{ transitionDelay: '0.3s' }}>
            <a
              href="https://medium.com/@nikhilgoutham.b"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[250px] h-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] text-left pl-5 
                       transition-all duration-500 rounded-xl border border-[rgba(255,255,255,0.1)]
                       hover:bg-[rgba(255,255,255,0.1)] hover:border-[#00ab6c] hover:scale-105
                       hover:shadow-[0_0_30px_rgba(0,171,108,0.3)]"
            >
              <div className="flex items-center gap-4 h-full">
                <Image
                  src="/medium_cg.png"
                  alt="Medium"
                  width={30}
                  height={30}
                  className="transition-all duration-500 filter invert opacity-50 group-hover:opacity-100 group-hover:invert-0"
                />
                <span className="text-[rgba(255,255,255,0.7)] tracking-[2px] text-lg font-light transition-colors duration-500 group-hover:text-[#00ab6c]">
                  - Medium
                </span>
              </div>
            </a>
          </li>

          {/* Kaggle */}
          <li className="reveal list-none" style={{ transitionDelay: '0.4s' }}>
            <a
              href="https://www.kaggle.com/nikhilbudarayavalasa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[250px] h-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] text-left pl-5 
                       transition-all duration-500 rounded-xl border border-[rgba(255,255,255,0.1)]
                       hover:bg-[rgba(255,255,255,0.1)] hover:border-[#20beff] hover:scale-105
                       hover:shadow-[0_0_30px_rgba(32,190,255,0.3)]"
            >
              <div className="flex items-center gap-4 h-full">
                <Image
                  src="/k.png"
                  alt="Kaggle"
                  width={30}
                  height={30}
                  className="transition-all duration-500 filter invert opacity-50 group-hover:opacity-100 group-hover:invert-0"
                />
                <span className="text-[rgba(255,255,255,0.7)] tracking-[2px] text-lg font-light transition-colors duration-500 group-hover:text-[#20beff]">
                  - Kaggle
                </span>
              </div>
            </a>
          </li>

          {/* Gmail */}
          <li className="reveal list-none" style={{ transitionDelay: '0.5s' }}>
            <a
              href="mailto:bnikhilgoutham@gmail.com"
              className="group relative block w-[250px] h-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] text-left pl-5 
                       transition-all duration-500 rounded-xl border border-[rgba(255,255,255,0.1)]
                       hover:bg-[rgba(255,255,255,0.1)] hover:border-[#ea4335] hover:scale-105
                       hover:shadow-[0_0_30px_rgba(234,67,53,0.3)]"
            >
              <div className="flex items-center gap-4 h-full">
                <Image
                  src="/gmail_cg.png"
                  alt="Gmail"
                  width={30}
                  height={30}
                  className="transition-all duration-500 filter invert opacity-50 group-hover:opacity-100 group-hover:invert-0"
                />
                <span className="text-[rgba(255,255,255,0.7)] tracking-[2px] text-lg font-light transition-colors duration-500 group-hover:text-[#ea4335]">
                  - Gmail
                </span>
              </div>
            </a>
          </li>

          {/* Streamlit */}
          <li className="reveal list-none" style={{ transitionDelay: '0.6s' }}>
            <a
              href="https://share.streamlit.io/user/nikhilgouthamb"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[250px] h-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] text-left pl-5 
                       transition-all duration-500 rounded-xl border border-[rgba(255,255,255,0.1)]
                       hover:bg-[rgba(255,255,255,0.1)] hover:border-[#ff4b4b] hover:scale-105
                       hover:shadow-[0_0_30px_rgba(255,75,75,0.3)]"
            >
              <div className="flex items-center gap-4 h-full">
                <Image
                  src="/s.png"
                  alt="Streamlit"
                  width={30}
                  height={30}
                  className="transition-all duration-500 filter invert opacity-50 group-hover:opacity-100 group-hover:invert-0"
                />
                <span className="text-[rgba(255,255,255,0.7)] tracking-[2px] text-lg font-light transition-colors duration-500 group-hover:text-[#ff4b4b]">
                  - Streamlit
                </span>
              </div>
            </a>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Nikhil Goutham</h3>
              <p className="text-gray-400 mb-4">
                Data Scientist focused on building scalable AI solutions and data-driven insights.
              </p>
              <p className="text-gray-400">bnikhilgoutham@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Experience</a></li>
                <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">© 2025 Nikhil Goutham. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
