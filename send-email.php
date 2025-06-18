<?php
header('Content-Type: application/json');
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
$email = isset($_POST['email']) ? trim($_POST['email']) : 'No proporcionado';
$servicio = isset($_POST['servicio']) ? trim($_POST['servicio']) : 'No especificado';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : 'Sin mensaje adicional';

// Validar campos obligatorios
if (empty($nombre) || empty($telefono)) {
    echo json_encode(['success' => false, 'message' => 'Nombre y teléfono son obligatorios']);
    exit;
}

// Configurar email
$to = 'presupuestoonlinepiscinas@gmail.com';
$subject = 'Nueva consulta desde web de piscinas';
$from = 'noreply@reparacionpiscinasmadrid.es';

// Crear mensaje HTML
$html_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0066cc; }
        .value { margin-top: 5px; }
        .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nueva Consulta - Reparación Piscinas Madrid</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Nombre:</div>
                <div class='value'>" . htmlspecialchars($nombre) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Teléfono:</div>
                <div class='value'>" . htmlspecialchars($telefono) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Servicio de interés:</div>
                <div class='value'>" . htmlspecialchars($servicio) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Mensaje:</div>
                <div class='value'>" . nl2br(htmlspecialchars($mensaje)) . "</div>
            </div>
        </div>
        <div class='footer'>
            Enviado desde reparacionpiscinasmadrid.es<br>
            Fecha: " . date('d/m/Y H:i:s') . "
        </div>
    </div>
</body>
</html>";

// Headers del email
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $from,
    'Reply-To: ' . ($email !== 'No proporcionado' ? $email : $from),
    'X-Mailer: PHP/' . phpversion()
);

// Enviar email
$success = mail($to, $subject, $html_message, implode("\r\n", $headers));

if ($success) {
    echo json_encode([
        'success' => true, 
        'message' => '¡Mensaje enviado correctamente! Te contactaremos pronto.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    ]);
}
?>