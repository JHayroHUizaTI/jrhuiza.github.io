import React from 'react';

interface SectionHeaderProps {
  label: string;
  title?: string;
  subtitle?: string;
}

// Futuristic section heading with neon-green accents and a sci-fi divider.
export const SectionHeader = ({ label, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="section-header-shell mb-8 md:mb-10">
      {/* Left-aligned technical label plus the decorative HUD divider */}
      <div className="section-header-line">
        <span className="section-header-label">{label}</span>
        <span aria-hidden="true" className="section-header-divider"></span>
      </div>

      {/* Optional section title kept secondary to the label + line composition */}
      {title ? (
        <h3 className="mt-6 font-headline text-3xl md:text-4xl font-bold text-on-surface">
          {title}
        </h3>
      ) : null}
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm md:text-base text-neutral-500 leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};
