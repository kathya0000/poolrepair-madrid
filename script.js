// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
      if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
            });
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .feature, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Manejo del formulario de contacto
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validar campos requeridos
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');
    
    if (!nombre || !telefono) {
         alert('Por favor, completa los campos obligatorios (Nombre y Teléfono).');
        return;
    }

    // Mostrar estado de carga
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    }
    
    try {
        // Preparar datos para envío
        const contactData = {
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono'),
            email: formData.get('email') || '',
            servicio: formData.get('servicio') || '',
            mensaje: formData.get('mensaje') || ''
        };

        // Envío directo por email usando navegador
        await sendFormByEmail(contactData);
        
        // Éxito
        showNotification('¡Solicitud enviada correctamente! Te contactaremos pronto.', 'success');
        form.reset();
        
        // Enviar por WhatsApp como respaldo
        sendWhatsAppMessage(contactData);
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showNotification('Error al enviar la solicitud. Por favor, inténtalo de nuevo.', 'error');
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitud';
    }
}

// Envío directo por email usando cliente de correo del usuario
function sendFormByEmail(data) {
    return new Promise((resolve) => {
        const subject = encodeURIComponent('Nueva consulta desde web de piscinas');
        const body = encodeURIComponent(`
Nombre: ${data.nombre}
Teléfono: ${data.telefono}
Email: ${data.email || 'No proporcionado'}
Servicio de interés: ${data.servicio || 'No especificado'}
Mensaje: ${data.mensaje || 'Sin mensaje adicional'}

---
Enviado desde reparacionpiscinasmadrid.es
        `);
        
        const mailtoLink = `mailto:presupuestoonlinepiscinas@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        // Simular éxito después de abrir el cliente de email
        setTimeout(() => {
            resolve({ success: true });
        }, 500);
    });
}

// Envío por WhatsApp como método alternativo
function sendWhatsAppMessage(data) {
    const message = `Hola, soy ${data.nombre}. 
Teléfono: ${data.telefono}
${data.email ? `Email: ${data.email}` : ''}
${data.servicio ? `Servicio de interés: ${data.servicio}` : ''}
${data.mensaje ? `Mensaje: ${data.mensaje}` : ''}

Solicito información sobre sus servicios de reparación de piscinas.`;

    const whatsappUrl = `https://wa.me/34600123456?text=${encodeURIComponent(message)}`;
    
    // Mostrar opción de WhatsApp después de un momento
    setTimeout(() => {
        if (confirm('¿También quieres enviar este mensaje por WhatsApp para garantizar que lo recibamos?')) {
            window.open(whatsappUrl, '_blank');
        }
    }, 2000);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background-color: #10b981; color: white;' : ''}
        ${type === 'error' ? 'background-color: #ef4444; color: white;' : ''}
        ${type === 'info' ? 'background-color: #3b82f6; color: white;' : ''}
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Funciones de utilidad
function formatPhoneNumber(phone) {
    // Limpiar y formatear número de teléfono
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Funciones de SEO y Analytics
function trackEvent(action, category = 'General', label = '') {
    // En producción, integrar con Google Analytics
    console.log('Event tracked:', { action, category, label });
}

// Event listeners para tracking
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;
    
    if (target.href && target.href.includes('tel:')) {
        trackEvent('phone_call', 'Contact', 'Header/Footer/Floating');
    } else if (target.href && target.href.includes('wa.me')) {
        trackEvent('whatsapp_click', 'Contact', 'Header/Footer/Floating');
    } else if (target.href && target.href.includes('mailto:')) {
        trackEvent('email_click', 'Contact', 'Footer');
    }
});

// Optimización de rendimiento
function optimizePerformance() {
    // Precargar recursos críticos
    const criticalImages = [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
    optimizePerformance();
    
    // Configurar Service Worker para PWA (opcional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
});

// Funciones para páginas específicas
function initServicePage() {
    // Código específico para páginas de servicios
    const serviceCards = document.querySelectorAll('.service-detail-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.dataset.serviceId;
            trackEvent('service_detail_view', 'Services', serviceId);
        });
    });
}

function initContactPage() {
    // Código específico para página de contacto
    const emergencyButtons = document.querySelectorAll('.emergency-btn');
    emergencyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('emergency_contact', 'Contact', 'Emergency');
        });
    });
}

// Exportar funciones para uso global
window.PoolRepair = {
    showNotification,
    trackEvent,
    formatPhoneNumber,
    validateEmail,
    initServicePage,
    initContactPage
};