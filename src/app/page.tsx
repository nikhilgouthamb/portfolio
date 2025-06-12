"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './animations.module.css';
import emailjs from '@emailjs/browser';
import { FormEvent } from 'react';
import { type NextPage } from 'next';
import ProfileCard from '@/components/ProfileCard';
import Threads from '@/components/Threads';
import Script from 'next/script';

const Home: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null; message: string}>({
    type: null,
    message: ''
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsVisible(true);
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
    <div>
      <main className="relative min-h-screen w-full bg-[#0a0a0a]">
        {/* Background Animation */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="particles-animation absolute inset-0">
            <canvas id="particles-canvas" className="w-full h-full"></canvas>
          </div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center py-20">
            <ProfileCard avatarUrl="/profile.jpg" />
          </section>

          {/* Find Me Here Section */}
          <section id="social" className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Find Me Here</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <ul className="m-0 p-0 flex flex-wrap justify-center gap-8">
              {/* LinkedIn */}
              <li className="list-none">
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
              <li className="list-none">
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
              <li className="list-none">
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
              <li className="list-none">
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
              <li className="list-none">
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
              <li className="list-none">
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
          <footer className="w-full py-8">
            <div className="container mx-auto px-4">
              <div className="mt-12 pt-8 border-t border-gray-800">
                <p className="text-center text-gray-400">© 2025 Nikhil Goutham. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>

      <Script id="particles-animation">{`
        function initParticles() {
          const canvas = document.getElementById('particles-canvas');
          const ctx = canvas.getContext('2d');
          let width = canvas.width = window.innerWidth;
          let height = canvas.height = window.innerHeight;
          
          const particles = [];
          const properties = {
            bgColor: 'rgba(10, 10, 10, 1)',
            particleCount: 50,
            particleColor: 'rgba(255, 255, 255, 0.5)',
            minSize: 1,
            maxSize: 3,
            minSpeed: 0.05,
            maxSpeed: 0.2
          };

          window.onresize = function() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
          };

          class Particle {
            constructor() {
              this.reset();
            }

            reset() {
              this.x = Math.random() * width;
              this.y = Math.random() * height;
              this.size = Math.random() * (properties.maxSize - properties.minSize) + properties.minSize;
              this.speedX = (Math.random() * (properties.maxSpeed - properties.minSpeed) + properties.minSpeed) * (Math.random() < 0.5 ? -1 : 1);
              this.speedY = (Math.random() * (properties.maxSpeed - properties.minSpeed) + properties.minSpeed) * (Math.random() < 0.5 ? -1 : 1);
              this.opacity = Math.random() * 0.5 + 0.2;
              this.fadeDirection = Math.random() < 0.5 ? -1 : 1;
            }

            update() {
              // Update position
              this.x += this.speedX;
              this.y += this.speedY;

              // Update opacity
              this.opacity += 0.005 * this.fadeDirection;
              
              if (this.opacity > 0.7) this.fadeDirection = -1;
              if (this.opacity < 0.2) this.fadeDirection = 1;

              // Check bounds
              if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
              }
            }

            draw() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fillStyle = \`rgba(255, 255, 255, \${this.opacity})\`;
              ctx.fill();
            }
          }

          function createParticles() {
            for (let i = 0; i < properties.particleCount; i++) {
              particles.push(new Particle());
            }
          }

          function animate() {
            ctx.fillStyle = properties.bgColor;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(particle => {
              particle.update();
              particle.draw();
            });

            requestAnimationFrame(animate);
          }

          createParticles();
          animate();
        }

        // Initialize the animation when the component mounts
        if (typeof window !== 'undefined') {
          if (document.readyState === 'complete') {
            initParticles();
          } else {
            window.addEventListener('load', initParticles);
          }
        }
      `}</Script>
    </div>
  );
}

export default Home;
