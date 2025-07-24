window.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const btnAceptar = document.getElementById('accept-cookies');

  // Si ya aceptó las cookies, ocultamos el banner
  if (localStorage.getItem('cookies-aceptadas') === 'true') {
    banner.style.display = 'none';
  }

  // Si hace clic en "Aceptar"
  btnAceptar.addEventListener('click', () => {
    localStorage.setItem('cookies-aceptadas', 'true');
    banner.style.display = 'none';
  });
});
