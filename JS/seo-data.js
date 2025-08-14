/**
 * SEO Data Management - Structured Data for Search Engines
 * Manages JSON-LD structured data for all pages (Optimized for Clean URLs)
 */

// Business information configuration
const BUSINESS_CONFIG = {
    name: "Piscinas Madrid Reparación",
    alternateName: "Reparación de Piscinas Madrid",
    url: "https://reparacionpiscinasmadrid.es",
    telephone: "+34685155684",
    email: "presupuestoonlinepiscinas@gmail.com",
    address: {
        "@type": "PostalAddress",
        streetAddress: "c/ Los Apeaderos 34", // AÑADIDO: Dirección completa
        addressLocality: "Madrid",
        addressRegion: "Comunidad de Madrid",
        postalCode: "28290", // AÑADIDO: Código postal
        addressCountry: "ES"
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: "40.4168",
        longitude: "-3.7038"
    },
    openingHours: [
        "Mo-Fr 08:00-20:00",
        "Sa 09:00-18:00",
        "Su 00:00-23:59"
    ],
    priceRange: "$$", // AÑADIDO: Rango de precios
    image: "https://reparacionpiscinasmadrid.es/img/logo.jpg", // AÑADIDO: Imagen del negocio
    serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "40.4168",
            longitude: "-3.7038"
        },
        geoRadius: "50000"
    }
};

// Services catalog configuration (ACTUALIZADO: URLs limpias)
const SERVICES_CATALOG = {
    "servicio-gresite": {
        name: "Instalación y Reparación de Gresite",
        description: "Instalación profesional de gresite para piscinas y reparación de azulejos dañados",
        url: "servicio-gresite"
    },
    "servicio-impermeabilizacion": {
        name: "Impermeabilización de Piscinas",
        description: "Sellado y impermeabilización profesional para evitar filtraciones",
        url: "servicio-impermeabilizacion"
    },
    "servicio-fugas": {
        name: "Reparación de Fugas",
        description: "Detección y reparación de fugas en piscinas con tecnología avanzada",
        url: "servicio-fugas"
    },
    "servicio-recuperacion-agua": {
        name: "Recuperación de Agua Verde",
        description: "Tratamiento profesional para recuperar agua verdes en aguas cristalina en piscinas",
        url: "servicio-recuperacion-agua"
    },
    "servicio-rehabilitacion": {
        name: "Rehabilitación de Piscinas",
        description: "Renovación completa de piscinas antiguas o dañadas",
        url: "servicio-rehabilitacion"
    },
    "servicio-subacuatica": {
        name: "Reparación Subacuática",
        description: "Reparaciones especializadas bajo el agua sin vaciar la piscina",
        url: "servicio-subacuatica"
    }
};

// Páginas adicionales
const OTHER_PAGES = {
    "servicios": {
        name: "Nuestros Servicios",
        description: "Todos nuestros servicios de reparación y mantenimiento de piscinas en Madrid"
    },
    "contacto": {
        name: "Contacto",
        description: "Solicite presupuesto para reparación de piscinas en Madrid"
    },
    "politica-cookies": {
        name: "Política de Cookies",
        description: "Política de cookies de Reparación Piscinas Madrid"
    }
};

/**
 * Generate JSON-LD structured data for home page
 */
function generateHomePageStructuredData() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: BUSINESS_CONFIG.name,
        alternateName: BUSINESS_CONFIG.alternateName,
        description: "Servicios profesionales de reparación de piscinas en Madrid y Comunidad. Especialistas en gresite, impermeabilización, fugas y reparaciones subacuáticas.",
        url: BUSINESS_CONFIG.url,
        telephone: BUSINESS_CONFIG.telephone,
        email: BUSINESS_CONFIG.email,
        address: BUSINESS_CONFIG.address,
        geo: BUSINESS_CONFIG.geo,
        openingHours: BUSINESS_CONFIG.openingHours,
        priceRange: BUSINESS_CONFIG.priceRange,
        image: BUSINESS_CONFIG.image,
        serviceArea: BUSINESS_CONFIG.serviceArea,
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servicios de Reparación de Piscinas",
            itemListElement: Object.values(SERVICES_CATALOG).map(service => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: service.name,
                    description: service.description,
                    url: `${BUSINESS_CONFIG.url}/${service.url}`
                }
            }))
        }
    };
}

/**
 * Generate JSON-LD structured data for service pages
 */
function generateServicePageStructuredData(serviceName, serviceDescription, serviceUrl) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        description: serviceDescription,
        url: `${BUSINESS_CONFIG.url}/${serviceUrl}`,
        provider: {
            "@type": "LocalBusiness",
            name: BUSINESS_CONFIG.name,
            telephone: BUSINESS_CONFIG.telephone,
            email: BUSINESS_CONFIG.email,
            address: BUSINESS_CONFIG.address,
            geo: BUSINESS_CONFIG.geo,
            image: BUSINESS_CONFIG.image
        },
        areaServed: {
            "@type": "Place",
            name: "Madrid y Comunidad de Madrid"
        },
        offers: {
            "@type": "Offer",
            priceRange: BUSINESS_CONFIG.priceRange
        }
    };
}

/**
 * Generate JSON-LD for informational pages
 */
function generateInfoPageStructuredData(pageName, pageDescription) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageName,
        description: pageDescription,
        publisher: {
            "@type": "LocalBusiness",
            name: BUSINESS_CONFIG.name
        }
    };
}

/**
 * Generate breadcrumb structured data
 */
function generateBreadcrumbData(currentPage, currentTitle) {
    const breadcrumbs = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: BUSINESS_CONFIG.url
        }
    ];

    if (currentPage && currentTitle) {
        // Agregar página de servicios si es una página de servicio
        if (Object.keys(SERVICES_CATALOG).includes(currentPage)) {
            breadcrumbs.push({
                "@type": "ListItem",
                position: 2,
                name: "Servicios",
                item: `${BUSINESS_CONFIG.url}/servicios`
            });
        }
        
        breadcrumbs.push({
            "@type": "ListItem",
            position: breadcrumbs.length + 1,
            name: currentTitle,
            item: `${BUSINESS_CONFIG.url}/${currentPage}`
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs
    };
}

/**
 * Insert structured data into page head
 */
function insertStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
}

/**
 * Initialize SEO data based on current page
 */
function initializeSEOData() {
    const pathParts = window.location.pathname.split('/').filter(part => part);
    // Extraer la última parte de la URL y eliminar la extensión .html si existe
    const currentPageRaw = pathParts[pathParts.length - 1] || 'index';
    const currentPage = currentPageRaw.replace(/\.html$/, '');
    
    // Home page
    if (currentPage === 'index' || currentPage === '') {
        const homeData = generateHomePageStructuredData();
        insertStructuredData(homeData);
        return;
    }

    // Service pages
    if (SERVICES_CATALOG[currentPage]) {
        const service = SERVICES_CATALOG[currentPage];
        const serviceData = generateServicePageStructuredData(
            service.name, 
            service.description,
            service.url
        );
        insertStructuredData(serviceData);

        // Add breadcrumbs for service pages
        const breadcrumbData = generateBreadcrumbData(currentPage, service.name);
        insertStructuredData(breadcrumbData);
        return;
    }

    // Informational pages
    if (OTHER_PAGES[currentPage]) {
        const page = OTHER_PAGES[currentPage];
        const pageData = generateInfoPageStructuredData(
            page.name,
            page.description
        );
        insertStructuredData(pageData);
        
        // Add breadcrumbs for informational pages
        const breadcrumbData = generateBreadcrumbData(currentPage, page.name);
        insertStructuredData(breadcrumbData);
        return;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSEOData();
    
    // Agregar canonical y hreflang dinámicamente
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href.split('?')[0];
    document.head.appendChild(canonicalLink);
    
    const hreflangLink = document.createElement('link');
    hreflangLink.rel = 'alternate';
    hreflangLink.hreflang = 'es-ES';
    hreflangLink.href = window.location.href.split('?')[0];
    document.head.appendChild(hreflangLink);
});

// Export for manual usage if needed
window.SEOData = {
    generateHomePageStructuredData,
    generateServicePageStructuredData,
    generateInfoPageStructuredData,
    generateBreadcrumbData,
    insertStructuredData,
    BUSINESS_CONFIG,
    SERVICES_CATALOG,
    OTHER_PAGES
};