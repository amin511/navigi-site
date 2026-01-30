'use client';

import React from 'react';

type Language = 'en' | 'fr' | 'ar';

interface ServicesSectionProps {
  language: Language;
  isArabic: boolean;
}

const translations = {
  en: {
    title: 'Our Services',
    titleHighlight: 'Services',
    subtitle: 'Transform Your Brand With Our Expertise',
    services: [
      {
        icon: '🌐',
        title: 'Web Development',
        description: 'Modern, responsive, and high-performance websites built with the latest technologies. We create digital experiences that engage and convert.',
        keywords: ['React', 'Next.js', 'Web Apps', 'E-commerce'],
      },
      {
        icon: '🎬',
        title: 'Video Editing',
        description: 'Professional video editing and motion graphics that bring your story to life. From concept to final cut, we handle it all.',
        keywords: ['4K Video', 'Motion Graphics', 'Animation', 'Post-Production'],
      },
      {
        icon: '🎨',
        title: 'Motion Design',
        description: 'Creative motion design that captures attention and communicates your message effectively with dynamic visual storytelling.',
        keywords: ['Animation', 'Visual Effects', 'UI Animation', 'Branding'],
      },
      {
        icon: '🏢',
        title: 'Branding & Design',
        description: 'Comprehensive branding solutions that define your identity and resonate with your target audience across all platforms.',
        keywords: ['Logo Design', 'Brand Identity', 'UI/UX', 'Print Design'],
      },
      {
        icon: '📱',
        title: 'Facebook Ads',
        description: 'Strategic Facebook advertising campaigns that reach your ideal customers and maximize your ROI through data-driven targeting.',
        keywords: ['Ad Strategy', 'Targeting', 'Analytics', 'Conversion Optimization'],
      },
      {
        icon: '🎵',
        title: 'TikTok Ads',
        description: 'Viral-worthy TikTok campaigns that engage Gen Z and younger audiences with creative, authentic, and trend-driven content.',
        keywords: ['Viral Marketing', 'Trend Analysis', 'Creative Ads', 'Engagement'],
      },
    ],
  },
  fr: {
    title: 'Nos Services',
    titleHighlight: 'Services',
    subtitle: 'Transformez votre marque avec notre expertise',
    services: [
      {
        icon: '🌐',
        title: 'Développement Web',
        description: 'Sites web modernes, réactifs et haute performance construits avec les dernières technologies. Nous créons des expériences numériques engageantes.',
        keywords: ['React', 'Next.js', 'Web Apps', 'E-commerce'],
      },
      {
        icon: '🎬',
        title: 'Édition Vidéo',
        description: 'Édition vidéo professionnelle et animation graphique qui donnent vie à votre histoire. Du concept à la version finale, nous gérons tout.',
        keywords: ['Vidéo 4K', 'Infographie Animée', 'Animation', 'Post-Production'],
      },
      {
        icon: '🎨',
        title: 'Motion Design',
        description: 'Conception d\'animation créative qui captive l\'attention et communique efficacement votre message avec des visuels dynamiques.',
        keywords: ['Animation', 'Effets Visuels', 'Animation UI', 'Branding'],
      },
      {
        icon: '🏢',
        title: 'Branding & Design',
        description: 'Solutions complètes de branding qui définissent votre identité et résonnent auprès de votre public cible sur tous les supports.',
        keywords: ['Design Logo', 'Identité Visuelle', 'UI/UX', 'Design d\'impression'],
      },
      {
        icon: '📱',
        title: 'Publicités Facebook',
        description: 'Campagnes publicitaires Facebook stratégiques qui atteignent vos clients idéaux et maximisent votre ROI grâce au ciblage basé sur les données.',
        keywords: ['Stratégie Pub', 'Ciblage', 'Analytique', 'Optimisation Conversion'],
      },
      {
        icon: '🎵',
        title: 'Publicités TikTok',
        description: 'Campagnes TikTok virales qui engagent la Gen Z et les jeunes audiences avec un contenu créatif, authentique et tendance.',
        keywords: ['Marketing Viral', 'Analyse de Tendances', 'Publicités Créatives', 'Engagement'],
      },
    ],
  },
  ar: {
    title: 'خدماتنا',
    titleHighlight: 'خدمات',
    subtitle: 'حول علامتك التجارية مع خبرتنا',
    services: [
      {
        icon: '🌐',
        title: 'تطوير الويب',
        description: 'مواقع ويب حديثة وسريعة الاستجابة وعالية الأداء مبنية بأحدث التقنيات. نحن ننشئ تجارب رقمية جذابة.',
        keywords: ['React', 'Next.js', 'Web Apps', 'التجارة الإلكترونية'],
      },
      {
        icon: '🎬',
        title: 'تحرير الفيديو',
        description: 'تحرير فيديو احترافي وتصميم حركات تجعل قصتك حية. من المفهوم إلى النسخة النهائية، نتولى كل شيء.',
        keywords: ['فيديو 4K', 'الرسوميات المتحركة', 'الرسوم المتحركة', 'ما بعد الإنتاج'],
      },
      {
        icon: '🎨',
        title: 'تصميم الحركة',
        description: 'تصميم حركة إبداعي يجذب الانتباه ويوصل رسالتك بفعالية من خلال سرد قصص بصري ديناميكي.',
        keywords: ['الرسوم المتحركة', 'المؤثرات البصرية', 'رسوم واجهة المستخدم', 'العلامة التجارية'],
      },
      {
        icon: '🏢',
        title: 'العلامة التجارية والتصميم',
        description: 'حلول شاملة للعلامة التجارية التي تحدد هويتك وتتردد مع جمهورك المستهدف عبر جميع المنصات.',
        keywords: ['تصميم الشعار', 'الهوية البصرية', 'تصميم واجهة المستخدم', 'التصميم المطبوع'],
      },
      {
        icon: '📱',
        title: 'إعلانات فيسبوك',
        description: 'حملات إعلانية استراتيجية على فيسبوك تصل إلى عملائك المثاليين وتزيد عائد استثمارك من خلال الاستهداف المبني على البيانات.',
        keywords: ['استراتيجية إعلانية', 'الاستهداف', 'التحليلات', 'تحسين التحويل'],
      },
      {
        icon: '🎵',
        title: 'إعلانات تيك توك',
        description: 'حملات تيك توك فيروسية تجذب جيل زد والجماهير الأصغر سنًا بمحتوى إبداعي وأصلي وتابع للاتجاهات.',
        keywords: ['التسويق الفيروسي', 'تحليل الاتجاهات', 'الإعلانات الإبداعية', 'الانخراط'],
      },
    ],
  },
};

export function ServicesSection({ language, isArabic }: ServicesSectionProps) {
  const t = translations[language];
  const services = t.services;

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/5 to-background">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 sm:p-8 bg-card/50 border border-border hover:border-primary/50 rounded-2xl transition duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm"
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {service.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition duration-300 transform group-hover:translate-x-2">
                  <span className="text-sm font-semibold">Explore</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
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
