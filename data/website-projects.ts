"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Code2, Eye, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react"

type Language = 'en' | 'fr' | 'ar'
type Category = 'All' | 'E-commerce' | 'Brand' | 'E-learning' | 'Portfolio' | 'Furniture' | 'Mattress' | 'Vitrine'

interface WebsitePortfolioSectionProps {
    language: Language
    isArabic: boolean
}

const translations = {
    en: {
        badge: 'Website Portfolio',
        title: 'Our Website Projects',
        description: 'Crafting exceptional digital experiences that drive results and inspire audiences',
        viewWebsite: 'Preview',
        getLikeThis: 'Get Like This',
        scrollText: 'Scroll to explore',
        closePreview: 'Close Preview',
        visitWebsite: 'Visit Website',
        categories: {
            all: 'All',
            ecommerce: 'E-commerce',
            brand: 'Brand',
            elearning: 'E-learning',
            portfolio: 'Portfolio',
            furniture: 'Furniture',
            mattress: 'Mattress',
            vitrine: 'Vitrine'
        }
    },
    fr: {
        badge: 'Portfolio Web',
        title: 'Nos Projets Web',
        description: 'Créer des expériences numériques exceptionnelles qui génèrent des résultats et inspirent',
        viewWebsite: 'Aperçu',
        getLikeThis: 'Obtenez Pareil',
        scrollText: 'Faites défiler pour explorer',
        closePreview: 'Fermer l\'aperçu',
        visitWebsite: 'Visiter le Site',
        categories: {
            all: 'Tout',
            ecommerce: 'E-commerce',
            brand: 'Marque',
            elearning: 'E-learning',
            portfolio: 'Portfolio',
            furniture: 'Mobilier',
            mattress: 'Matelas',
            vitrine: 'Vitrine'
        }
    },
    ar: {
        badge: 'محفظة المواقع',
        title: 'مشاريع المواقع الإلكترونية',
        description: 'صنع تجارب رقمية استثنائية تحقق النتائج وتلهم الجماهير',
        viewWebsite: 'معاينة',
        getLikeThis: 'احصل على مثل هذا',
        scrollText: 'مرر لاستكشاف',
        closePreview: 'إغلاق المعاينة',
        visitWebsite: 'زيارة الموقع',
        categories: {
            all: 'الكل',
            ecommerce: 'تجارة إلكترونية',
            brand: 'علامة تجارية',
            elearning: 'تعليم إلكتروني',
            portfolio: 'محفظة',
            furniture: 'أثاث',
            mattress: 'مراتب',
            vitrine: 'عرض'
        }
    },
}

interface WebsiteProject {
    id: number
    title: string
    description: string
    image: string
    liveUrl: string
    techStack: string[]
    category: Category
    featured?: boolean
}

const getWebsiteProjects = (language: Language): WebsiteProject[] => {
    const projects = {
        en: [
            {
                import type { WebsiteProject } from "@/data/website-projects";
        import { websiteProjectsData } from "@/data/website-projects";

        // Les données sont maintenant importées depuis data/website-projects.ts
        id: 1,
        const websiteProjects = websiteProjectsData;
        category: "E-learning" as Category
    },
        {
            id: 4,
            title: "Creative Portfolio",
            description: "Stunning showcase for creative work",
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1600&fit=crop",
            liveUrl: "#",
            const filteredProjects = selectedCategory === 'All'
                ? websiteProjects[language]
                : websiteProjects[language].filter(project => project.category === selectedCategory)
                category: "Portfolio" as Category
        },
        {
            id: 5,
            title: "Luxury Furniture Store",
            description: "Premium furniture with AR preview",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Three.js", "Next.js"],
            category: "Furniture" as Category
        },
        {
            id: 6,
            title: "Comfort Mattress Shop",
            description: "Sleep solutions e-commerce platform",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Shopify", "React"],
            category: "Mattress" as Category
        },
        {
            id: 7,
            title: "Product Showcase",
            description: "Interactive product display website",
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Next.js", "Three.js"],
            category: "Vitrine" as Category
        }
        ],
fr: [
    {
        id: 1,
        title: "Boutique Mode Premium",
        description: "E-commerce luxe avec paiement fluide",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["Next.js", "Stripe"],
        category: "E-commerce" as Category,
        featured: true
    },
    {
        id: 2,
        title: "Marque Startup Tech",
        description: "Identité corporate moderne et site web",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["React", "Framer"],
        category: "Brand" as Category
    },
    {
        id: 3,
        title: "Plateforme E-Learning",
        description: "Cours interactifs avec sessions live",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["Next.js", "WebRTC"],
        category: "E-learning" as Category
    },
    {
        id: 4,
        title: "Portfolio Créatif",
        description: "Vitrine époustouflante pour créatifs",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["React", "GSAP"],
        category: "Portfolio" as Category
    },
    {
        id: 5,
        title: "Boutique Mobilier Luxe",
        description: "Meubles premium avec aperçu AR",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["Three.js", "Next.js"],
        category: "Furniture" as Category
    },
    {
        id: 6,
        title: "Magasin Matelas Confort",
        description: "Plateforme e-commerce sommeil",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["Shopify", "React"],
        category: "Mattress" as Category
    },
    {
        id: 7,
        title: "Vitrine Produits",
        description: "Site d'exposition produits interactif",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=1600&fit=crop",
        liveUrl: "#",
        techStack: ["Next.js", "Three.js"],
        category: "Vitrine" as Category
    }
],
    ar: [
        {
            id: 1,
            title: "متجر أزياء فاخر",
            description: "تجارة إلكترونية فاخرة مع دفع سلس",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Next.js", "Stripe"],
            category: "E-commerce" as Category,
            featured: true
        },
        {
            id: 2,
            title: "علامة تجارية تقنية",
            description: "هوية شركات حديثة وموقع ويب",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["React", "Framer"],
            category: "Brand" as Category
        },
        {
            id: 3,
            title: "منصة تعليم إلكتروني",
            description: "دورات تفاعلية مع جلسات مباشرة",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Next.js", "WebRTC"],
            category: "E-learning" as Category
        },
        {
            id: 4,
            title: "محفظة إبداعية",
            description: "عرض مذهل للأعمال الإبداعية",
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["React", "GSAP"],
            category: "Portfolio" as Category
        },
        {
            id: 5,
            title: "متجر أثاث فاخر",
            description: "أثاث فاخر مع معاينة AR",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Three.js", "Next.js"],
            category: "Furniture" as Category
        },
        {
            id: 6,
            title: "متجر مراتب مريحة",
            description: "منصة تجارة إلكترونية للنوم",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Shopify", "React"],
            category: "Mattress" as Category
        },
        {
            id: 7,
            title: "عرض المنتجات",
            description: "موقع عرض منتجات تفاعلي",
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=1600&fit=crop",
            liveUrl: "#",
            techStack: ["Next.js", "Three.js"],
            category: "Vitrine" as Category
        }
    ]
    }
return projects[language]
}

export function WebsitePortfolioSection({ language, isArabic }: WebsitePortfolioSectionProps) {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<Category>('All')
    const [previewProject, setPreviewProject] = useState<WebsiteProject | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const t = translations[language]
    const websiteProjects = getWebsiteProjects(language)

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All'
        ? websiteProjects
        : websiteProjects.filter(project => project.category === selectedCategory)

    const categories: Category[] = ['All', 'E-commerce', 'Brand', 'E-learning', 'Portfolio', 'Furniture', 'Mattress', 'Vitrine']

    const handleGetLikeThis = (project: WebsiteProject) => {
        // Scroll to contact section or open contact form
        const contactSection = document.querySelector('#contact')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -600, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 600, behavior: 'smooth' })
        }
    }

    return (
        <section className={`website-portfolio-section ${isArabic ? 'rtl' : 'ltr'}`}>
            <div className="website-portfolio-container">
                {/* Header */}
                <div className="website-portfolio-header">
                    <div className="header-badge">
                        <Code2 className="badge-icon" />
                        <span>{t.badge}</span>
                    </div>
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-description">
                        {t.description}
                    </p>
                </div>

                {/* Category Filters */}
                <div className="category-filters">
                    {categories.map((category) => {
                        const categoryKey = category.toLowerCase().replace('-', '') as keyof typeof t.categories
                        const label = t.categories[categoryKey] || category

                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>

                {/* Dual Mockups (Desktop + Mobile) - Horizontal Scroll */}
                <div className="projects-scroll-wrapper">
                    {/* Scroll Buttons */}
                    <button
                        className="scroll-btn scroll-btn-left"
                        onClick={scrollLeft}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        className="scroll-btn scroll-btn-right"
                        onClick={scrollRight}
                        aria-label="Scroll right"
                    >
                        <ChevronRight />
                    </button>

                    <div className="projects-scroll-container" ref={scrollContainerRef}>
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`dual-mockup-card ${project.featured ? 'featured' : ''}`}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {/* Desktop + Mobile Mockup Container */}
                                <div className="mockup-container">

                                    {/* Desktop Browser Mockup */}
                                    <div className="desktop-mockup">
                                        <div className="browser-window">
                                            {/* Browser Top Bar */}
                                            <div className="browser-bar">
                                                <div className="browser-dots">
                                                    <span className="dot dot-red"></span>
                                                    <span className="dot dot-yellow"></span>
                                                    <span className="dot dot-green"></span>
                                                </div>
                                                <div className="browser-address">
                                                    <span>{project.liveUrl}</span>
                                                </div>
                                                <div className="browser-spacer"></div>
                                            </div>

                                            {/* Desktop Screenshot */}
                                            <div className="desktop-screen">
                                                <img
                                                    src={project.image}
                                                    alt={`${project.title} - Desktop`}
                                                    className="desktop-image"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Phone Mockup */}
                                    <div className="mobile-mockup">
                                        <div className="phone-frame">
                                            {/* Notch */}
                                            <div className="phone-notch"></div>

                                            {/* Mobile Screenshot */}
                                            <div className="phone-screen">
                                                <img
                                                    src={project.image}
                                                    alt={`${project.title} - Mobile`}
                                                    className="phone-image"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Tag */}
                                    <div className="category-tag">
                                        {project.category}
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                                        <div className="overlay-content">
                                            <span className="project-category">{project.category}</span>
                                            <h3 className="project-title">{project.title}</h3>
                                            <p className="project-description">{project.description}</p>

                                            {/* Tech Stack */}
                                            <div className="tech-stack">
                                                {project.techStack.map((tech, i) => (
                                                    <span key={i} className="tech-badge">{tech}</span>
                                                ))}
                                            </div>

                                            {/* Dual CTA Buttons */}
                                            <div className="cta-buttons">
                                                <Button
                                                    className="preview-btn"
                                                    onClick={() => setPreviewProject(project)}
                                                >
                                                    <Eye className="btn-icon" />
                                                    <span>{t.viewWebsite}</span>
                                                </Button>
                                                <Button
                                                    className="get-like-this-btn"
                                                    onClick={() => handleGetLikeThis(project)}
                                                >
                                                    <Sparkles className="btn-icon" />
                                                    <span>{t.getLikeThis}</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Project Info (visible on small screens) */}
                                <div className="project-info-mobile">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="mobile-cta-buttons">
                                        <Button
                                            className="preview-btn-mobile"
                                            onClick={() => setPreviewProject(project)}
                                        >
                                            <Eye className="btn-icon" />
                                            <span>{t.viewWebsite}</span>
                                        </Button>
                                        <Button
                                            className="get-like-this-btn-mobile"
                                            onClick={() => handleGetLikeThis(project)}
                                        >
                                            <Sparkles className="btn-icon" />
                                            <span>{t.getLikeThis}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <div className="scroll-line"></div>
                    <span className="scroll-text">{t.scrollText}</span>
                </div>
            </div>

            {/* Preview Modal */}
            {previewProject && (
                <div className="preview-modal-overlay">
                    <div className="preview-modal-container">
                        {/* Modal Header */}
                        <div className="preview-modal-header">
                            <div className="preview-modal-title">
                                <Eye className="preview-icon" />
                                <h3>{previewProject.title}</h3>
                            </div>
                            <div className="preview-modal-actions">
                                <Button
                                    className="visit-website-btn"
                                    onClick={() => window.open(previewProject.liveUrl, '_blank')}
                                >
                                    <span>{t.visitWebsite}</span>
                                    <ExternalLink className="btn-icon" />
                                </Button>
                                <button
                                    className="close-preview-btn"
                                    onClick={() => setPreviewProject(null)}
                                    aria-label={t.closePreview}
                                >
                                    <X />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Container */}
                        <div className="preview-iframe-container">
                            <iframe
                                src={previewProject.liveUrl}
                                title={`Preview of ${previewProject.title}`}
                                className="preview-iframe"
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
