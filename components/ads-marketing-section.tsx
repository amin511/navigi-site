"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    TrendingUp,
    Target,
    BarChart3,
    Megaphone,
    Smartphone,
    Sparkles,
    ArrowRight,
    Play
} from "lucide-react"
import "./ads-marketing-section.css"

type Language = 'en' | 'fr' | 'ar'

interface AdsMarketingSectionProps {
    language: Language
    isArabic: boolean
}

const translations = {
    en: {
        badge: 'Digital Marketing',
        title: 'Ads & Marketing Expertise',
        description: 'Amplify your brand with data-driven strategies and creative campaigns that convert',
        cta: 'Work With Us',
        watchDemo: 'Watch Demo',
        services: {
            facebook: {
                name: 'Facebook Ads',
                description: 'Targeted campaigns that reach the right audience with precision and creativity'
            },
            tiktok: {
                name: 'TikTok Ads',
                description: 'Viral-ready content that captures attention and drives massive engagement'
            },
            strategy: {
                name: 'Strategy & Planning',
                description: 'Data-backed marketing roadmaps designed to maximize ROI and growth'
            },
            analytics: {
                name: 'Analytics & Insights',
                description: 'Real-time performance tracking with actionable insights for optimization'
            },
            instagram: {
                name: 'Instagram Ads',
                description: 'Visually stunning campaigns that convert followers into loyal customers'
            },
            google: {
                name: 'Google Ads',
                description: 'Search and display campaigns that put your brand at the top of results'
            }
        }
    },
    fr: {
        badge: 'Marketing Digital',
        title: 'Expertise Publicité & Marketing',
        description: 'Amplifiez votre marque avec des stratégies basées sur les données et des campagnes créatives qui convertissent',
        cta: 'Travailler Avec Nous',
        watchDemo: 'Voir la Démo',
        services: {
            facebook: {
                name: 'Facebook Ads',
                description: 'Campagnes ciblées qui atteignent le bon public avec précision et créativité'
            },
            tiktok: {
                name: 'TikTok Ads',
                description: 'Contenu viral qui capte l\'attention et génère un engagement massif'
            },
            strategy: {
                name: 'Stratégie & Planification',
                description: 'Feuilles de route marketing basées sur les données pour maximiser le ROI'
            },
            analytics: {
                name: 'Analyses & Insights',
                description: 'Suivi des performances en temps réel avec des insights actionnables'
            },
            instagram: {
                name: 'Instagram Ads',
                description: 'Campagnes visuellement époustouflantes qui convertissent les abonnés'
            },
            google: {
                name: 'Google Ads',
                description: 'Campagnes de recherche qui placent votre marque en haut des résultats'
            }
        }
    },
    ar: {
        badge: 'التسويق الرقمي',
        title: 'خبرة الإعلانات والتسويق',
        description: 'عزز علامتك التجارية باستراتيجيات قائمة على البيانات وحملات إبداعية تحقق النتائج',
        cta: 'اعمل معنا',
        watchDemo: 'شاهد العرض',
        services: {
            facebook: {
                name: 'إعلانات فيسبوك',
                description: 'حملات مستهدفة تصل إلى الجمهور المناسب بدقة وإبداع'
            },
            tiktok: {
                name: 'إعلانات تيك توك',
                description: 'محتوى جاهز للانتشار يجذب الانتباه ويحقق تفاعلاً هائلاً'
            },
            strategy: {
                name: 'الاستراتيجية والتخطيط',
                description: 'خرائط طريق تسويقية مدعومة بالبيانات لتعظيم العائد والنمو'
            },
            analytics: {
                name: 'التحليلات والرؤى',
                description: 'تتبع الأداء في الوقت الفعلي مع رؤى قابلة للتنفيذ'
            },
            instagram: {
                name: 'إعلانات إنستغرام',
                description: 'حملات مذهلة بصرياً تحول المتابعين إلى عملاء مخلصين'
            },
            google: {
                name: 'إعلانات جوجل',
                description: 'حملات بحث وعرض تضع علامتك في أعلى النتائج'
            }
        }
    }
}

interface Service {
    id: string
    icon: React.ReactNode
    key: keyof typeof translations.en.services
    color: string
    video?: string
}

const services: Service[] = [
    {
        id: 'facebook',
        icon: <Megaphone />,
        key: 'facebook',
        color: '#1877F2',
        video: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop'
    },
    {
        id: 'tiktok',
        icon: <Smartphone />,
        key: 'tiktok',
        color: '#00F2EA',
        video: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop'
    },
    {
        id: 'strategy',
        icon: <Target />,
        key: 'strategy',
        color: '#8C52FE'
    },
    {
        id: 'analytics',
        icon: <BarChart3 />,
        key: 'analytics',
        color: '#10B981'
    },
    {
        id: 'instagram',
        icon: <Sparkles />,
        key: 'instagram',
        color: '#E4405F',
        video: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&h=400&fit=crop'
    },
    {
        id: 'google',
        icon: <TrendingUp />,
        key: 'google',
        color: '#4285F4'
    }
]

export function AdsMarketingSection({ language, isArabic }: AdsMarketingSectionProps) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const t = translations[language]

    return (
        <section className={`ads-marketing-section ${isArabic ? 'rtl' : 'ltr'}`}>
            <div className="ads-marketing-container">
                {/* Header */}
                <div className="ads-marketing-header">
                    <div className="header-badge">
                        <TrendingUp className="badge-icon" />
                        <span>{t.badge}</span>
                    </div>
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-description">
                        {t.description}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="services-grid">
                    {services.map((service) => {
                        const serviceData = t.services[service.key]
                        return (
                            <div
                                key={service.id}
                                className={`service-card ${hoveredCard === service.id ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredCard(service.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Icon Circle */}
                                <div
                                    className="service-icon-wrapper"
                                    style={{
                                        background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}05 100%)`,
                                        borderColor: `${service.color}30`
                                    }}
                                >
                                    <div
                                        className="service-icon"
                                        style={{ color: service.color }}
                                    >
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="service-content">
                                    <h3 className="service-name">{serviceData.name}</h3>
                                    <p className="service-description">{serviceData.description}</p>
                                </div>

                                {/* Optional Video Preview */}
                                {service.video && (
                                    <div className="service-preview">
                                        <img
                                            src={service.video}
                                            alt={serviceData.name}
                                            className="preview-image"
                                        />
                                        <div className="preview-overlay">
                                            <button className="play-button" aria-label={t.watchDemo}>
                                                <Play />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Hover Glow Effect */}
                                <div
                                    className="card-glow"
                                    style={{ background: `radial-gradient(circle at center, ${service.color}20 0%, transparent 70%)` }}
                                />
                            </div>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <div className="cta-wrapper">
                    <Button className="work-with-us-btn">
                        <span>{t.cta}</span>
                        <ArrowRight className="cta-icon" />
                    </Button>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="background-decoration">
                <div className="decoration-orb decoration-orb-1"></div>
                <div className="decoration-orb decoration-orb-2"></div>
            </div>
        </section>
    )
}
