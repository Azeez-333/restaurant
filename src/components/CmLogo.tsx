interface CmLogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export function CmLogo({ size = 'sm', className = '' }: CmLogoProps) {
  const dimensions = size === 'lg' ? 'h-20 w-20 p-2' : 'h-9 w-9 p-1';

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-500/40 bg-[#1B1917] shadow-sm ${dimensions} ${className}`}
    >
      <img
        src="/images/cm-logo.png"
        alt="CM Restaurant logo"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
