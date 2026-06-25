import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { WhatsAppButton } from '@/shared/components/ui/WhatsAppButton';
import { ChatWidget } from '@/modules/assistant';
import { LanguageProvider } from '@/shared/i18n';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'JR.HUIZA - TECH_PORTFOLIO',
  description: 'Focused on the automation and operation of hybrid infrastructures. I design, deploy, and manage highly available environments using Ansible, Terraform, and DevOps practices, ensuring scalability, security, and operational efficiency in production systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Without JS the scroll-reveal observer never runs — keep content visible. */}
        <noscript>
          <style>{`.reveal,.reveal .motion-stagger>*{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body text-on-surface selection:bg-primary-container selection:text-on-primary antialiased`}

      >
        <LanguageProvider>
          {children}
          <WhatsAppButton />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
