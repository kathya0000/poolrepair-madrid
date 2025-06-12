# PoolRepair Madrid - Sitio Web
Sitio web profesional para servicios de reparación de piscinas en Madrid.
## Características
- ✅ Sitio web estático (HTML/CSS/JS)
- ✅ Diseño responsive
- ✅ SEO optimizado para Madrid
- ✅ Formularios de contacto con WhatsApp
- ✅ CSS modular organizado
- ✅ Compatible con todos los servidores web
## Estructura de Archivos
├── index.html          # Página principal
├── servicios.html      # Lista de servicios
├── contacto.html       # Página de contacto
├── servicio-*.html     # Páginas individuales de servicios
├── styles.css          # CSS principal (imports)
├── script.js           # JavaScript principal
└── css/               # Módulos CSS separados
    ├── base.css
    ├── components.css
    ├── contact.css
    ├── forms.css
    ├── layout.css
    ├── navigation.css
    ├── services.css
    ├── sidebar.css
    └── utilities.css
```
## Deployment en Hostinger
### Opción 1: Via GitHub (Recomendado)
## 🔧 Personalización
1. **Crear repositorio en GitHub:**
   - Sube la carpeta `export/` como raíz del repositorio
   - Asegúrate que `index.html` esté en la raíz
### Cambiar Información de Contacto
2. **Conectar con Hostinger:**
   - Ve a hPanel → Git → Create New
   - Conecta tu repositorio de GitHub
   - Branch: `main` o `master`
   - Deploy path: `public_html`
Busca y reemplaza en todos los archivos HTML:
- `+34 600 123 456` → Tu número de teléfono
- `info@poolrepairmadrid.com` → Tu email
- `PoolRepair Madrid` → El nombre de tu empresa
3. **Auto-deployment:**
   - Cada push a GitHub actualizará automáticamente el sitio
### Modificar Servicios
### Opción 2: Upload Manual
Los servicios están definidos en el código HTML. Para añadir o modificar servicios:
1. **Comprimir archivos:**
   - Selecciona todo el contenido de la carpeta `export/`
   - Crear archivo ZIP
1. Edita las tarjetas de servicios en `index.html` y `servicios.html`
2. Crea nuevas páginas individuales de servicios siguiendo el patrón de `servicio-gresite.html`
3. Actualiza los enlaces en el footer y navegación
2. **Subir via File Manager:**
   - hPanel → File Manager
   - Navegar a `public_html`
   - Subir y extraer el ZIP
### Personalizar Estilos
## Configuración de Dominio
En `styles.css` puedes modificar:
- Colores principales (busca las variables `:root`)
- Fuentes y tipografía
- Espaciados y diseño
- **Dominio principal:** Apuntar a `public_html/index.html`
- **Subdominios:** Configurar en hPanel → Subdomains
## 📱 Características
## Verificación Post-Deployment
✅ **Completamente Responsive** - Se adapta a móviles, tablets y escritorio
✅ **SEO Optimizado** - Meta tags, Open Graph, datos estructurados
✅ **Formularios Funcionales** - Con validación y notificaciones
✅ **WhatsApp Integration** - Botones de contacto directo
✅ **Diseño Profesional** - Moderno y orientado a conversión
✅ **Navegación Intuitiva** - Menú responsive con hamburguesa en móvil
✅ **Botones Flotantes** - Acceso rápido a teléfono y WhatsApp
1. Verificar que `index.html` carga correctamente
2. Comprobar que todos los CSS se cargan (`/css/` paths)
3. Probar formularios de contacto
4. Verificar links de WhatsApp
5. Comprobar responsive design en móvil
## 📋 Páginas Incluidas
## Soporte y Contacto
### 1. Página Principal (index.html)
- Hero section con llamada a la acción
- Resumen de servicios
- Sección "Por qué elegirnos"
- Formulario de contacto
- Información de contacto completa
Sitio desarrollado para PoolRepair Madrid
- Teléfono: +34 600 123 456
- WhatsApp: +34 600 123 456
- Email: info@poolrepairmadrid.com
### 2. Página de Servicios (servicios.html)
- Listado completo de servicios
- Descripción detallada de cada servicio
- Botones de acción para cada servicio
- Sección de emergencias 24h
- Formulario de presupuesto
## Notas Técnicas
### 3. Página de Contacto (contacto.html)
- Múltiples métodos de contacto
- Horarios de atención
- Zonas de servicio
- Formulario de contacto principal
- Sección de emergencias
### 4. Páginas de Servicios Individuales
- Ejemplo incluido: `servicio-gresite.html`
- Información detallada del servicio
- Proceso de trabajo paso a paso
- Sidebar con información de contacto
- Formulario específico del servicio
## 🎨 Servicios Incluidos
1. **Colocación y Sustitución de Gresite**
2. **Impermeabilización de Piscina**
3. **Recuperación de Aguas**
4. **Rehabilitación y Reparación**
5. **Reparación de Fugas**
6. **Reparación Subacuática**
## 📞 Funcionalidades de Contacto
### Formularios de Contacto
- Validación en tiempo real
- Notificaciones de estado
- Campos obligatorios marcados
- Integración con WhatsApp como backup
### Botones de Acción
- Llamada directa con `tel:`
- WhatsApp con mensaje preformateado
- Email con `mailto:`
- Botones flotantes siempre visibles
## 🔧 Para Desarrolladores
### Estructura CSS
- Variables CSS personalizadas
- Diseño mobile-first
- Flexbox y CSS Grid
- Animaciones suaves
- Estados hover y focus
### JavaScript Incluido
- Navegación móvil responsiva
- Manejo de formularios
- Sistema de notificaciones
- Smooth scroll
- Animaciones de entrada
- Tracking de eventos
### SEO Features
- Meta tags optimizados
- Open Graph para redes sociales
- Datos estructurados JSON-LD
- URLs semánticas
- Jerarquía de encabezados correcta
## 📊 Para Hospedar
### Requisitos Mínimos
- Servidor web (Apache, Nginx, etc.)
- Soporte para archivos estáticos
- HTTPS recomendado
- Compresión gzip recomendada
### Hosting Recomendado
- **Shared Hosting**: Cualquier hosting básico
- **CDN**: Cloudflare para mejor rendimiento
- **SSL**: Certificado SSL/TLS obligatorio
- **Backup**: Copias de seguridad regulares
## 🚨 Base de Datos (Opcional)
**IMPORTANTE**: Este sitio web funciona completamente SIN base de datos. Los formularios están configurados para:
1. **Envío por WhatsApp**: Como método principal de contacto
2. **Envío por Email**: Como alternativa
3. **Notificaciones visuales**: Para confirmar el envío
### Si Quieres Almacenar Formularios
Para guardar los formularios en una base de datos, necesitarás:
1. **Backend**: PHP, Node.js, Python, etc.
2. **Base de datos**: MySQL, PostgreSQL, etc.
3. **Formulario handling**: Procesar $_POST o equivalente
#### Ejemplo PHP Simple:
```php
<?php
if ($_POST['nombre']) {
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $servicio = $_POST['servicio'];
    $mensaje = $_POST['mensaje'];
    
    // Guardar en base de datos
    // Enviar email
    // Responder con JSON
}
?>
```
## 📈 Optimización para Google
### SEO On-Page
- Títulos únicos para cada página
- Meta descriptions optimizadas
- Palabras clave relevantes
- Velocidad de carga optimizada
- Imágenes con alt text
### Local SEO
- Datos de negocio local
- Coordenadas GPS
- Horarios de apertura
- Zona de servicio definida
### Palabras Clave Objetivo
- "reparación piscinas Madrid"
- "gresite piscina Madrid"
- "impermeabilización piscina"
- "fugas agua piscina"
- "reparación subacuática"
## 🛠️ Mantenimiento
### Actualizaciones Regulares
- Revisar información de contacto
- Actualizar precios si es necesario
- Añadir nuevos servicios
- Optimizar para nuevas palabras clave
### Monitoreo
- Google Analytics recomendado
- Google Search Console
- Velocidad de carga
- Experiencia de usuario móvil
## 🆘 Soporte
Para personalizar este sitio web:
1. Los comentarios en el código te guiarán
2. Cada sección está claramente marcada
3. Los estilos están organizados por componentes
4. Las variables CSS facilitan los cambios de color
## 📄 Licencia
Este código es para uso comercial. Puedes modificarlo y adaptarlo según tus necesidades.
---
**¡Tu sitio web profesional de reparación de piscinas está listo para generar clientes!**
- No requiere base de datos
- Compatible con hosting compartido
- Formularios funcionan via WhatsApp/Email
- CSS modular para fácil mantenimiento