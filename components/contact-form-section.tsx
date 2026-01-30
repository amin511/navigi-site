"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Mail,
    Phone,
    User,
    MessageSquare,
    Send,
    CheckCircle2,
    Briefcase
} from "lucide-react"
import "./contact-form-section.css"

type Language = 'en' | 'fr' | 'ar'

interface ContactFormSectionProps {
    language: Language
    isArabic: boolean
}

const translations = {
    en: {
        badge: 'Get In Touch',
        title: 'Ready to Start Your Project?',
        description: 'Fill out the form below and we\'ll get back to you shortly',
        fields: {
            name: 'Full Name',
            namePlaceholder: 'John Doe',
            phone: 'Phone Number',
            phonePlaceholder: '+1 234 567 8900',
            email: 'Email Address',
            emailPlaceholder: 'john@example.com',
            service: 'Service(s) Needed',
            servicePlaceholder: 'Select one or more services',
            message: 'Project Description',
            messagePlaceholder: 'Tell us about your project...'
        },
        services: {
            identityVisual: 'Visual Identity',
            logo: 'Logo Design',
            videoEditing: 'Video Editing',
            websiteCreation: 'Website Creation',
            siteVitrine: 'Showcase Website',
            ecommerce: 'E-commerce Site',
            customWebsite: 'Custom Website',
            facebookAds: 'Facebook Ads',
            tiktokAds: 'TikTok Ads',
            googleAds: 'Google Ads',
            consultingSponsors: 'Ad Consulting',
            consultation: 'General Consultation'
        },
        submitButton: 'Send',
        submitting: 'Sending...',
        successMessage: 'Thank you! We have received your request. We will call you soon.',
        errorMessage: 'Oops! Something went wrong. Please try again.'
    },
    fr: {
        badge: 'Contactez-nous',
        title: 'Prêt à Démarrer Votre Projet ?',
        description: 'Remplissez le formulaire ci-dessous et nous vous répondrons rapidement',
        fields: {
            name: 'Nom Complet',
            namePlaceholder: 'Jean Dupont',
            phone: 'Numéro de Téléphone',
            phonePlaceholder: '+33 6 12 34 56 78',
            email: 'Adresse Email',
            emailPlaceholder: 'jean@exemple.fr',
            service: 'Service(s) Souhaité(s)',
            servicePlaceholder: 'Sélectionnez un ou plusieurs services',
            message: 'Description du Projet',
            messagePlaceholder: 'Parlez-nous de votre projet...'
        },
        services: {
            identityVisual: 'Identité Visuelle',
            logo: 'Design de Logo',
            videoEditing: 'Montage Vidéo',
            websiteCreation: 'Création de Site Web',
            siteVitrine: 'Site Vitrine',
            ecommerce: 'Site E-commerce',
            customWebsite: 'Site Web Sur Mesure',
            facebookAds: 'Publicités Facebook',
            tiktokAds: 'Publicités TikTok',
            googleAds: 'Publicités Google',
            consultingSponsors: 'Conseil en Publicité',
            consultation: 'Consultation Générale'
        },
        submitButton: 'Envoyer',
        submitting: 'Envoi en cours...',
        successMessage: 'Merci ! Nous avons reçu votre demande. Nous allons vous appeler bientôt.',
        errorMessage: 'Oups ! Une erreur s\'est produite. Veuillez réessayer.'
    },
    ar: {
        badge: 'تواصل معنا',
        title: 'هل أنت مستعد لبدء مشروعك؟',
        description: 'املأ النموذج أدناه وسنتواصل معك قريباً',
        fields: {
            name: 'الاسم الكامل',
            namePlaceholder: 'أحمد محمد',
            phone: 'رقم الهاتف',
            phonePlaceholder: '+966 50 123 4567',
            email: 'البريد الإلكتروني',
            emailPlaceholder: 'ahmed@example.com',
            service: 'الخدمة (الخدمات) المطلوبة',
            servicePlaceholder: 'اختر خدمة واحدة أو أكثر',
            message: 'وصف المشروع',
            messagePlaceholder: 'أخبرنا عن مشروعك...'
        },
        services: {
            identityVisual: 'الهوية البصرية',
            logo: 'تصميم شعار',
            videoEditing: 'مونتاج فيديو',
            websiteCreation: 'إنشاء موقع ويب',
            siteVitrine: 'موقع تعريفي',
            ecommerce: 'موقع تجارة إلكترونية',
            customWebsite: 'موقع مخصص',
            facebookAds: 'إعلانات فيسبوك',
            tiktokAds: 'إعلانات تيك توك',
            googleAds: 'إعلانات جوجل',
            consultingSponsors: 'استشارات إعلانية',
            consultation: 'استشارة عامة'
        },
        submitButton: 'إرسال',
        submitting: 'جاري الإرسال...',
        successMessage: 'شكراً لك! لقد تلقينا طلبك. سنتصل بك قريباً.',
        errorMessage: 'عذراً! حدث خطأ ما. يرجى المحاولة مرة أخرى.'
    }
}

export function ContactFormSection({ language, isArabic }: ContactFormSectionProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        services: [] as string[],
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const t = translations[language]

    const serviceOptions = [
        { value: 'identityVisual', label: t.services.identityVisual },
        { value: 'logo', label: t.services.logo },
        { value: 'videoEditing', label: t.services.videoEditing },
        { value: 'websiteCreation', label: t.services.websiteCreation },
        { value: 'siteVitrine', label: t.services.siteVitrine },
        { value: 'ecommerce', label: t.services.ecommerce },
        { value: 'customWebsite', label: t.services.customWebsite },
        { value: 'facebookAds', label: t.services.facebookAds },
        { value: 'tiktokAds', label: t.services.tiktokAds },
        { value: 'googleAds', label: t.services.googleAds },
        { value: 'consultingSponsors', label: t.services.consultingSponsors },
        { value: 'consultation', label: t.services.consultation }
    ]

    const handleServiceToggle = (serviceValue: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(serviceValue)
                ? prev.services.filter(s => s !== serviceValue)
                : [...prev.services, serviceValue]
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setShowError(false)

        try {
            // Simuler l'envoi du formulaire
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Afficher le message de succès
            setShowSuccess(true)

            // Réinitialiser le formulaire
            setFormData({
                name: '',
                phone: '',
                email: '',
                services: [],
                message: ''
            })

            // Masquer le message après 5 secondes
            setTimeout(() => {
                setShowSuccess(false)
            }, 5000)
        } catch (error) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 5000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className={`contact-form-section ${isArabic ? 'rtl' : 'ltr'}`}>
            <div className="contact-container">
                {/* Header */}
                <div className="contact-header">
                    <div className="header-badge">
                        <Mail className="badge-icon" />
                        <span>{t.badge}</span>
                    </div>
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-description">{t.description}</p>
                </div>

                {/* Form */}
                <form className="contact-form" onSubmit={handleSubmit}>
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="success-message">
                            <CheckCircle2 className="success-icon" />
                            <p>{t.successMessage}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {showError && (
                        <div className="error-message">
                            <p>{t.errorMessage}</p>
                        </div>
                    )}

                    {/* Name & Phone Row */}
                    <div className="form-row">
                        {/* Full Name */}
                        <div className="form-group">
                            <label className="form-label">
                                <User className="label-icon" />
                                {t.fields.name}
                            </label>
                            <div className={`input-wrapper ${focusedField === 'name' ? 'focused' : ''}`}>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder={t.fields.namePlaceholder}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="form-group">
                            <label className="form-label">
                                <Phone className="label-icon" />
                                {t.fields.phone}
                            </label>
                            <div className={`input-wrapper ${focusedField === 'phone' ? 'focused' : ''}`}>
                                <input
                                    type="tel"
                                    className="form-input"
                                    placeholder={t.fields.phonePlaceholder}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label">
                            <Mail className="label-icon" />
                            {t.fields.email}
                        </label>
                        <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
                            <input
                                type="email"
                                className="form-input"
                                placeholder={t.fields.emailPlaceholder}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                    </div>

                    {/* Services Multi-Select */}
                    <div className="form-group">
                        <label className="form-label">
                            <Briefcase className="label-icon" />
                            {t.fields.service}
                        </label>
                        <div className="services-grid">
                            {serviceOptions.map((service) => (
                                <button
                                    key={service.value}
                                    type="button"
                                    className={`service-chip ${formData.services.includes(service.value) ? 'active' : ''}`}
                                    onClick={() => handleServiceToggle(service.value)}
                                >
                                    <span className="chip-checkmark">✓</span>
                                    {service.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                        <label className="form-label">
                            <MessageSquare className="label-icon" />
                            {t.fields.message}
                        </label>
                        <div className={`input-wrapper ${focusedField === 'message' ? 'focused' : ''}`}>
                            <textarea
                                className="form-textarea"
                                placeholder={t.fields.messagePlaceholder}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                rows={5}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="spinner" />
                                {t.submitting}
                            </>
                        ) : (
                            <>
                                <span>{t.submitButton}</span>
                                <Send className="submit-icon" />
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Background Decoration */}
            <div className="background-decoration">
                <div className="decoration-blur decoration-blur-1"></div>
                <div className="decoration-blur decoration-blur-2"></div>
            </div>
        </section>
    )
}
