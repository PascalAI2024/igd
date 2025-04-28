import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    class Circuit {
      x: number;
      y: number;
      angle: number;
      length: number;
      progress: number;
      speed: number;
      width: number;
      color: string;
      children: Circuit[];
      maxChildren: number;
      splitChance: number;
      generation: number;
      maxGenerations: number;
      points: { x: number; y: number }[];
      nodeSize: number;
      decay: number;
      alpha: number;
      attraction: number;

      constructor(x: number, y: number, angle?: number, generation = 0) {
        this.x = x;
        this.y = y;
        this.angle = angle ?? Math.random() * Math.PI * 2;
        this.length = 100 + Math.random() * 100;
        this.progress = 0;
        this.speed = 2 + Math.random() * 2;
        this.width = 2 - (generation * 0.3);
        this.color = `rgba(255, ${Math.floor(Math.random() * 50)}, 0`;
        this.children = [];
        this.maxChildren = 3;
        this.splitChance = 0.03;
        this.generation = generation;
        this.maxGenerations = 3;
        this.points = [{ x, y }];
        this.nodeSize = 2 - (generation * 0.3);
        this.decay = 0.02;
        this.alpha = 1;
        this.attraction = 0.3;
      }

      update(mouseX: number, mouseY: number, isHovering: boolean) {
        if (this.alpha <= 0) return false;

        if (this.progress < 1) {
          this.progress += this.speed / this.length;
          const lastPoint = this.points[this.points.length - 1];

          // Add mouse attraction when hovering
          if (isHovering) {
            const dx = mouseX - lastPoint.x;
            const dy = mouseY - lastPoint.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (1 - dist / 200) * this.attraction;
              this.angle += Math.atan2(dy, dx) * force;
            }
          }

          const newX = lastPoint.x + Math.cos(this.angle) * this.speed;
          const newY = lastPoint.y + Math.sin(this.angle) * this.speed;
          this.points.push({ x: newX, y: newY });

          this.angle += (Math.random() - 0.5) * 0.2;

          if (this.generation < this.maxGenerations && 
              this.children.length < this.maxChildren && 
              Math.random() < this.splitChance) {
            const splitAngle = this.angle + (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4);
            this.children.push(new Circuit(newX, newY, splitAngle, this.generation + 1));
          }
        }

        this.children = this.children.filter(child => child.update(mouseX, mouseY, isHovering));
        this.alpha = Math.max(0, this.alpha - this.decay);

        return true;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.points.length > 1) {
          ctx.strokeStyle = `${this.color}, ${this.alpha})`;
          ctx.lineWidth = this.width;
          ctx.beginPath();
          ctx.moveTo(this.points[0].x, this.points[0].y);
          
          for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
          }
          ctx.stroke();

          // Draw nodes with glow effect
          this.points.forEach((point, index) => {
            if (index % 3 === 0) {
              ctx.fillStyle = `${this.color}, ${this.alpha})`;
              ctx.beginPath();
              ctx.arc(point.x, point.y, this.nodeSize, 0, Math.PI * 2);
              ctx.fill();

              // Glow effect
              const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, this.nodeSize * 4
              );
              gradient.addColorStop(0, `${this.color}, ${this.alpha * 0.5})`);
              gradient.addColorStop(1, `${this.color}, 0)`);
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(point.x, point.y, this.nodeSize * 4, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }

        this.children.forEach(child => child.draw(ctx));
      }
    }

    const circuits: Circuit[] = [];

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (circuits.length < 20 && Math.random() < 0.1) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        circuits.push(new Circuit(x, y));
      }

      for (let i = circuits.length - 1; i >= 0; i--) {
        if (!circuits[i].update(mousePos.current.x, mousePos.current.y, isHovering.current)) {
          circuits.splice(i, 1);
          continue;
        }
        circuits[i].draw(ctx);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-black cursor-none"
    />
  );
};

export default ParticleBackground;