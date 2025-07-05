/**
 * SEO Data Management - Structured Data for Search Engines
 * Manages JSON-LD structured data for all pages
 */

// Business information configuration
const BUSINESS_CONFIG = {
    name: "Piscinas Madrid Reparación",
    alternateName: "Reparación de Piscinas Madrid",
    url: "https://reparacionpiscinasmadrid.es",
    telephone: "+34600123456",
    email: "presupuestoonlinepiscinas@gmail.com",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Madrid",
        addressRegion: "Comunidad de Madrid",
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

// Services catalog configuration
const SERVICES_CATALOG = {
    "gresite": {
        name: "Instalación y Reparación de Gresite",
        description: "Instalación profesional de gresite para piscinas y reparación de azulejos dañados",
        url: "servicio-gresite.html"
    },
    "impermeabilizacion": {
        name: "Impermeabilización de Piscinas",
        description: "Sellado y impermeabilización profesional para evitar filtraciones",
        url: "servicio-impermeabilizacion.html"
    },
    "fugas": {
        name: "Reparación de Fugas",
        description: "Detección y reparación de fugas en piscinas con tecnología avanzada",
        url: "servicio-fugas.html"
    },
    "recuperacion": {
        name: "Recuperación de Agua Verde",
        description: "Tratamiento profesional para recuperar agua verdes en aguas cristalina en piscinas",
        url: "servicio-recuperacion-agua.html"
    },
    "rehabilitacion": {
        name: "Rehabilitación de Piscinas",
        description: "Renovación completa de piscinas antiguas o dañadas",
        url: "servicio-rehabilitacion.html"
    },
    "subacuatica": {
        name: "Reparación Subacuática",
        description: "Reparaciones especializadas bajo el agua sin vaciar la piscina",
        url: "servicio-subacuatica.html"
    }
};

/**
 * Generate JSON-LD structured data for home page
 */
function generateHomePageStructuredData() {
    const structuredData = {
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
        serviceArea: BUSINESS_CONFIG.serviceArea,
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servicios de Reparación de Piscinas",
            itemListElement: Object.values(SERVICES_CATALOG).map(service => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: service.name,
                    description: service.description
                }
            }))
        }
    };

    return structuredData;
}

/**
 * Generate JSON-LD structured data for service pages
 */
function generateServicePageStructuredData(serviceName, serviceDescription) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        description: serviceDescription,
        provider: {
            "@type": "LocalBusiness",
            name: BUSINESS_CONFIG.name,
            telephone: BUSINESS_CONFIG.telephone,
            email: BUSINESS_CONFIG.email,
            address: BUSINESS_CONFIG.address,
            geo: BUSINESS_CONFIG.geo
        },
        areaServed: {
            "@type": "Place",
            name: "Madrid y Comunidad de Madrid"
        }
    };

    return structuredData;
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
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: `${BUSINESS_CONFIG.url}/servicios.html`
        }
    ];

    if (currentPage && currentTitle) {
        breadcrumbs.push({
            "@type": "ListItem",
            position: 3,
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
    const currentPage = window.location.pathname.split('/').pop();
    
    // Home page
    if (currentPage === 'index.html' || currentPage === '') {
        const homeData = generateHomePageStructuredData();
        insertStructuredData(homeData);
        return;
    }

    // Service pages
    const serviceKey = Object.keys(SERVICES_CATALOG).find(key => 
        currentPage.includes(key)
    );

    if (serviceKey) {
        const service = SERVICES_CATALOG[serviceKey];
        const serviceData = generateServicePageStructuredData(
            service.name, 
            service.description
        );
        insertStructuredData(serviceData);

        // Add breadcrumbs for service pages
        const breadcrumbData = generateBreadcrumbData(currentPage, service.name);
        insertStructuredData(breadcrumbData);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSEOData();
});

// Export for manual usage if needed
window.SEOData = {
    generateHomePageStructuredData,
    generateServicePageStructuredData,
    generateBreadcrumbData,
    insertStructuredData,
    BUSINESS_CONFIG,
    SERVICES_CATALOG
};