(function() {
    'use strict';
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            
            if (!nombre || !telefono) {
                alert('Por favor, completa el nombre y teléfono');
                return;
            }
            
            const subject = 'Nueva consulta desde web de piscinas';
            const body = `Nombre: ${nombre}
Teléfono: ${telefono}
Email: ${formData.get('email') || 'No proporcionado'}
Servicio: ${formData.get('servicio') || 'No especificado'}
Mensaje: ${formData.get('mensaje') || 'Sin mensaje adicional'}

---
Enviado desde reparacionpiscinasmadrid.es`;
            
            const mailtoLink = `mailto:presupuestoonlinepiscinas@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink, '_blank');
            
            alert('Se abrirá tu cliente de email con los datos del formulario');
            form.reset();
        });
    }
    
    function initMobileNav() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initContactForm();
            initMobileNav();
        });
    } else {
        initContactForm();
        initMobileNav();
    }
})();