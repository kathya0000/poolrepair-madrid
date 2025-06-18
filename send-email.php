<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$servicio = isset($_POST['servicio']) ? trim($_POST['servicio']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

// Validar campos obligatorios
if (empty($nombre) || empty($telefono)) {
    echo json_encode(['success' => false, 'message' => 'Nombre y teléfono son obligatorios']);
    exit;
}

// Configurar destinatario y asunto
$to = 'presupuestoonlinepiscinas@gmail.com';
$subject = 'Nueva consulta desde reparacionpiscinasmadrid.es';

// Crear mensaje de texto plano
$message = "NUEVA CONSULTA DESDE WEB\n";
$message .= "========================\n\n";
$message .= "Nombre: " . $nombre . "\n";
$message .= "Teléfono: " . $telefono . "\n";
$message .= "Email: " . ($email ? $email : 'No proporcionado') . "\n";
$message .= "Servicio: " . ($servicio ? $servicio : 'No especificado') . "\n";
$message .= "Mensaje: " . ($mensaje ? $mensaje : 'Sin mensaje adicional') . "\n\n";
$message .= "Fecha: " . date('d/m/Y H:i:s') . "\n";
$message .= "Enviado desde: reparacionpiscinasmadrid.es\n";

// Configurar headers
$headers = "From: noreply@reparacionpiscinasmadrid.es\r\n";
$headers .= "Reply-To: " . ($email ? $email : 'noreply@reparacionpiscinasmadrid.es') . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Intentar enviar el email
$enviado = mail($to, $subject, $message, $headers);

// Responder con JSON
if ($enviado) {
    echo json_encode([
        'success' => true, 
        'message' => '¡Mensaje enviado correctamente! Te contactaremos pronto.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Inténtalo de nuevo o llámanos directamente.'
    ]);
}
?>