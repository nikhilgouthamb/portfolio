   "use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './animations.module.css';
import emailjs from '@emailjs/browser';
import { FormEvent } from 'react';
import { type NextPage } from 'next';
import ProfileCard from '@/components/ProfileCard';
import ClimateCarousel from '@/components/ClimateCarousel';
import GlassIcons from '@/components/GlassIcons';
import '@/components/GlassIcons.css';
import MagicBento from '@/components/MagicBento';
import { useTheme } from '@/contexts/ThemeContext';
import { useTheme } from '@/contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      )}
    </button>
  );
}

const Home: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null; message: string}>({
    type: null,
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    emailjs.init("uqsCm_Maqt80_Znbl");
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center px-6 bg-[#fafafa]">
        <div className="bg-white rounded-xl p-8 max-w-sm mx-auto shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thanks for visiting my portfolio</h1>
          <p className="text-gray-600 mb-8">It&apos;s best experienced on desktop. For now, reach out below.</p>
          <button
            onClick={() => window.location.href = 'mailto:bnikhilgoutham@gmail.com'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-sm hover:bg-gray-800 transition-colors mb-6"
          >
            Contact Me
          </button>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/nikhilgoutham" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 p-3 hover:bg-gray-200 transition-colors" aria-label="LinkedIn">
              <Image src="/linkedin_cg.png" alt="LinkedIn" width={24} height={24} className="object-contain" />
            </a>
          </div>
        </div>
      </div>
    );
  }

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
    <>
      <main className="relative min-h-screen w-full bg-[#fafafa]">
        <div className="relative z-10">
      {/* Navigation - dotlogics style: clean light bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-16 gap-8">
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium uppercase tracking-wide" aria-label="Navigate to About section">
                About
                </a>
                <a href="#how-i-help" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium uppercase tracking-wide" aria-label="How I Help">
                How I Help
                </a>
                <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium uppercase tracking-wide" aria-label="Navigate to Work section">
                  Work
                </a>
                <a href="#skills" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium uppercase tracking-wide" aria-label="Navigate to Skills section">
                Skills
                </a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium uppercase tracking-wide" aria-label="Navigate to Contact section">
                Contact
                </a>
                <a href="#contact" className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-gray-800 transition-colors" aria-label="Get in touch">
                  Get in Touch
                </a>
          </div>
        </div>
      </nav>

      {/* Hero - dotlogics style: one headline + one CTA */}
      <section id="main-content" className="relative min-h-[85vh] flex items-center justify-center py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-sm uppercase tracking-widest text-gray-500 mb-4 ${styles['animate-fade-in']}`}>
            Data Scientist · ML & AI · Data Engineering
          </p>
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-6 ${styles['animate-fade-in']}`}>
            I Build Data & AI Systems That Drive Impact
          </h1>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto mb-10 ${styles['animate-fade-in']}`}>
            From machine learning models to data pipelines and analytics—I help turn complex data into clear, actionable outcomes.
          </p>
          <div className={styles['animate-fade-in-up']}>
            <Link
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-sm hover:bg-gray-800 transition-colors"
            >
              Get in Touch
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How I Help - dotlogics-style 3 service cards */}
      <section id="how-i-help" className="relative w-full bg-[#fafafa] py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">How I Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="#projects" className="group block bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data & Machine Learning</h3>
              <p className="text-gray-600 leading-relaxed">Designing and building ML models and analytics that turn data into decisions—from forecasting to classification and NLP.</p>
              <span className="inline-flex items-center mt-4 text-gray-900 font-medium text-sm group-hover:underline">View work →</span>
            </a>
            <a href="#projects" className="group block bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Engineering & Pipelines</h3>
              <p className="text-gray-600 leading-relaxed">Creating scalable data pipelines and ETL workflows so teams can rely on clean, timely data.</p>
              <span className="inline-flex items-center mt-4 text-gray-900 font-medium text-sm group-hover:underline">View work →</span>
            </a>
            <a href="#projects" className="group block bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI & Automation</h3>
              <p className="text-gray-600 leading-relaxed">Replacing repetitive processes with smart automation and AI-driven solutions for clearer, faster outcomes.</p>
              <span className="inline-flex items-center mt-4 text-gray-900 font-medium text-sm group-hover:underline">View work →</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section - dotlogics style: light, clean */}
      <section id="about" className="relative w-full bg-white flex flex-col items-center justify-center py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">About</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 md:order-1">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed">
                Data Scientist with over 3 years of experience in building machine learning models, developing data pipelines, and extracting insights
                from complex datasets. Expertise in supervised and unsupervised learning, deep learning, and natural language processing.
              </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed">
                Skilled in Python, SQL, and cloud-based data engineering solutions. Proven ability to design scalable AI models, optimize ETL workflows, and
                deploy data-driven solutions that enhance business decision-making.
              </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center p-4">
              <div className="w-full max-w-[340px]">
                <ProfileCard avatarUrl="/profile.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contents - simple jump links (dotlogics-style minimal) */}
      <section id="contents" className="relative w-full bg-[#fafafa] py-12 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">On this page</h2>
          <GlassIcons
            items={[
              {
                icon: (
                  // Graduation cap for Education
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#3B82F6"/><path d="M16 10l10 4-10 4-10-4 10-4zm0 8v4m-6-2a6 2 0 0012 0" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
                ),
                color: 'blue',
                label: 'Education',
                onClick: () => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Lightbulb for That One Excel Sheet
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#8B5CF6"/><path d="M16 10a6 6 0 016 6c0 2.5-1.5 4-3 5v2a1 1 0 01-2 0v-2c-1.5-1-3-2.5-3-5a6 6 0 016-6z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/><path d="M14 26h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                ),
                color: 'purple',
                label: 'That One Excel Sheet',
                onClick: () => document.getElementById('excel-story')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Briefcase for Experience & Projects
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#06B6D4"/><rect x="10" y="14" width="12" height="8" rx="2" stroke="#fff" strokeWidth="2"/><path d="M12 14V12a4 4 0 018 0v2" stroke="#fff" strokeWidth="2"/></svg>
                ),
                color: 'blue',
                label: 'Experience & Projects',
                onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Gear/settings for Skills & Technologies
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#F59E42"/><circle cx="16" cy="16" r="4" stroke="#fff" strokeWidth="2"/><path d="M16 8v2M16 22v2M8 16h2M22 16h2M10.93 10.93l1.42 1.42M19.65 19.65l1.42 1.42M10.93 21.07l1.42-1.42M19.65 12.35l1.42-1.42" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                ),
                color: 'orange',
                label: 'Skills & Technologies',
                onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Globe/leaf for Data Meets Climate
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#22D3EE"/><circle cx="16" cy="16" r="6" stroke="#fff" strokeWidth="2"/><path d="M16 10v12M10 16h12M13 13l6 6M13 19l6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                ),
                color: 'green',
                label: 'Data Meets Climate',
                onClick: () => document.getElementById('data-meets-climate')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Document for Resume
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#6366F1"/><rect x="12" y="10" width="8" height="12" rx="2" stroke="#fff" strokeWidth="2"/><path d="M12 14h8M12 18h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                ),
                color: 'indigo',
                label: 'Resume',
                onClick: () => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Mail for Contact
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#F43F5E"/><rect x="8" y="12" width="16" height="8" rx="2" stroke="#fff" strokeWidth="2"/><path d="M8 12l8 6 8-6" stroke="#fff" strokeWidth="2"/></svg>
                ),
                color: 'red',
                label: 'Contact',
                onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                icon: (
                  // Location/pin for Find Me Here
                  <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0EA5E9"/><path d="M16 10a6 6 0 016 6c0 3.314-2.686 6-6 6s-6-2.686-6-6a6 6 0 016-6zm0 2a4 4 0 100 8 4 4 0 000-8z" fill="#fff"/></svg>
                ),
                color: 'blue',
                label: 'Find Me Here',
                onClick: () => document.getElementById('social')?.scrollIntoView({ behavior: 'smooth' }),
              },
            ]}
            className="mb-4"
          />
        </div>
      </section>

      {/* Education Section - light */}
      <section id="education" className="relative w-full bg-white py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Masters Degree */}
            <div className="group bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Master of Science in Data Science</h3>
                  <p className="text-lg text-gray-600 mb-2">New Jersey Institute of Technology (NJIT)</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-gray-500 text-sm">Jan&apos;23 - Dec&apos;24</p>
                    <span className="text-emerald-600 font-semibold text-sm">GPA: 3.95</span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="space-y-2 text-gray-600">
                    <p className="flex items-center"><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3"></span>Specialized in advanced analytics, machine learning, and data engineering</p>
                    <p className="flex items-center"><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3"></span>Focused on developing scalable solutions for real-world data challenges</p>
                    <p className="flex items-center"><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3"></span>Applied AI/ML techniques to solve complex business problems</p>
                    </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-700 font-medium mb-4">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Big Data</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Machine Learning</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Deep Learning</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Cloud Computing</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Data Visualization</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Data Mining</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">Statistics</span>
                      <span className="px-3 py-1.5 bg-white rounded-lg text-gray-700 text-sm border border-gray-200">R</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bachelors Degree */}
            <div className="group bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bachelor of Technology in Mechanical Engineering</h3>
                    <p className="text-lg text-gray-600 mb-2">BML Munjal University, New Delhi, India</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-gray-500 text-sm whitespace-nowrap">Aug&apos;17-Aug&apos;21</p>
                    <span className="text-emerald-600 font-semibold text-sm">GPA: 3.5</span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center"><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3"></span>Received academic scholarship for outstanding performance</p>
                    <p className="flex items-center"><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3"></span>Sports Coordinator, Hero Challenge Fest (Jan-Feb 2018)</p>
                    <p className="flex items-center"><span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3"></span>Sports Representative Head, Banyan League (Jan-Feb 2019)</p>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-700 font-medium mb-4">Key Achievements:</p>
                    <div className="space-y-3 text-sm text-gray-600">
                      <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-1.5"></span>Managed logistics for multiple teams, overseeing transportation, deliveries, inventory, and supply chain processes</p>
                      <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-1.5"></span>Collaborated with cross-functional stakeholders to optimize workflows and enhance team productivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* That One Excel Sheet Section - light */}
      <section id="excel-story" className="relative w-full bg-[#fafafa] py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-1 text-left md:max-w-lg md:ml-8 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">That One Excel Sheet</h2>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>Now you might wonder, why the heck did I shift my career from mechanical to data?</p>
              <p>Ngl, that&apos;s what my parents wondered too.</p>
              <p>It all started with that one Excel sheet. That one regression equation.</p>
              <p>During my internships, I worked on projects involving smart manufacturing and energy optimization, where I eventually had to use data to improve efficiency. That&apos;s when it clicked, the wonders data could do.</p>
              <p>Like, if a simple regression problem on a freaking Excel sheet could impact the climate by reducing X% of energy consumption, I could only imagine what else I could do if I pursued this data path deeper.</p>
              <p>So I shifted my focus into data and climate tech, which led me to pursue my master&apos;s in data science.</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Image src="/m2d.png" alt="Mechanical to Data" width={700} height={700} className="max-w-2xl w-full rounded-xl shadow-lg object-contain border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Work / Projects - dotlogics "Recent Success Stories" style */}
      <section id="projects" className="relative w-full bg-white py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Work & Projects</h2>
            <p className="text-gray-600 text-center max-w-xl">Selected experience and case studies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Verizon Project Card - light dotlogics style */}
            <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer">
              <div className="aspect-video bg-gray-100 relative">
                <Image src="/verizon-v.png" alt="Verizon Logo" fill className="object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verizon Capstone Project</h3>
                <p className="text-gray-600 text-sm mb-4">Advanced fault detection system using ML. Processed 50GB+ logs with XGBoost; Tableau dashboards for real-time monitoring.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">XGBoost</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">Tableau</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">ML</span>
                </div>
                <span className="text-gray-900 font-medium text-sm group-hover:underline">Read more →</span>
              </div>
            </div>

            {/* Kansas City Crimes */}
            <Link href="https://github.com/nikhilgouthamb/Kansas-City-Crimes-Visualization-and-Analysis" target="_blank" rel="noopener noreferrer" className="block group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <div className="aspect-video bg-gray-100 relative">
                <Image src="/kansas-city-crime.jpg" alt="Kansas City Crime Analysis" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kansas City Crime Analysis</h3>
                <p className="text-gray-600 text-sm mb-4">Interactive Tableau dashboard for crime data 2016–2022: COVID impact, hotspots, demographics.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">Tableau</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">Data Analysis</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">Visualization</span>
                </div>
                <span className="text-gray-900 font-medium text-sm group-hover:underline">View project →</span>
              </div>
            </Link>

            {/* R Web Scraping */}
            <Link href="https://github.com/nikhilgouthamb/Web-scraping-using-R" target="_blank" rel="noopener noreferrer" className="block group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
              <div className="aspect-video bg-gray-100 relative">
                <Image src="/r-web-scraping.jpg" alt="R Web Scraping Project" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Web Scraping with R</h3>
                <p className="text-gray-600 text-sm mb-4">Automated extraction from Genome Biology articles: titles, authors, abstracts, full text.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">R</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-700">Web Scraping</span>
                </div>
                <span className="text-gray-900 font-medium text-sm group-hover:underline">View project →</span>
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

            {/* Game of Life: Wormhole Project Card */}
            <Link 
              href="https://github.com/nikhilgouthamb/game_of_life_wormhole"
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/90 to-black/90">
                <Image
                  src="/gl.png"
                  alt="Game of Life: Wormhole"
                  fill
                  className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Content Overlay */}
              <div className="relative h-full p-4 sm:p-8 flex flex-col justify-between">
                {/* Top Content */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3">Game of Life: Wormhole</h3>
                  <p className="text-gray-200 text-xs sm:text-sm">
                    Advanced cellular automata simulation with wormhole tunnels
                  </p>
                </div>

                {/* Bottom Content - Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-0">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white">Python</span>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white">Simulation</span>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white">Game of Life</span>
                </div>

                {/* Hover Description - Hidden by default */}
                <div className="absolute inset-0 bg-black/80 p-3 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-4">Game of Life: Wormhole</h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      An advanced simulation of Conway&apos;s Game of Life featuring &quot;wormhole&quot; tunnels that connect different parts of the grid, enabling unique cellular automata behaviors. Built in Python, with visualizations and edge case explorations.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-0">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white">Python</span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white">Cellular Automata</span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white">Visualization</span>
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white">Edge Cases</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Energy Optimization Project Card */}
            <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer">
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-blue-800/90">
                <Image
                  src="/eo.png"
                  alt="Energy Optimization"
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
                  <h3 className="text-2xl font-bold text-white mb-3">Energy Optimization for Pharma Labs</h3>
                  <p className="text-gray-200 text-sm">
                    Led energy optimization projects for pharmaceutical laboratories, reducing HVAC energy consumption by 15%-23% by analyzing complex datasets, identifying trends, and forecasting energy requirements.
                  </p>
                </div>
                {/* Bottom Content - Tags */}
              <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">ARIMA</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Ensemble Models</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Tableau</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Excel</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">Weather Prediction</span>
              </div>
                {/* Hover Description - Hidden by default */}
                <div className="absolute inset-0 bg-black/80 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Energy Optimization for Pharma Labs</h3>
                      <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-2">
                        <li>Increased energy demand forecasting accuracy by testing and deploying ARIMA and ensemble models for predictive analytics.</li>
                        <li>Improved data-driven decision-making by designing interactive Tableau dashboards, allowing executives to monitor key operational trends.</li>
                        <li>Streamlined financial operations by developing automated Excel tools for billing and client solutions.</li>
                        <li>Developed weather prediction models using machine learning and time series techniques, enhancing energy forecasting.</li>
                      </ul>
            </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">ARIMA</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Ensemble Models</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Tableau</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Excel</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Weather Prediction</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Skills Section - light */}
      <section id="skills" className="relative w-full bg-[#fafafa] py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Skills & Technologies</h2>
          <div className="flex justify-center">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="55, 65, 81"
            />
          </div>
        </div>
      </section>

      {/* Data Meets Climate - light */}
      <section id="data-meets-climate" className="relative w-full bg-white py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Data Meets Climate</h2>
          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-lg text-gray-600 text-center">
              I&apos;ve been trying to pivot into climate-focused work. I&apos;d love to explore if there might be any data-related roles or upcoming needs, happy to contribute in any capacity. I&apos;m eager to learn and would love to explore new domains.
            </p>
          </div>
          <div className="flex justify-center items-center w-full">
            <ClimateCarousel />
          </div>
        </div>
      </section>

      {/* Resume Section - light */}
      <section id="resume" className="py-20 px-6 relative bg-[#fafafa]" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Want to see my resume?</h2>
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="text-center space-y-6">
              <p className="text-xl text-gray-700">
                Plot twist: My resume is like a tech startup—<span className="italic">constantly iterating and shipping new features!</span>
              </p>
              <p className="text-gray-600">
                Drop me a line for the latest version—it might have changed while you were reading this! 😄
              </p>
              <Link href="#contact" className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-sm hover:bg-gray-800 transition-colors">
                Request Latest Build v{new Date().toISOString().split('T')[0]} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - light dotlogics style */}
      <section id="contact" className="relative w-full bg-white py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have a question or want to work together? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400" placeholder="Your name" required disabled={isSubmitting} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400" placeholder="your@email.com" required disabled={isSubmitting} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400" placeholder="Your message here..." required disabled={isSubmitting}></textarea>
              </div>
              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`} role="alert">
                  {submitStatus.message}
                </div>
              )}
              <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-sm hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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

      {/* Find Me Here - light */}
      <section id="social" className="relative w-full bg-[#fafafa] py-20" style={{ scrollMarginTop: '80px' }}>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Me Here</h2>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <GlassIcons
            items={[
              {
                icon: (
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <rect width="32" height="32" rx="7" fill="#0077B5"/>
                    <path d="M10.666 13.333h2.667v8H10.666v-8zm1.333-4a1.333 1.333 0 110 2.667 1.333 1.333 0 010-2.667zm3.334 4h2.56v1.093h.037c.356-.675 1.226-1.387 2.523-1.387 2.7 0 3.2 1.773 3.2 4.08v4.214h-2.667v-3.733c0-.89-.016-2.04-1.24-2.04-1.24 0-1.427.968-1.427 1.967v3.806h-2.666v-8z" fill="#fff"/>
                  </svg>
                ),
                color: 'blue',
                label: 'LinkedIn',
                customClass: '',
                onClick: () => window.open('https://www.linkedin.com/in/nikhilgoutham', '_blank'),
              },
              {
                icon: (
                  <Image src="/github_cg.png" alt="GitHub" width={36} height={36} style={{ objectFit: 'contain' }} />
                ),
                color: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
                label: 'GitHub',
                customClass: '',
                onClick: () => window.open('https://github.com/nikhilgouthamb', '_blank'),
              },
              {
                icon: (
                  <Image src="/m.png" alt="Medium" width={36} height={36} style={{ objectFit: 'contain' }} />
                ),
                color: 'linear-gradient(#fff, #b2ffb2)',
                label: 'Medium',
                customClass: '',
                onClick: () => window.open('https://medium.com/@nikhilgoutham.b', '_blank'),
              },
              {
                icon: (
                  <Image src="/k.png" alt="Kaggle" width={36} height={36} style={{ objectFit: 'contain' }} />
                ),
                color: 'blue',
                label: 'Kaggle',
                customClass: '',
                onClick: () => window.open('https://www.kaggle.com/nikhilbudarayavalasa', '_blank'),
              },
              {
                icon: (
                  <Image src="/gmail_cg.png" alt="Gmail" width={36} height={36} style={{ objectFit: 'contain' }} />
                ),
                color: 'linear-gradient(#fff, #ffeaea)',
                label: 'Gmail',
                customClass: '',
                onClick: () => window.open('mailto:bnikhilgoutham@gmail.com'),
              },
              {
                icon: (
                  <Image src="/s.png" alt="Streamlit" width={36} height={36} style={{ objectFit: 'contain' }} />
                ),
                color: 'linear-gradient(#fff, #ffe0e6)',
                label: 'Streamlit',
                customClass: '',
                onClick: () => window.open('https://share.streamlit.io/user/nikhilgouthamb', '_blank'),
              },
            ]}
          />
              </div>
      </section>

      {/* Future Goals & Interests - light */}
      <section id="goals" className="relative w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Future Goals & Interests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Climate Tech */}
            <div className="group bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Climate Tech</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Passionate about leveraging data science for climate action and sustainability. 
                Experienced in energy optimization projects that reduced consumption by 15-23%. 
                Seeking opportunities in climate tech and environmental data science.
              </p>
            </div>

            {/* AI/ML Advancement */}
            <div className="group bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI/ML Advancement</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Continuously exploring cutting-edge machine learning techniques, 
                deep learning architectures, and emerging AI technologies. 
                Focused on developing scalable, ethical AI solutions.
              </p>
            </div>

            {/* Data Engineering */}
            <div className="group bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z M8 4v4 M16 4v4 M4 11h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Data Engineering</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Building robust, scalable data pipelines and infrastructure. 
                Expertise in cloud platforms, real-time processing, and 
                data architecture design for enterprise solutions.
              </p>
            </div>

            {/* Healthcare Analytics */}
            <div className="group bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Healthcare Analytics</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Applying data science to healthcare challenges, from disease prediction 
                to patient outcome analysis. Committed to improving healthcare 
                through data-driven insights and predictive modeling.
              </p>
            </div>

            {/* Open Source */}
            <div className="group bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Open Source</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Contributing to the data science community through open source projects, 
                knowledge sharing, and mentorship. Building tools and libraries 
                that help others solve complex data challenges.
              </p>
              </div>

            {/* Mentorship */}
            <div className="group bg-gray-50 rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Mentorship</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Passionate about helping others grow in data science and technology. 
                Offering guidance, sharing knowledge, and supporting the next 
                generation of data professionals and researchers.
              </p>
          </div>
        </div>
        </div>
      </section>
        </div>
    </main>

    </>
  );
}

export default Home;
