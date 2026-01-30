'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type Language = 'en' | 'fr' | 'ar';

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isArabic: boolean;
}

const translations = {
  en: {
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About',
    contact: 'Contact',
    getStarted: 'Get Started',
  },
  fr: {
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'À propos',
    contact: 'Contact',
    getStarted: 'Commencer',
  },
  ar: {
    services: 'الخدمات',
    portfolio: 'المحفظة',
    about: 'حول',
    contact: 'اتصل',
    getStarted: 'ابدأ الآن',
  },
};

export function Navigation({ language, onLanguageChange, isArabic }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navItems = [
    { label: t.services, href: '#services' },
    { label: t.portfolio, href: '#portfolio' },
    { label: t.about, href: '#about' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <svg width="40" height="40" viewBox="0 0 418 418" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition">
              <path d="M165.818 269.709L196.374 239.153L196.112 238.891L134.854 177.633C123.06 165.839 123.06 146.648 134.854 134.854C142.283 127.426 152.646 124.68 162.247 126.61L195.023 93.8342C166.678 76.1866 128.922 79.6741 104.298 104.298C75.6097 132.987 75.6097 179.501 104.298 208.189L165.818 269.709Z" fill="#8C52FE"/>
              <path d="M269.709 251.375L239.153 220.819L177.633 282.339C165.839 294.133 146.649 294.133 134.854 282.339C127.426 274.91 124.681 264.547 126.61 254.946L93.8338 222.17C76.1866 250.515 79.674 288.271 104.298 312.895C132.987 341.583 179.501 341.583 208.189 312.895L269.709 251.375Z" fill="white"/>
              <path d="M251.375 147.484L220.819 178.041L282.339 239.56C294.133 251.354 294.132 270.545 282.339 282.339C274.91 289.768 264.547 292.513 254.946 290.583L222.169 323.359C250.515 341.007 288.27 337.519 312.895 312.895C341.583 284.206 341.583 237.693 312.895 209.004L251.375 147.484Z" fill="#8C52FE"/>
              <path d="M209.004 104.298L147.484 165.818L178.041 196.374L239.56 134.854C251.354 123.06 270.545 123.06 282.339 134.854C289.768 142.283 292.512 152.646 290.583 162.247L323.359 195.023C341.007 166.678 337.519 128.922 312.895 104.298C284.206 75.6097 237.693 75.6093 209.004 104.298Z" fill="white"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">Navigi</span>
              <span className="text-xs text-primary">Agency</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Side - Language & CTA */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-2 bg-secondary/30 rounded-lg p-1">
              {(['en', 'fr', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition ${
                    language === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-semibold transition duration-200 transform hover:scale-105">
              {t.getStarted}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-semibold transition">
              {t.getStarted}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
