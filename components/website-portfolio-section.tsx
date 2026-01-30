"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Code2, Eye, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react"
import "./website-portfolio-section.css"
import "./website-portfolio-modal.css"

type Language = 'en' | 'fr' | 'ar'
type Category = 'All' | 'E-commerce' | 'Brand' | 'E-learning' | 'Portfolio' | 'Furniture' | 'Mattress' | 'Vitrine'

interface WebsitePortfolioSectionProps {
    language: Language
    isArabic: boolean
}

const translations = {
    en: {
        badge: 'Portfolio',
        title: 'Our Projects',
        description: 'Digital experiences that work',
        viewWebsite: 'View',
        getLikeThis: 'Get This',
        scrollText: 'Scroll',
        closePreview: 'Close',
        visitWebsite: 'Visit',
        categories: {
            all: 'All',
            ecommerce: 'Shop',
            portfolio: 'Portfolio',
            elearning: 'E-learning'
        }
    },
    fr: {
        badge: 'Portfolio',
        title: 'Nos Projets',
        description: 'Expériences digitales efficaces',
        viewWebsite: 'Voir',
        getLikeThis: 'Obtenir',
        scrollText: 'Défiler',
        closePreview: 'Fermer',
        visitWebsite: 'Visiter',
        categories: {
            all: 'Tout',
            ecommerce: 'Boutique',
            portfolio: 'Portfolio',
            elearning: 'E-learning'
        }
    },
    ar: {
        badge: 'المحفظة',
        title: 'مشاريعنا',
        description: 'تجارب رقمية فعالة',
        viewWebsite: 'عرض',
        getLikeThis: 'احصل عليه',
        scrollText: 'مرر',
        closePreview: 'إغلاق',
        visitWebsite: 'زيارة',
        categories: {
            all: 'الكل',
            ecommerce: 'متجر',
            portfolio: 'محفظة',
            elearning: 'التعلم الإلكتروني'
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
                id: 1,
                title: "naals-brand store",
                description: "Boutique brand and e-commerce platform",
                image: "/naalas-brand2.png",
                liveUrl: "https://naalas-brand.com",
                techStack: [],
                category: "E-commerce" as Category,
                featured: true
            },
            {
                id: 2,
                title: "Creative Portfolio",
                description: "Showcase for creative work",
                image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1600&fit=crop",
                liveUrl: "https://les-idees-de-selma.site",
                techStack: [],
                category: "Portfolio" as Category
            },
            {
                id: 3,
                title: "Les Idées de Selma",
                description: "E-learning platform with course registration and enrollment system",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1600&fit=crop",
                liveUrl: "#",
                techStack: ["Next.js", "Stripe", "Prisma"],
                category: "E-learning" as Category
            }
        ],
        fr: [
            {
                id: 1,
                title: "naals-brand store",
                description: "Boutique marque et plateforme e-commerce",
                image: "/naalas-brand.png",
                liveUrl: "https://naalas-brand.com",
                techStack: ["Next.js", "Stripe"],
                category: "E-commerce" as Category,
                featured: true
            },
            {
                id: 2,
                title: "Portfolio Créatif",
                description: "Vitrine pour travaux créatifs",
                image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1600&fit=crop",
                liveUrl: "#",
                techStack: ["React", "GSAP"],
                category: "Portfolio" as Category
            },
            {
                id: 3,
                title: "Les Idées de Selma",
                description: "Plateforme e-learning avec système d'inscription et d'enrôlement aux cours",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1600&fit=crop",
                liveUrl: "#",
                techStack: ["Next.js", "Stripe", "Prisma"],
                category: "E-learning" as Category
            }
        ],
        ar: [
            {
                id: 1,
                title: "naals-brand store",
                description: "متجر علامة تجارية ومنصة تجارة إلكترونية",
                image: "/naalas-bra.png",
                liveUrl: "https://naalas-brand.com",
                techStack: [],
                category: "E-commerce" as Category,
                featured: true
            },
            {
                id: 2,
                title: "محفظة إبداعية",
                description: "عرض للأعمال الإبداعية",
                image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=1600&fit=crop",
                liveUrl: "#",
                techStack: ["React", "GSAP"],
                category: "Portfolio" as Category
            },
            {
                id: 3,
                title: "أفكار سلمى",
                description: "منصة تعليم إلكتروني مع نظام التسجيل والتسجيل في الدورات",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1600&fit=crop",
                liveUrl: "#",
                techStack: ["Next.js", "Stripe", "Prisma"],
                category: "E-learning" as Category
            }
        ]
    }
    return projects[language]
}

export function WebsitePortfolioSection({ language, isArabic }: WebsitePortfolioSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All')
    const [previewProject, setPreviewProject] = useState<WebsiteProject | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const t = translations[language]
    const websiteProjects = getWebsiteProjects(language)

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === 'All'
        ? websiteProjects
        : websiteProjects.filter(project => project.category === selectedCategory)

    const categories: Category[] = ['All', 'E-commerce', 'Portfolio', 'E-learning']

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
                <div className="relative">
                    {/* Scroll Buttons */}
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 -translate-x-1/2"
                        onClick={scrollLeft}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 translate-x-1/2"
                        onClick={scrollRight}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" ref={scrollContainerRef}>
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6 shadow-xl ${project.featured ? 'ring-2 ring-purple-500/50' : ''}`}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {/* Desktop + Mobile Mockup Container */}
                                <div className="flex gap-3 md:gap-4 mb-3 md:mb-4 h-32 md:h-48">

                                    {/* Desktop Browser Mockup */}
                                    <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
                                        <div className="h-5 md:h-6 bg-gray-700 flex items-center px-2 md:px-3 gap-1 md:gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></div>
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full"></div>
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></div>
                                            </div>
                                            <div className="flex-1 text-center">
                                                <span className="text-xs text-gray-400 truncate">{project.liveUrl}</span>
                                            </div>
                                        </div>
                                        <div className="h-24 md:h-36 bg-gray-900 flex items-center justify-center">
                                            <img
                                                src={project.image}
                                                alt={`${project.title} - Desktop`}
                                                className="w-full h-full object-cover "
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Phone Mockup */}
                                    <div className="w-16 md:w-20 bg-gray-800 rounded-xl overflow-hidden border border-gray-600 relative">
                                        <div className="h-1.5 md:h-2 bg-gray-700 rounded-t-xl"></div>
                                        <div className="h-24 md:h-36 bg-gray-900 flex items-center justify-center">
                                            <img
                                                src={project.image}
                                                alt={`${project.title} - Mobile`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                                            {project.category}
                                        </span>
                                        {project.featured && (
                                            <span className="text-xs text-yellow-400">★ Featured</span>
                                        )}
                                    </div>

                                    <h3 className="text-base md:text-lg font-bold text-white line-clamp-1">{project.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-300 line-clamp-2">{project.description}</p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1">
                                        {project.techStack.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-xs bg-gray-700/50 text-gray-300 px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex gap-2 pt-1 md:pt-2">
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-xs md:text-sm py-1.5 md:py-2 px-2 md:px-3 rounded-lg transition-all duration-300"
                                            onClick={() => setPreviewProject(project)}
                                        >
                                            <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                            <span>{t.viewWebsite}</span>
                                        </Button>
                                        <Button
                                            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs md:text-sm py-1.5 md:py-2 px-2 md:px-3 rounded-lg transition-all duration-300"
                                            onClick={() => handleGetLikeThis(project)}
                                        >
                                            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                            <span>{t.getLikeThis}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    <span className="text-sm text-gray-400">{t.scrollText}</span>
                </div>
            </div>

            {/* Preview Modal */}
            {previewProject && (
                <div className="preview-modal-overlay">
                    <div className="preview-modal-container">
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

                        {/* Modal Footer */}
                        <div className="preview-modal-footer">
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
                                    className="w-10 h-10 flex items-center justify-center bg-white/15 border border-white/30 rounded-lg text-black cursor-pointer transition-all duration-300 hover:bg-red-500/30 hover:border-red-500/60 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                                    onClick={() => setPreviewProject(null)}
                                    aria-label={t.closePreview}
                                >
                                    <X />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
