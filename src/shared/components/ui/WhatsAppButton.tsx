'use client';

import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  label?: string;
}

export const WhatsAppButton = ({
  phoneNumber = '51923848525',
  label = 'Contact us on WhatsApp',
}: WhatsAppButtonProps) => {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        group motion-button
        fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8
        flex h-14 w-14 items-center justify-center rounded-full
        bg-[#25D366] text-white shadow-lg shadow-black/40
        outline-none transition duration-300 ease-out
        hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40
        focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        motion-reduce:transition-none motion-reduce:hover:scale-100
      "
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="icon-anim-bounce h-7 w-7"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.944-11.945a11.86 11.86 0 0 0-3.417-8.4zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.437-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
      </svg>
    </a>
  );
};
