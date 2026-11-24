import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  scale?: number;
  className?: string;
}

/**
 * Consistent GSAP magnetic wrapper: tracks cursor relative to the element's
 * resting center (compensating for current x/y offset) so fast re-entries
 * never glitch or lose responsiveness.
 */
export function Magnetic({
  children,
  strength = 0.34,
  scale = 1.02,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const currentX = (gsap.getProperty(el, 'x') as number) || 0;
      const currentY = (gsap.getProperty(el, 'y') as number) || 0;

      const restingCenterX = rect.left - currentX + rect.width / 2;
      const restingCenterY = rect.top - currentY + rect.height / 2;

      const targetX = (e.clientX - restingCenterX) * strength;
      const targetY = (e.clientY - restingCenterY) * strength;

      gsap.to(el, {
        x: targetX,
        y: targetY,
        scale,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, scale]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
