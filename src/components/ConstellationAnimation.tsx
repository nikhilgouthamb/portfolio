'use client';

import { useEffect } from 'react';

export default function ConstellationAnimation() {
  useEffect(() => {
    const canvas = document.getElementById('constellation-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      life: number;
      position: () => void;
      reDraw: () => void;
      reCalculateLife: () => void;
    }> = [];
    
    const properties = {
      bgColor: 'rgba(10, 10, 10, 1)',
      particleColor: 'rgba(255, 255, 255, 0.1)',
      particleRadius: 3,
      particleCount: 60,
      particleMaxVelocity: 0.5,
      lineLength: 150,
      particleLife: 6
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      life: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }

      position() {
        if ((this.x + this.velocityX > width && this.velocityX > 0) || (this.x + this.velocityX < 0 && this.velocityX < 0)) {
          this.velocityX *= -1;
        }
        if ((this.y + this.velocityY > height && this.velocityY > 0) || (this.y + this.velocityY < 0 && this.velocityY < 0)) {
          this.velocityY *= -1;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      reDraw() {
        context.beginPath();
        context.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = properties.particleColor;
        context.fill();
      }

      reCalculateLife() {
        if (this.life < 1) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
          this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
          this.life = Math.random() * properties.particleLife * 60;
        }
        this.life--;
      }
    }

    function reDrawBackground() {
      context.fillStyle = properties.bgColor;
      context.fillRect(0, 0, width, height);
    }

    function drawLines() {
      let x1: number, y1: number, x2: number, y2: number, length: number, opacity: number;
      for (const i in particles) {
        for (const j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            if (length < properties.lineLength) {
              opacity = 1 - length / properties.lineLength;
              context.lineWidth = 0.5;
              context.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
              context.beginPath();
              context.moveTo(x1, y1);
              context.lineTo(x2, y2);
              context.closePath();
              context.stroke();
            }
        }
      }
    }

    function reDrawParticles() {
      for (const i in particles) {
        particles[i].reCalculateLife();
        particles[i].position();
        particles[i].reDraw();
      }
    }

    let animationFrameId: number;
    function loop() {
      reDrawBackground();
      reDrawParticles();
      drawLines();
      animationFrameId = requestAnimationFrame(loop);
    }

    function init() {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }

    init();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas id="constellation-canvas" className="fixed inset-0 pointer-events-none" aria-hidden="true" />;
}

