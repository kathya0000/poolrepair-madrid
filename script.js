// Script simplificado sin errores
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Formulario de contacto - versión ultra simple
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            
            if (!nombre || !telefono) {
                alert('Por favor, completa el nombre y teléfono');
                return;
            }
            
            // Crear email
            const subject = 'Nueva consulta desde web de piscinas';
            const body = `Nombre: ${nombre}
Teléfono: ${telefono}
Email: ${formData.get('email') || 'No proporcionado'}
Servicio: ${formData.get('servicio') || 'No especificado'}
Mensaje: ${formData.get('mensaje') || 'Sin mensaje adicional'}

---
Enviado desde reparacionpiscinasmadrid.es`;
            
            // Abrir cliente de email
            const mailtoLink = `mailto:presupuestoonlinepiscinas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink, '_blank');
            
            alert('Se abrirá tu cliente de email con los datos del formulario');
            contactForm.reset();
        });
    }

    // Smooth scroll básico
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
});
