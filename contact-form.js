(function() {
    'use strict';
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            
            if (!nombre || !telefono) {
                alert('Por favor, completa el nombre y teléfono');
                return;
            }
            
            // Mostrar estado de carga
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            try {
                const response = await fetch('send-email.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                    form.reset();
                } else {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            } finally {
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
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
    
    // Inicializar cuando el DOM esté listo
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