window.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const btnAceptar = document.getElementById('accept-cookies');

  if (!banner || !btnAceptar) {
    console.warn("No se encontró el banner o el botón.");
    return; // No seguir si no hay elementos
  }

  if (localStorage.getItem('cookies-aceptadas') === 'true') {
    banner.style.display = 'none';
  }

  btnAceptar.addEventListener('click', () => {
    localStorage.setItem('cookies-aceptadas', 'true');
    banner.style.display = 'none';
  });
});
