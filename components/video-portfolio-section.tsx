'use client';

import React, { useRef, useState } from 'react';
import './video-portfolio-section.css';
import { videoProjects } from '@/data/video-projects';

type Language = 'en' | 'fr' | 'ar';

interface VideoPortfolioSectionProps {
    language: Language;
    isArabic: boolean;
}

const translations = {
    en: {
        title: 'Our Work in Videos',
        subtitle: 'Watch our creative projects come to life',
        playVideo: 'Play Video',
        getVideo: 'Get a Video Like This',
    },
    fr: {
        title: 'Notre Travail en Vidéos',
        subtitle: 'Regardez nos projets créatifs prendre vie',
        playVideo: 'Lire la Vidéo',
        getVideo: 'Obtenez une Vidéo Similaire',
    },
    ar: {
        title: 'أعمالنا بالفيديو',
        subtitle: 'شاهد مشاريعنا الإبداعية تنبض بالحياة',
        playVideo: 'تشغيل الفيديو',
        getVideo: 'احصل على فيديو مثل هذا',
    },
};

// Helper function to extract YouTube video ID from various URL formats
// Video Platform Helpers
const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const getInstagramId = (url: string): string | null => {
    if (!url) return null;
    // Supports: instagram.com/p/, instagram.com/reel/
    const regex = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const getYouTubeThumbnail = (videoUrl: string): string | null => {
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const getVideoEmbedUrl = (videoUrl: string): string | null => {
    // YouTube
    const ytId = getYouTubeId(videoUrl);
    if (ytId) {
        return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    }

    // Instagram
    const igId = getInstagramId(videoUrl);
    if (igId) {
        return `https://www.instagram.com/p/${igId}/embed`;
    }

    return null;
};

export function VideoPortfolioSection({ language, isArabic }: VideoPortfolioSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const t = translations[language];

    // Handle video card click - open video in modal
    const handleVideoClick = (videoUrl?: string) => {
        if (videoUrl) {
            setSelectedVideo(videoUrl);
        }
    };

    // Close modal
    const closeModal = () => {
        setSelectedVideo(null);
    };

    // Mouse drag scrolling
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <section className={`video-portfolio ${isArabic ? 'rtl' : 'ltr'}`} id="videos">
            <div className="video-portfolio__container">
                {/* Section Header */}
                <div className="video-portfolio__header">
                    <h2 className="video-portfolio__title">{t.title}</h2>
                    <p className="video-portfolio__subtitle">{t.subtitle}</p>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollRef}
                    className={`video-portfolio__scroll ${isDragging ? 'dragging' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="video-portfolio__cards">
                        {videoProjects.map((project) => {
                            const ytThumbnail = project.videoUrl ? getYouTubeThumbnail(project.videoUrl) : null;
                            const thumbnailSrc = ytThumbnail || project.thumbnail;

                            return (
                                <div
                                    key={project.id}
                                    className="video-card"
                                    onClick={() => handleVideoClick(project.videoUrl)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {/* Thumbnail */}
                                    <div className="video-card__thumbnail">
                                        {thumbnailSrc && thumbnailSrc !== '/images/videos/video1.jpg' ? (
                                            <img
                                                src={thumbnailSrc}
                                                alt={project.title[language]}
                                                className="video-card__image"
                                                onError={(e) => {
                                                    // Fallback to placeholder on error
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        ) : null}
                                        <div className="video-card__placeholder">
                                            <svg viewBox="0 0 360 640" fill="none">
                                                <rect width="360" height="640" fill="#1a0f3a" />
                                                <rect x="20" y="20" width="320" height="600" rx="12" fill="#290F5E" opacity="0.5" />
                                            </svg>
                                        </div>

                                        {/* Play Button */}
                                        <div className="video-card__play">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>

                                        {/* Category Badge */}
                                        <span className="video-card__category">{project.category}</span>
                                    </div>

                                    {/* Mobile Play Button */}
                                    <button className="video-card__mobile-play" aria-label={t.playVideo}>
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>

                                    {/* Hover Overlay */}
                                    <div className="video-card__overlay">
                                        <h3 className="video-card__title">{project.title[language]}</h3>
                                        <p className="video-card__description">{project.description[language]}</p>
                                        <div className="video-card__buttons">
                                            <button className="video-card__cta video-card__cta--play">
                                                {t.playVideo}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                            <a href="#contact" className="video-card__cta video-card__cta--get" onClick={(e) => e.stopPropagation()}>
                                                {t.getVideo}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order Now Button */}
                <div className="video-portfolio__order-btn-wrapper">
                    <a href="#contact" className="video-portfolio__order-btn">اطلب الان</a>
                </div>

                {/* Scroll Indicator */}
                <div className="video-portfolio__scroll-hint">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Video Modal */}
                {selectedVideo && (
                    <div className="video-modal" onClick={closeModal}>
                        <div className="video-modal__content" onClick={(e) => e.stopPropagation()}>
                            <button className="video-modal__close" onClick={closeModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="video-modal__iframe-container">
                                <iframe
                                    src={getVideoEmbedUrl(selectedVideo) || ''}
                                    title="Video Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
