import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  scale?: number;
  maxOffset?: number;
  className?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Subtle GSAP magnetic wrapper for desktop mouse & mobile touch:
 * gently pulls elements toward the cursor/finger with a tight cap
 * so buttons and links feel responsive without over-traveling.
 */
export function Magnetic({
  children,
  strength = 0.16,
  scale = 1.01,
  maxOffset = 7,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const effectiveStrength = strength * 0.35;
    const maxY = Math.round(maxOffset * 0.7);

    const pullToward = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const currentX = (gsap.getProperty(el, 'x') as number) || 0;
      const currentY = (gsap.getProperty(el, 'y') as number) || 0;

      const restingCenterX = rect.left - currentX + rect.width / 2;
      const restingCenterY = rect.top - currentY + rect.height / 2;

      const targetX = clamp((clientX - restingCenterX) * effectiveStrength, -maxOffset, maxOffset);
      const targetY = clamp((clientY - restingCenterY) * effectiveStrength, -maxY, maxY);

      gsap.to(el, {
        x: targetX,
        y: targetY,
        scale,
        duration: 0.3,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const springBack = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto',
      });
    };

    const handleMouseMove = (e: MouseEvent) => pullToward(e.clientX, e.clientY);
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) pullToward(touch.clientX, touch.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) pullToward(touch.clientX, touch.clientY);
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', springBack, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', springBack, { passive: true });
    el.addEventListener('touchcancel', springBack, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', springBack);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', springBack);
      el.removeEventListener('touchcancel', springBack);
      gsap.killTweensOf(el);
    };
  }, [strength, scale, maxOffset]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
