<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Only POST allowed']);
    exit();
}

// === SOZLAMALAR ===
$BOT_TOKEN = getenv('TELEGRAM_BOT_TOKEN') ?: 'BU_YERGA_BOT_TOKEN';
$CHAT_ID   = getenv('TELEGRAM_CHAT_ID')   ?: 'BU_YERGA_CHAT_ID';
// ==================

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$first_name = htmlspecialchars(trim($input['first_name'] ?? ''));
$last_name  = htmlspecialchars(trim($input['last_name']  ?? ''));
$phone      = htmlspecialchars(trim($input['phone']      ?? ''));
$email      = htmlspecialchars(trim($input['email']      ?? ''));
$message    = htmlspecialchars(trim($input['message']    ?? ''));

if (!$first_name && !$last_name && !$phone && !$email && !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Empty form data']);
    exit();
}

$text  = "📩 <b>Yangi aloqa xabari</b>\n";
$text .= "━━━━━━━━━━━━━━━━\n";
$text .= "👤 <b>Ism:</b> {$first_name} {$last_name}\n";
$text .= "📞 <b>Telefon:</b> {$phone}\n";
$text .= "📧 <b>Email:</b> {$email}\n";
$text .= "━━━━━━━━━━━━━━━━\n";
$text .= "💬 <b>Xabar:</b>\n{$message}";

$url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";

$data = [
    'chat_id'    => $CHAT_ID,
    'text'       => $text,
    'parse_mode' => 'HTML',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Network error']);
    exit();
}

$result = json_decode($response, true);

if ($httpCode === 200 && isset($result['ok']) && $result['ok']) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $result['description'] ?? 'Telegram API error']);
}
