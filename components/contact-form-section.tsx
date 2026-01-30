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
    Briefcase,
    Palette,
    Code,
    Megaphone,
    Video
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
        categories: {
            design: 'Design',
            webDevelopment: 'Web Development',
            advertising: 'Advertising',
            videoEditing: 'Video Editing'
        },
        services: {
            identityVisual: 'Visual Identity',
            logo: 'Logo Design',
            siteVitrine: 'Showcase Website',
            ecommerce: 'E-commerce Site',
            customWebsite: 'Custom Website',
            facebookAds: 'Facebook Ads',
            tiktokAds: 'TikTok Ads',
            googleAds: 'Google Ads',
            consultingSponsors: 'Ad Consulting',
            videoEditing: 'Video Editing',
            consultation: 'General Consultation'
        },
        submitButton: 'Send Message',
        submitting: 'Sending...',
        successMessage: 'Thank you! We have received your request. We will contact you soon.',
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
        categories: {
            design: 'Design',
            webDevelopment: 'Développement Web',
            advertising: 'Publicité',
            videoEditing: 'Montage Vidéo'
        },
        services: {
            identityVisual: 'Identité Visuelle',
            logo: 'Design de Logo',
            siteVitrine: 'Site Vitrine',
            ecommerce: 'Site E-commerce',
            customWebsite: 'Site Web Sur Mesure',
            facebookAds: 'Publicités Facebook',
            tiktokAds: 'Publicités TikTok',
            googleAds: 'Publicités Google',
            consultingSponsors: 'Conseil en Publicité',
            videoEditing: 'Montage Vidéo',
            consultation: 'Consultation Générale'
        },
        submitButton: 'Envoyer le Message',
        submitting: 'Envoi en cours...',
        successMessage: 'Merci ! Nous avons reçu votre demande. Nous vous contacterons bientôt.',
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
        categories: {
            design: 'التصميم',
            webDevelopment: 'تطوير المواقع',
            advertising: 'الإعلانات',
            videoEditing: 'مونتاج الفيديو'
        },
        services: {
            identityVisual: 'الهوية البصرية',
            logo: 'تصميم شعار',
            siteVitrine: 'موقع تعريفي',
            ecommerce: 'موقع تجارة إلكترونية',
            customWebsite: 'موقع مخصص',
            facebookAds: 'إعلانات فيسبوك',
            tiktokAds: 'إعلانات تيك توك',
            googleAds: 'إعلانات جوجل',
            consultingSponsors: 'استشارات إعلانية',
            videoEditing: 'مونتاج فيديو',
            consultation: 'استشارة عامة'
        },
        submitButton: 'إرسال الرسالة',
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

    // Organized service categories
    const serviceCategories = [
        {
            category: 'design',
            icon: Palette,
            services: [
                { value: 'identityVisual', label: t.services.identityVisual },
                { value: 'logo', label: t.services.logo }
            ]
        },
        {
            category: 'webDevelopment',
            icon: Code,
            services: [
                { value: 'siteVitrine', label: t.services.siteVitrine },
                { value: 'ecommerce', label: t.services.ecommerce },
                { value: 'customWebsite', label: t.services.customWebsite }
            ]
        },
        {
            category: 'advertising',
            icon: Megaphone,
            services: [
                { value: 'facebookAds', label: t.services.facebookAds },
                { value: 'tiktokAds', label: t.services.tiktokAds },
                { value: 'googleAds', label: t.services.googleAds },
                { value: 'consultingSponsors', label: t.services.consultingSponsors }
            ]
        },
        {
            category: 'videoEditing',
            icon: Video,
            services: [
                { value: 'videoEditing', label: t.services.videoEditing },
                { value: 'consultation', label: t.services.consultation }
            ]
        }
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
            // Get selected service labels
            const selectedServiceLabels = formData.services.map(serviceValue => {
                for (const category of serviceCategories) {
                    const service = category.services.find(s => s.value === serviceValue)
                    if (service) return service.label
                }
                return serviceValue
            })

            // Prepare data for Google Sheets
            const submissionData = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                services: selectedServiceLabels.join(', '),
                message: formData.message,
                timestamp: new Date().toISOString(),
                language: language
            }

            // Submit to Google Sheets
            // Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' with your actual deployment URL
            const response = await fetch('https://script.google.com/macros/s/AKfycbyXoQrk-QeXwRi8DTaNzMs6lf66m7k_22qB9ntzjUO4LisYUi7RyasDV_RQVr414bkN/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            })

            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Parse the response
            const result = await response.json()
            console.log('Submission response:', result)

            // Check if the result indicates success
            if (result.result === 'error') {
                throw new Error(result.error || 'Unknown error occurred')
            }

            // Show success message
            setShowSuccess(true)

            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                services: [],
                message: ''
            })

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false)
            }, 5000)
        } catch (error) {
            console.error('Submission error:', error)
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

                    {/* Services Multi-Select - Organized by Categories */}
                    <div className="form-group">
                        <label className="form-label">
                            <Briefcase className="label-icon" />
                            {t.fields.service}
                        </label>

                        <div className="services-categories">
                            {serviceCategories.map((category) => {
                                const CategoryIcon = category.icon
                                return (
                                    <div key={category.category} className="service-category">
                                        <div className="category-header">
                                            <CategoryIcon className="category-icon" />
                                            <h4 className="category-title">{t.categories[category.category as keyof typeof t.categories]}</h4>
                                        </div>
                                        <div className="category-services">
                                            {category.services.map((service) => (
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
                                )
                            })}
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