'use client';

import { SectionHeader } from './SectionHeader';
import { CodeContactForm } from './contact/CodeContactForm';
import { JsonPreviewPanel } from './contact/JsonPreviewPanel';
import { useLanguage } from '@/shared/i18n';

export const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20" id="contact">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          label="/contact"
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="motion-stagger grid grid-cols-1 gap-6 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          <JsonPreviewPanel />
          <CodeContactForm />
        </div>
      </div>
    </section>
  );
};
