import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 120;
const STAR_COLOR = 'rgba(255,255,255,0.7)';
const STAR_SIZE = 1.2;
const STAR_SPEED = 0.15;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const stars = useRef<{x: number, y: number, z: number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth || 800;
    let height = canvas.offsetHeight || 600;
    canvas.width = width;
    canvas.height = height;

    // Initialize stars
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      z: randomBetween(0.2, 1)
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_SIZE * star.z, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.globalAlpha = star.z;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function animate() {
      for (const star of stars.current) {
        star.x += STAR_SPEED * star.z;
        if (star.x > width) {
          star.x = 0;
          star.y = randomBetween(0, height);
          star.z = randomBetween(0.2, 1);
        }
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.offsetWidth || 800;
      height = canvas.offsetHeight || 600;
      canvas.width = width;
      canvas.height = height;
      // Reinitialize stars to fill new area
      stars.current = Array.from({ length: STAR_COUNT }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        z: randomBetween(0.2, 1)
      }));
    }

    window.addEventListener('resize', handleResize);
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};

export default StarfieldBackground; 