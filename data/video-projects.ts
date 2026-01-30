// Video Portfolio Data - Edit this file to add/update videos
// Add your video information here and it will automatically appear in the section

export interface VideoProject {
    id: number;
    thumbnail: string; // Path to thumbnail image (e.g., '/images/videos/video1.jpg')
    videoUrl?: string; // Optional: YouTube/Vimeo URL or local video path
    title: {
        en: string;
        fr: string;
        ar: string;
    };
    description: {
        en: string;
        fr: string;
        ar: string;
    };
    category: string;
}
export const videoProjects: VideoProject[] = [
    // ===== VIDEO 1 : Motion Explainer =====
    {
        id: 1,
        thumbnail: '',
        videoUrl: 'https://youtube.com/shorts/w3nSxWdpYCk?feature=share',
        title: {
            en: 'Motion Explainer for Business Growth',
            fr: 'Motion Explicatif pour la Croissance des Entreprises',
            ar: 'موشن إكسبلاينر لنمو الأعمال',
        },
        description: {
            en: 'Explainer motion video designed to communicate business growth concepts clearly.',
            fr: 'Vidéo motion explicative conçue pour expliquer la croissance des entreprises.',
            ar: 'فيديو موشن يشرح مفاهيم نمو الأعمال بطريقة واضحة.',
        },
        category: 'Motion Explainer',
    },

    // ===== VIDEO 2 : Visual Text Animation =====
    {
        id: 2,
        thumbnail: '/api/placeholder/640/360',
        videoUrl: 'https://youtube.com/shorts/hKVbCqWAZh0?feature=share',
        title: {
            en: 'Visual Animation with Dynamic Text',
            fr: 'Animation Visuelle avec Texte Dynamique',
            ar: 'فيديو بصري مع تحريك النصوص',
        },
        description: {
            en: 'Visually engaging animation combining dynamic text and attractive visuals.',
            fr: 'Animation visuelle combinant نصوص متحركة وتصميم جذاب.',
            ar: 'فيديو بصري يجمع بين تحريك النصوص والتصميم الجذاب.',
        },
        category: 'Visual Motion',
    },

    // ===== VIDEO 3 : Drone Video =====
    {
        id: 3,
        thumbnail: '/images/videos/video3.jpg',
        videoUrl: 'https://youtube.com/shorts/YfWdgILuEZg',
        title: {
            en: 'Aerial Drone Video with Cinematic Editing',
            fr: 'Vidéo Drone Aérienne avec Montage Cinématographique',
            ar: 'فيديو درون جوي مع مونتاج سينمائي',
        },
        description: {
            en: 'Professional aerial drone footage enhanced with cinematic post-production.',
            fr: 'تصوير درون احترافي مع مونتاج سينمائي عالي الجودة.',
            ar: 'تصوير جوي بالدرون مع معالجة سينمائية احترافية.',
        },
        category: 'Drone',
    },

    // ===== VIDEO 4 : Advertising Motion =====
    {
        id: 4,
        thumbnail: '/images/videos/video4.jpg',
        videoUrl: 'https://youtube.com/shorts/SFdXoQ6CEGA',
        title: {
            en: 'Advertising Motion Video',
            fr: 'Vidéo Motion Publicitaire',
            ar: 'فيديو موشن إعلاني',
        },
        description: {
            en: 'Creative motion video designed for advertising and promotional campaigns.',
            fr: 'Vidéo motion créative destinée aux campagnes publicitaires.',
            ar: 'فيديو موشن إبداعي مخصص للإعلانات والحملات الترويجية.',
        },
        category: 'Advertising',
    },

    // ===== VIDEO 5 : Publicité École/Académie =====
    {
        id: 5,
        thumbnail: '/images/videos/video5.jpg',
        videoUrl: 'https://youtube.com/shorts/g2h4hPg_3WE?feature=share',
        title: {
            en: 'Academy Promotional Video',
            fr: 'Vidéo Publicitaire pour Académie',
            ar: 'فيديو إعلاني لأكاديمية تعليمية',
        },
        description: {
            en: 'Professional promotional video showcasing an educational academy and its services.',
            fr: 'Vidéo publicitaire professionnelle présentant une académie éducative et ses services.',
            ar: 'فيديو إعلاني احترافي يعرض أكاديمية تعليمية وخدماتها.',
        },
        category: 'Advertising',
    },

    // ===== VIDEO 6 : Animation / Motion Design =====

];


// export const videoProjects: VideoProject[] = [
//     // ===== VIDEO 1 =====
//     {
//         id: 1,
//         thumbnail: '', // Leave empty to auto-fetch from YouTube
//         videoUrl: 'https://youtube.com/shorts/hKVbCqWAZh0?feature=share', // User provided Short
//         title: {
//             en: 'Brand Launch Campaign',
//             fr: 'Campagne de Lancement',
//             ar: 'حملة إطلاق العلامة',
//         },
//         description: {
//             en: 'A stunning visual journey',
//             fr: 'Un voyage visuel époustouflant',
//             ar: 'رحلة بصرية مذهلة',
//         },
//         category: 'Branding',
//     },

//     // ===== VIDEO 2 =====
//     {
//         id: 2,
//         thumbnail: '/api/placeholder/640/360', // Instagram requires manual thumbnail
//         // videoUrl: 'https://www.instagram.com/p/DL-S92kSugN/', // User provided Instagram Post
//         videoUrl: 'https://youtube.com/shorts/w3nSxWdpYCk?feature=share', // No video URL provided
//         title: {
//             en: 'Product Showcase',
//             fr: 'Vitrine Produit',
//             ar: 'عرض المنتج',
//         },
//         description: {
//             en: 'Elegant product presentation',
//             fr: 'Présentation élégante du produit',
//             ar: 'عرض أنيق للمنتج',
//         },
//         category: 'Commercial',
//     },

//     // ===== VIDEO 3 =====
//     {
//         id: 3,
//         thumbnail: '/images/videos/video3.jpg',
//         videoUrl: 'https://youtube.com/shorts/g2h4hPg_3WE?feature=share',
//         title: {
//             en: 'Corporate Story',
//             fr: "Histoire d'Entreprise",
//             ar: 'قصة الشركة',
//         },
//         description: {
//             en: 'Telling your brand story',
//             fr: "Raconter l'histoire de votre marque",
//             ar: 'سرد قصة علامتك التجارية',
//         },
//         category: 'Documentary',
//     },

//     // ===== VIDEO 4 =====
//     {
//         id: 4,
//         thumbnail: '/images/videos/video4.jpg',
//         videoUrl: 'https://youtube.com/shorts/SFdXoQ6CEGA',
//         title: {
//             en: 'Social Media Reel',
//             fr: 'Bobine Réseaux Sociaux',
//             ar: 'فيديو وسائل التواصل',
//         },
//         description: {
//             en: 'Viral-worthy content',
//             fr: 'Contenu viral',
//             ar: 'محتوى يستحق الانتشار',
//         },
//         category: 'Social',
//     },

//     // ===== VIDEO 5 =====
//     {
//         id: 5,
//         thumbnail: '/images/videos/video5.jpg',
//         videoUrl: '',
//         title: {
//             en: 'Event Highlights',
//             fr: "Moments Forts de l'Événement",
//             ar: 'أبرز لحظات الحدث',
//         },
//         description: {
//             en: 'Capturing memorable moments',
//             fr: 'Capturer des moments mémorables',
//             ar: 'التقاط اللحظات التي لا تُنسى',
//         },
//         category: 'Events',
//     },

//     // ===== VIDEO 6 =====
//     {
//         id: 6,
//         thumbnail: '/images/videos/video6.jpg',
//         videoUrl: '',
//         title: {
//             en: 'Animation Project',
//             fr: "Projet d'Animation",
//             ar: 'مشروع الرسوم المتحركة',
//         },
//         description: {
//             en: 'Creative motion graphics',
//             fr: 'Motion graphics créatif',
//             ar: 'رسوم متحركة إبداعية',
//         },
//         category: 'Animation',
//     },

//     // ===== ADD MORE VIDEOS BELOW =====
//     // Copy the template below and fill in your details:
//     /*
//     {
//       id: 7,
//       thumbnail: '/images/videos/video7.jpg',
//       videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
//       title: {
//         en: 'Your Title in English',
//         fr: 'Votre Titre en Français',
//         ar: 'عنوانك بالعربية',
//       },
//       description: {
//         en: 'Description in English',
//         fr: 'Description en Français',
//         ar: 'الوصف بالعربية',
//       },
//       category: 'Category Name',
//     },
//     */
// ];
