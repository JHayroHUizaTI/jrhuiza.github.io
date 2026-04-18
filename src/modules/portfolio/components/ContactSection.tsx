import { SectionHeader } from './SectionHeader';
import { CodeContactForm } from './contact/CodeContactForm';
import { JsonPreviewPanel } from './contact/JsonPreviewPanel';

export const ContactSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20" id="contact">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          label="/contact"
          title="Open to build the next interface"
          subtitle="A contact block reimagined as a code editor: editable fields, validation and a real email delivery flow."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          <JsonPreviewPanel />
          <CodeContactForm />
        </div>
      </div>
    </section>
  );
};
