"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Palette,
    Image as ImageIcon,
    Sparkles,
    Tag,
    Layers,
    Box,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    X,
    Eye,
    Download
} from "lucide-react"
import "./graphic-design-section.css"
import "./graphic-design-pdf-modal.css"

type Language = 'en' | 'fr' | 'ar'
type Category = 'All' | 'Logo' | 'Branding' | 'Posters' | 'Social Media' | 'Packaging'

interface GraphicDesignSectionProps {
    language: Language
    isArabic: boolean
}

const translations = {
    en: {
        badge: 'Creative Studio',
        title: 'Graphic Design & Visual Identity',
        description: 'Crafting memorable brand experiences through stunning visual storytelling',
        cta: 'See Full Portfolio',
        previewPdf: 'Preview PDF',
        download: 'Download',
        closePreview: 'Close Preview',
        categories: {
            all: 'All',
            logo: 'Logo',
            branding: 'Branding',
            posters: 'Posters',
            socialmedia: 'Social Media',
            packaging: 'Packaging'
        }
    },
    fr: {
        badge: 'Studio Créatif',
        title: 'Design Graphique & Identité Visuelle',
        description: 'Créer des expériences de marque mémorables grâce à une narration visuelle époustouflante',
        cta: 'Voir le Portfolio Complet',
        previewPdf: 'Aperçu PDF',
        download: 'Télécharger',
        closePreview: 'Fermer l\'aperçu',
        categories: {
            all: 'Tout',
            logo: 'Logo',
            branding: 'Image de Marque',
            posters: 'Affiches',
            socialmedia: 'Réseaux Sociaux',
            packaging: 'Emballage'
        }
    },
    ar: {
        badge: 'استوديو إبداعي',
        title: 'التصميم الجرافيكي والهوية البصرية',
        description: 'صياغة تجارب علامة تجارية لا تُنسى من خلال سرد قصصي بصري مذهل',
        cta: 'عرض المحفظة الكاملة',
        previewPdf: 'معاينة PDF',
        download: 'تحميل',
        closePreview: 'إغلاق المعاينة',
        categories: {
            all: 'الكل',
            logo: 'شعار',
            branding: 'العلامة التجارية',
            posters: 'ملصقات',
            socialmedia: 'وسائل التواصل',
            packaging: 'التغليف'
        }
    }
}

interface DesignProject {
    id: number
    title: string
    category: Category
    client: string
    image: string
    color: string
    pdfUrl?: string
}

const getDesignProjects = (language: Language): DesignProject[] => {
    const projects: Record<Language, DesignProject[]> = {
        en: [
            {
                id: 1,
                title: "Tech Startup Logo",
                category: "Logo" as Category,
                client: "InnovateTech",
                image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop",
                color: "#8C52FE",
                pdfUrl: "/sample-brand-identity.pdf"
            },
            {
                id: 2,
                title: "Brand Identity System",
                category: "Branding" as Category,
                client: "Luna Cosmetics",
                image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop",
                color: "#E4405F",
                pdfUrl: "/sample-brand-guidelines.pdf"
            },
            {
                id: 3,
                title: "Music Festival Poster",
                category: "Posters" as Category,
                client: "Summer Beats",
                image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&h=600&fit=crop",
                color: "#00F2EA"
            },
            {
                id: 4,
                title: "Instagram Campaign",
                category: "Social Media" as Category,
                client: "Fashion Forward",
                image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=600&fit=crop",
                color: "#F59E0B"
            },
            {
                id: 5,
                title: "Product Packaging",
                category: "Packaging" as Category,
                client: "Organic Bliss",
                image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop",
                color: "#10B981"
            },
            {
                id: 6,
                title: "Corporate Branding",
                category: "Branding" as Category,
                client: "Global Ventures",
                image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=600&fit=crop",
                color: "#1877F2"
            },
            {
                id: 7,
                title: "Minimalist Logo",
                category: "Logo" as Category,
                client: "Zen Studio",
                image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=600&fit=crop",
                color: "#8C52FE"
            },
            {
                id: 8,
                title: "Social Media Kit",
                category: "Social Media" as Category,
                client: "Food Delight",
                image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=600&fit=crop",
                color: "#EF4444"
            }
        ],
        fr: [
            {
                id: 1,
                title: "Logo Startup Tech",
                category: "Logo" as Category,
                client: "InnovateTech",
                image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop",
                color: "#8C52FE",
                pdfUrl: "/sample-brand-identity.pdf"
            },
            {
                id: 2,
                title: "Système d'Identité",
                category: "Branding" as Category,
                client: "Luna Cosmetics",
                image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop",
                color: "#E4405F",
                pdfUrl: "/sample-brand-guidelines.pdf"
            },
            {
                id: 3,
                title: "Affiche Festival Musical",
                category: "Posters" as Category,
                client: "Summer Beats",
                image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&h=600&fit=crop",
                color: "#00F2EA"
            },
            {
                id: 4,
                title: "Campagne Instagram",
                category: "Social Media" as Category,
                client: "Fashion Forward",
                image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=600&fit=crop",
                color: "#F59E0B"
            },
            {
                id: 5,
                title: "Emballage Produit",
                category: "Packaging" as Category,
                client: "Organic Bliss",
                image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop",
                color: "#10B981"
            },
            {
                id: 6,
                title: "Branding Corporate",
                category: "Branding" as Category,
                client: "Global Ventures",
                image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=600&fit=crop",
                color: "#1877F2"
            },
            {
                id: 7,
                title: "Logo Minimaliste",
                category: "Logo" as Category,
                client: "Zen Studio",
                image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=600&fit=crop",
                color: "#8C52FE"
            },
            {
                id: 8,
                title: "Kit Réseaux Sociaux",
                category: "Social Media" as Category,
                client: "Food Delight",
                image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=600&fit=crop",
                color: "#EF4444"
            }
        ],
        ar: [
            {
                id: 1,
                title: "شعار شركة تقنية",
                category: "Logo" as Category,
                client: "InnovateTech",
                image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop",
                color: "#8C52FE",
                pdfUrl: "/sample-brand-identity.pdf"
            },
            {
                id: 2,
                title: "نظام هوية العلامة",
                category: "Branding" as Category,
                client: "Luna Cosmetics",
                image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=600&fit=crop",
                color: "#E4405F",
                pdfUrl: "/sample-brand-guidelines.pdf"
            },
            {
                id: 3,
                title: "ملصق مهرجان موسيقي",
                category: "Posters" as Category,
                client: "Summer Beats",
                image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&h=600&fit=crop",
                color: "#00F2EA"
            },
            {
                id: 4,
                title: "حملة انستغرام",
                category: "Social Media" as Category,
                client: "Fashion Forward",
                image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=600&fit=crop",
                color: "#F59E0B"
            },
            {
                id: 5,
                title: "تغليف منتج",
                category: "Packaging" as Category,
                client: "Organic Bliss",
                image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop",
                color: "#10B981"
            },
            {
                id: 6,
                title: "علامة تجارية شركة",
                category: "Branding" as Category,
                client: "Global Ventures",
                image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=600&fit=crop",
                color: "#1877F2"
            },
            {
                id: 7,
                title: "شعار بسيط",
                category: "Logo" as Category,
                client: "Zen Studio",
                image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=600&fit=crop",
                color: "#8C52FE"
            },
            {
                id: 8,
                title: "مجموعة سوشيال ميديا",
                category: "Social Media" as Category,
                client: "Food Delight",
                image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=600&fit=crop",
                color: "#EF4444"
            }
        ]
    }
    return projects[language] || projects.en
}

export function GraphicDesignSection({ language, isArabic }: GraphicDesignSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All')
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)
    const [previewProject, setPreviewProject] = useState<DesignProject | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const t = translations[language]
    const designProjects = getDesignProjects(language)

    const filteredProjects = selectedCategory === 'All'
        ? designProjects
        : designProjects.filter(project => project.category === selectedCategory)

    const categories: Category[] = ['All', 'Logo', 'Branding', 'Posters', 'Social Media', 'Packaging']

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
        }
    }

    return (
        <section className={`graphic-design-section ${isArabic ? 'rtl' : 'ltr'}`}>
            <div className="graphic-design-container">
                {/* Header */}
                <div className="graphic-design-header">
                    <div className="header-badge">
                        <Palette className="badge-icon" />
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
                        const categoryKey = category.toLowerCase().replace(' ', '') as keyof typeof t.categories
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

                {/* Design Gallery with Scroll */}
                <div className="gallery-scroll-wrapper">
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

                    <div className="gallery-scroll-container" ref={scrollContainerRef}>
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="design-card"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {/* Image */}
                                <div className="design-image-wrapper">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="design-image"
                                    />

                                    {/* Overlay */}
                                    <div className={`design-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                                        <div className="overlay-content">
                                            <span
                                                className="project-category-tag"
                                                style={{
                                                    background: `${project.color}20`,
                                                    color: project.color,
                                                    borderColor: `${project.color}40`
                                                }}
                                            >
                                                {project.category}
                                            </span>
                                            <h3 className="project-title">{project.title}</h3>
                                            <p className="project-client">
                                                <span className="client-label">Client:</span> {project.client}
                                            </p>
                                            {project.pdfUrl && (
                                                <button
                                                    className="preview-pdf-btn"
                                                    onClick={() => setPreviewProject(project)}
                                                    style={{
                                                        background: project.color,
                                                        boxShadow: `0 4px 12px ${project.color}40`
                                                    }}
                                                >
                                                    <Eye className="preview-icon" />
                                                    {t.previewPdf}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Color Accent Bar */}
                                    <div
                                        className="color-accent"
                                        style={{ background: project.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="cta-wrapper">
                    <Button className="portfolio-cta-btn">
                        <span>{t.cta}</span>
                        <ArrowRight className="cta-icon" />
                    </Button>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="background-decoration">
                <div className="decoration-mesh"></div>
            </div>

            {/* PDF Preview Modal */}
            {previewProject && previewProject.pdfUrl && (
                <div className="pdf-preview-modal" onClick={() => setPreviewProject(null)}>
                    <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="pdf-modal-header">
                            <div className="pdf-modal-title">
                                <div
                                    className="project-color-dot"
                                    style={{ background: previewProject.color }}
                                />
                                <div>
                                    <h3>{previewProject.title}</h3>
                                    <p className="modal-client">{previewProject.client}</p>
                                </div>
                            </div>
                            <button
                                className="close-modal-btn desktop-close"
                                onClick={() => setPreviewProject(null)}
                            >
                                <X />
                            </button>
                        </div>

                        {/* PDF Preview */}
                        <div className="pdf-preview-container">
                            <iframe
                                src={previewProject.pdfUrl}
                                className="pdf-iframe"
                                title={previewProject.title}
                            />
                        </div>

                        {/* Mobile Close Button at Bottom */}
                        <div className="pdf-modal-footer">
                            <button
                                className="close-preview-btn mobile-close"
                                onClick={() => setPreviewProject(null)}
                                style={{
                                    background: previewProject.color,
                                    boxShadow: `0 4px 16px ${previewProject.color}50`
                                }}
                            >
                                <X className="close-icon" />
                                {t.closePreview}
                            </button>
                            <a
                                href={previewProject.pdfUrl}
                                download
                                className="download-pdf-btn"
                                style={{
                                    borderColor: `${previewProject.color}60`,
                                    color: previewProject.color
                                }}
                            >
                                <Download className="download-icon" />
                                {t.download}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
