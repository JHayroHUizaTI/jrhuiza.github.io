interface WhatsAppButtonProps {
  phoneNumber?: string;
  mainText?: string;
  subtitle?: string;
  ariaLabel?: string;
}

export const WhatsAppButton = ({
  phoneNumber = '51923848525',
  mainText = 'Escríbeme',
  subtitle = 'te respondo en minutos',
  ariaLabel = 'Escríbeme por WhatsApp',
}: WhatsAppButtonProps) => {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="
        floating-cta floating-cta--whatsapp group fixed bottom-6 right-6 z-50
        inline-flex max-w-[calc(100vw-3rem)] items-center gap-3 rounded-full
        bg-[#25D366] px-5 py-3 text-white shadow-lg shadow-green-500/30
        outline-none transition-all duration-300 ease-out
        hover:scale-105 hover:bg-[#1EBE5D] hover:shadow-xl hover:shadow-green-500/40
        active:scale-[0.98]
        focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        motion-reduce:transition-none motion-reduce:hover:scale-100
      "
    >
      <span aria-hidden="true" className="floating-cta__badge">
        <span className="floating-cta__badge-dot" />
        online
      </span>
      <span
        aria-hidden="true"
        className="
          flex size-10 shrink-0 items-center justify-center rounded-full
          bg-white text-[#25D366] shadow-inner shadow-green-900/10
          transition-transform duration-300 ease-out group-hover:rotate-[-6deg] group-hover:scale-105
          motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100
        "
      >
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          className="size-6"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.582 0 11.94-5.359 11.944-11.945a11.86 11.86 0 0 0-3.417-8.4zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.437-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col justify-center">
        <span className="truncate text-sm font-bold leading-tight text-white sm:text-[15px]">
          {mainText}
        </span>
        <span className="truncate text-[11px] font-medium leading-tight text-white/80 sm:text-xs">
          {subtitle}
        </span>
      </span>
    </a>
  );
};
