'use client';

import React from 'react';

type Language = 'en' | 'fr' | 'ar';

interface PortfolioSectionProps {
  language: Language;
  isArabic: boolean;
}

const translations = {
  en: {
    title: 'Our Work',
    titleHighlight: 'Portfolio',
    subtitle: 'Explore our latest projects and case studies',
    viewCase: 'View Case Study',
    projects: [
      {
        title: 'E-Commerce Platform',
        category: 'Web Development',
        description: 'Modern e-commerce solution with AI-powered recommendations',
        results: '300% increase in conversions',
        image: '🛍️',
      },
      {
        title: 'Brand Identity Campaign',
        category: 'Branding & Design',
        description: 'Complete visual identity redesign for tech startup',
        results: '50% more brand recognition',
        image: '🎨',
      },
      {
        title: 'Viral TikTok Campaign',
        category: 'TikTok Ads',
        description: '10M+ views in first month with creative storytelling',
        results: '2.5M engaged followers',
        image: '📱',
      },
      {
        title: 'Corporate Video Series',
        category: 'Video & Motion',
        description: 'Professional video production and motion graphics',
        results: '5M+ total views',
        image: '🎬',
      },
      {
        title: 'Facebook Ad Strategy',
        category: 'Facebook Ads',
        description: 'Strategic ad campaign targeting Gen Z demographics',
        results: '8x ROI improvement',
        image: '📊',
      },
      {
        title: 'Motion Graphics Package',
        category: 'Motion Design',
        description: 'Animated explainer videos for SaaS products',
        results: '45% higher engagement',
        image: '✨',
      },
    ],
  },
  fr: {
    title: 'Notre Travail',
    titleHighlight: 'Portfolio',
    subtitle: 'Explorez nos derniers projets et études de cas',
    viewCase: 'Voir l\'étude de cas',
    projects: [
      {
        title: 'Plateforme E-Commerce',
        category: 'Développement Web',
        description: 'Solution e-commerce moderne avec recommandations basées sur l\'IA',
        results: 'Augmentation de 300% des conversions',
        image: '🛍️',
      },
      {
        title: 'Campagne d\'Identité Visuelle',
        category: 'Branding & Design',
        description: 'Refonte complète de l\'identité visuelle pour startup technologique',
        results: '50% plus de reconnaissance de marque',
        image: '🎨',
      },
      {
        title: 'Campagne TikTok Virale',
        category: 'Publicités TikTok',
        description: '10M+ vues en premier mois avec narration créative',
        results: '2.5M abonnés engagés',
        image: '📱',
      },
      {
        title: 'Série Vidéo Corporative',
        category: 'Vidéo & Motion',
        description: 'Production vidéo professionnelle et infographie animée',
        results: '5M+ vues totales',
        image: '🎬',
      },
      {
        title: 'Stratégie Publicité Facebook',
        category: 'Publicités Facebook',
        description: 'Campagne publicitaire stratégique ciblant les démographiques Gen Z',
        results: 'Amélioration du ROI de 8x',
        image: '📊',
      },
      {
        title: 'Paquet Motion Graphics',
        category: 'Motion Design',
        description: 'Vidéos d\'explication animées pour produits SaaS',
        results: '45% d\'engagement supérieur',
        image: '✨',
      },
    ],
  },
  ar: {
    title: 'أعمالنا',
    titleHighlight: 'المحفظة',
    subtitle: 'استكشف أحدث مشاريعنا ودراساتنا الحالية',
    viewCase: 'عرض دراسة الحالة',
    projects: [
      {
        title: 'منصة التجارة الإلكترونية',
        category: 'تطوير الويب',
        description: 'حل تجارة إلكترونية حديث مع توصيات تعتمد على الذكاء الاصطناعي',
        results: 'زيادة بنسبة 300٪ في التحويلات',
        image: '🛍️',
      },
      {
        title: 'حملة الهوية البصرية',
        category: 'العلامة التجارية والتصميم',
        description: 'إعادة تصميم كاملة للهوية البصرية لشركة ناشئة في مجال التكنولوجيا',
        results: 'زيادة 50٪ في الوعي بالعلامة التجارية',
        image: '🎨',
      },
      {
        title: 'حملة TikTok الفيروسية',
        category: 'إعلانات TikTok',
        description: '10 ملايين+ عرض في الشهر الأول مع سرد قصة إبداعي',
        results: '2.5 مليون متابع متفاعل',
        image: '📱',
      },
      {
        title: 'سلسلة الفيديو المؤسسي',
        category: 'الفيديو والحركة',
        description: 'إنتاج فيديو احترافي ورسوميات متحركة',
        results: '5 ملايين+ مشاهدة إجمالية',
        image: '🎬',
      },
      {
        title: 'استراتيجية إعلانات فيسبوك',
        category: 'إعلانات فيسبوك',
        description: 'حملة إعلانية استراتيجية تستهدف ديموغرافيات جيل Z',
        results: 'تحسن العائد على الاستثمار بمعدل 8 أضعاف',
        image: '📊',
      },
      {
        title: 'حزمة Motion Graphics',
        category: 'تصميم الحركة',
        description: 'مقاطع فيديو شارحة متحركة لمنتجات SaaS',
        results: '45٪ تفاعل أعلى',
        image: '✨',
      },
    ],
  },
};

export function PortfolioSection({ language, isArabic }: PortfolioSectionProps) {
  const t = translations[language];
  const projects = t.projects;

  return (
    <section id="portfolio" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            {t.title}
            <span className="ml-2 text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition duration-300 cursor-pointer"
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image/Icon Background */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-6xl sm:text-7xl group-hover:scale-110 transition duration-500">
                {project.image}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Category Badge */}
                <div className="inline-block mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Results */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-primary">
                    {project.results}
                  </p>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full py-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground rounded-lg font-semibold text-sm transition duration-200">
                  {t.viewCase}
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center p-6">
                <div className="text-center">
                  <p className="text-foreground font-semibold mb-2">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.results}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="px-8 py-4 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 rounded-lg font-bold transition duration-200 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
