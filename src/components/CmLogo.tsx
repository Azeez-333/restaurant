interface CmLogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export function CmLogo({ size = 'sm', className = '' }: CmLogoProps) {
  const dimensions = size === 'lg' ? 'h-14 w-14 text-2xl' : 'h-8 w-8 text-sm';

  return (
    <span
      className={`font-display inline-flex shrink-0 items-center justify-center rounded-full border border-amber-500/50 bg-[#141311] font-bold tracking-tight text-amber-300 shadow-sm ${dimensions} ${className}`}
      aria-hidden="true"
    >
      CM
    </span>
  );
}

