'use client';

import React, { useEffect, useState, useRef } from 'react';
import './hero-section.css';

type Language = 'en' | 'fr' | 'ar';

interface HeroSectionProps {
  language: Language;
  isArabic: boolean;
}

const translations = {
  en: {
    title1: 'Grow your business with our ',
    title2: 'unique services',
    tagline: '+ Design, websites, ads & branding',
    cta: 'Start Now',

    videoMotion: 'Video & Motion',
    webDev: 'Website Development',
    branding: 'Brand Identity',
    sponsor: 'Sponsored Ads',
    graphicDesign: 'Graphic Design',
  },
  fr: {
    title1: 'Développez votre projet avec nos ',
    title2: 'services uniques',
    tagline: '+ Design, sites web, publicité & branding',
    cta: 'Commencer',

    videoMotion: 'Vidéo & Motion',
    webDev: 'Création de sites web',
    branding: 'Identité visuelle',
    sponsor: 'Publicités sponsorisées',
    graphicDesign: 'Design graphique',
  },

  ar: {
    title1: 'طوّر مشروعك بخدماتنا',
    title2: ' المميّزة',
    tagline: '+ تصميم، مواقع، إعلانات، وهوية بصرية',
    cta: 'ابدأ الآن',

    videoMotion: 'فيديو وموشن',
    webDev: 'تصميم مواقع',
    branding: 'هوية بصرية',
    sponsor: 'إشهار ممول',
    graphicDesign: 'تصميم جرافيك',
  },

};

export function HeroSection({ language, isArabic }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const t = translations[language];

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className={`hero ${isArabic ? 'rtl' : 'ltr'}`}
      id="home"
    >
      {/* Animated Background Orbs */}
      <div className="hero__orbs">
        <div
          className="hero__orb hero__orb--1"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="hero__orb hero__orb--2"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div
          className="hero__orb hero__orb--3"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -15}px)`,
          }}
        />
      </div>

      {/* Grid Background Pattern */}
      <div className="hero__grid-bg"></div>

      {/* Mobile Grid Background - pattern-grid.svg */}
      <div className="hero__mobile-grid-bg"></div>

      {/* Gradient Overlay */}
      <div className="hero__gradient"></div>

      {/* Particle Effect */}
      <div className="hero__particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="hero__particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating UI Elements */}
      <div className="hero__floating-elements">
        {/* Cursor Arrows */}
        <div className={`hero__cursor hero__cursor--1 ${isVisible ? 'animate' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </div>
        <div className={`hero__cursor hero__cursor--2 ${isVisible ? 'animate' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
        </div>

        {/* Tech Icons */}
        <div className={`hero__tech-icon hero__tech-icon--1 ${isVisible ? 'animate' : ''}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
          </svg>
        </div>
        <div className={`hero__tech-icon hero__tech-icon--2 ${isVisible ? 'animate' : ''}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        </div>

        {/* Code Symbols */}
        <div className={`hero__code-symbol hero__code-symbol--1 ${isVisible ? 'animate' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className={`hero__code-symbol hero__code-symbol--2 ${isVisible ? 'animate' : ''}`}>
          <span>{'{}'}</span>
        </div>

        {/* UI Lines */}
        <div className="hero__ui-line hero__ui-line--1"></div>
        <div className="hero__ui-line hero__ui-line--2"></div>
        <div className="hero__ui-line hero__ui-line--3"></div>
      </div>

      <div className="hero__container">
        {/* Main Hero Content */}
        <div className="hero__main">
          {/* Mobile Top Tags - Video Motion & Website Dev */}
          <div className="hero__mobile-tags hero__mobile-tags--top">
            <div className={`hero__floating-tag hero__floating-tag--mobile ${isVisible ? 'animate' : ''}`}>
              <span>{t.videoMotion}</span>
            </div>
            <div className={`hero__floating-tag hero__floating-tag--mobile ${isVisible ? 'animate' : ''}`}>
              <span>{t.webDev}</span>
            </div>
          </div>

          {/* Mobile Navigi Logo */}
          <div className="hero__mobile-logo">
            <img src="/logo-icon.svg" alt="Navigi" className="hero__mobile-logo-img" />
          </div>



          {/* Desktop Floating Glassmorphism Tags */}
          <div className={`hero__floating-tag hero__floating-tag--1 ${isVisible ? 'animate' : ''}`}>
            <div className="hero__tag-icon">🎬</div>
            <span>{t.videoMotion}</span>
          </div>

          <div className={`hero__floating-tag hero__floating-tag--2 ${isVisible ? 'animate' : ''}`}>
            <div className="hero__tag-icon">💻</div>
            <span>{t.webDev}</span>
          </div>

          <div className={`hero__floating-tag hero__floating-tag--3 ${isVisible ? 'animate' : ''}`}>
            <div className="hero__tag-icon">✨</div>
            <span>{t.branding}</span>
          </div>

          <div className={`hero__floating-tag hero__floating-tag--4 ${isVisible ? 'animate' : ''}`}>
            <div className="hero__tag-icon">📢</div>
            <span>{t.sponsor}</span>
          </div>

          <div className={`hero__floating-tag hero__floating-tag--5 ${isVisible ? 'animate' : ''}`}>
            <div className="hero__tag-icon">🎨</div>
            <span>{t.graphicDesign}</span>
          </div>

          {/* Laptop Mockup */}
          <div className={`hero__laptop ${isVisible ? 'animate' : ''}`}>
            {/* Laptop Glow Effect */}
            <div className="hero__laptop-glow"></div>

            <div className="hero__laptop-screen">
              {/* Screen Reflection */}
              <div className="hero__screen-reflection"></div>

              {/* Notch */}
              <div className="hero__laptop-notch">
                <div className="hero__laptop-camera"></div>
              </div>

              <div className="hero__laptop-content">
                {/* Tagline */}
                <p className="hero__tagline">{t.tagline}</p>

                {/* Main Title */}
                <h1 className="hero__title">
                  {language === 'ar' ? (
                    <>
                      <span className="hero__title-line hero__title-line--1">{t.title1}</span>
                      <span className="hero__title-line hero__title-line--2">
                        <span className="hero__title-highlight">{t.title2}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="hero__title-line hero__title-line--1">
                        {t.title1.split('').map((char, i) => (
                          <span
                            key={i}
                            className="hero__char"
                            style={{ animationDelay: `${0.5 + i * 0.03}s` }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                      <span className="hero__title-line hero__title-line--2">
                        <span className="hero__title-highlight">
                          {t.title2.split('').map((char, i) => (
                            <span
                              key={i}
                              className="hero__char hero__char--highlight"
                              style={{ animationDelay: `${0.8 + i * 0.03}s` }}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          ))}
                        </span>
                      </span>
                    </>
                  )}
                </h1>

                {/* CTA Button */}
                <a href="#contact" className={`hero__cta ${isVisible ? 'animate' : ''}`}>
                  {t.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero__laptop-base">
              <div className="hero__laptop-hinge"></div>
              <div className="hero__laptop-keyboard">
                <div className="hero__keyboard-keys"></div>
              </div>
              <div className="hero__laptop-trackpad"></div>
            </div>
            <div className="hero__laptop-shadow"></div>
          </div>

          {/* Mobile Bottom Tags - Sponsor & Branding */}
          <div className="hero__mobile-tags hero__mobile-tags--bottom">
            <div className={`hero__floating-tag hero__floating-tag--mobile ${isVisible ? 'animate' : ''}`}>
              <span>{t.sponsor}</span>
            </div>
            <div className={`hero__floating-tag hero__floating-tag--mobile ${isVisible ? 'animate' : ''}`}>
              <span>{t.branding}</span>
            </div>
          </div>


          {/* Scroll Indicator */}
          <div className={`hero__scroll-indicator ${isVisible ? 'animate' : ''}`}>
            <div className="hero__scroll-mouse">
              <div className="hero__scroll-wheel"></div>
            </div>
            <div className="hero__scroll-arrows">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
