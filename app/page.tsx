'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { VideoPortfolioSection } from '@/components/video-portfolio-section';
import { WebsitePortfolioSection } from '@/components/website-portfolio-section';
import { AdsMarketingSection } from '@/components/ads-marketing-section';
import { GraphicDesignSection } from '@/components/graphic-design-section';
import { ContactFormSection } from '@/components/contact-form-section';
import { Footer } from '@/components/footer';

type Language = 'en' | 'fr' | 'ar';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(language === 'ar');
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideInDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <Navigation language={language} onLanguageChange={setLanguage} isArabic={isArabic} />
      <HeroSection language={language} isArabic={isArabic} />
      {/* <ServicesSection language={language} isArabic={isArabic} />
      <PortfolioSection language={language} isArabic={isArabic} /> */}
      <VideoPortfolioSection language={language} isArabic={isArabic} />
      <WebsitePortfolioSection language={language} isArabic={isArabic} />
      <AdsMarketingSection language={language} isArabic={isArabic} />
      <GraphicDesignSection language={language} isArabic={isArabic} />
      <ContactFormSection language={language} isArabic={isArabic} />
      <Footer language={language} isArabic={isArabic} />
    </main>
  );
}
