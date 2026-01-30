'use client';

import React from 'react';

type Language = 'en' | 'fr' | 'ar';

interface FooterProps {
  language: Language;
  isArabic: boolean;
}

const translations = {
  en: {
    tagline: 'Transform Your Ideas Into Digital Reality',
    quickLinks: 'Quick Links',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'About Us',
    contact: 'Contact',
    followUs: 'Follow Us',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    rights: 'All rights reserved.',
    designedBy: 'Crafted with creativity by Navigi Agency',
  },
  fr: {
    tagline: 'Transformez Vos Idées En Réalité Numérique',
    quickLinks: 'Liens Rapides',
    services: 'Services',
    portfolio: 'Portfolio',
    about: 'À Propos',
    contact: 'Contact',
    followUs: 'Nous Suivre',
    legal: 'Mentions Légales',
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions d\'Utilisation',
    cookies: 'Politique de Cookies',
    rights: 'Tous droits réservés.',
    designedBy: 'Créé avec créativité par Navigi Agency',
  },
  ar: {
    tagline: 'حول أفكارك إلى واقع رقمي',
    quickLinks: 'روابط سريعة',
    services: 'الخدمات',
    portfolio: 'المحفظة',
    about: 'عن نا',
    contact: 'اتصل',
    followUs: 'متابعتنا',
    legal: 'القانوني',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    cookies: 'سياسة ملفات تعريف الارتباط',
    rights: 'جميع الحقوق محفوظة.',
    designedBy: 'صنع بإبداع من قبل Navigi Agency',
  },
};

export function Footer({ language, isArabic }: FooterProps) {
  const t = translations[language];
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t.services, href: '#services' },
    { label: t.portfolio, href: '#portfolio' },
    { label: t.about, href: '#about' },
    { label: t.contact, href: '#contact' },
  ];

  const legalLinks = [
    { label: t.privacy, href: '/privacy' },
    { label: t.terms, href: '/terms' },
    { label: t.cookies, href: '/cookies' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/navigi', icon: 'f' },
    { name: 'Instagram', url: 'https://instagram.com/navigi', icon: 'ig' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/navigi', icon: 'in' },
    { name: 'TikTok', url: 'https://tiktok.com/@navigi', icon: 'tt' },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border mt-20 sm:mt-24 md:mt-32">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-balance">
            {t.tagline}
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to start your digital transformation? Get in touch with our team today.
          </p>
          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition duration-200 transform hover:scale-105">
            Start Your Project
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className={isArabic ? 'sm:col-span-1' : 'sm:col-span-1'}>
            <div className="flex items-center gap-3 mb-4">
              <svg width="40" height="40" viewBox="0 0 418 418" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <p className="text-muted-foreground text-sm leading-relaxed">
              Creating digital excellence through innovative design and development solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">→</span>
              {t.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">⚡</span>
              {t.services}
            </h4>
            <ul className="space-y-2">
              {[
                'Web Development',
                'Video Editing',
                'Motion Design',
                'Branding',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition duration-200 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">🌐</span>
              {t.followUs}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition duration-200 transform hover:scale-110"
                  title={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {year} Navigi Agency. {t.rights}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 italic">
            {t.designedBy}
          </p>
        </div>
      </div>
    </footer>
  );
}
