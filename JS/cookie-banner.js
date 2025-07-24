window.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const btnAceptar = document.getElementById('accept-cookies');
  const btnRechazar = document.getElementById('reject-cookies');
  const btnCerrar = document.getElementById('close-banner');

  // Si ya aceptó o rechazó las cookies, ocultamos el banner
  if (localStorage.getItem('cookies-aceptadas') === 'true' ||
      localStorage.getItem('cookies-rechazadas') === 'true') {
    banner.style.display = 'none';
  }

  btnAceptar?.addEventListener('click', () => {
    localStorage.setItem('cookies-aceptadas', 'true');
    banner.style.display = 'none';
  });

  btnRechazar?.addEventListener('click', () => {
    localStorage.setItem('cookies-rechazadas', 'true');
    banner.style.display = 'none';
  });

  btnCerrar?.addEventListener('click', () => {
    banner.style.display = 'none';
    // No guarda nada en localStorage
  });
});
