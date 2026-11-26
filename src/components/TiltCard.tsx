import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Subtle 3D perspective tilt + passing golden light sheen on hover/touch.
 */
export function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card || !sheen) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const updateTilt = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const rotY = (px - 0.5) * maxTilt * 2;
      const rotX = (0.5 - py) * maxTilt * 2;

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      sheen.style.opacity = '1';
      sheen.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(251, 191, 36, 0.22), transparent 60%)`;
    };

    const resetTilt = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto',
      });
      sheen.style.opacity = '0';
    };

    const onMouseMove = (e: MouseEvent) => updateTilt(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) updateTilt(t.clientX, t.clientY);
    };

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', resetTilt, { passive: true });
    card.addEventListener('touchmove', onTouchMove, { passive: true });
    card.addEventListener('touchend', resetTilt, { passive: true });
    card.addEventListener('touchcancel', resetTilt, { passive: true });

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', resetTilt);
      card.removeEventListener('touchmove', onTouchMove);
      card.removeEventListener('touchend', resetTilt);
      card.removeEventListener('touchcancel', resetTilt);
      gsap.killTweensOf(card);
    };
  }, [maxTilt]);

  return (
    <div ref={cardRef} className={`relative ${className}`}>
      {children}
      <div
        ref={sheenRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}

