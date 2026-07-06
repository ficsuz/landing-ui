<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Only POST requests are allowed.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 0 && empty($_FILES) && empty($_POST)) {
    respond(413, [
        'success' => false,
        'error' => 'The uploaded file is too large for the server. Please check upload_max_filesize and post_max_size settings.',
    ]);
}

set_error_handler(static function (int $severity, string $message, string $file, int $line): bool {
    respond(500, [
        'success' => false,
        'error' => sprintf('%s in %s on line %d', $message, basename($file), $line),
    ]);
});

set_exception_handler(static function (Throwable $exception): void {
    respond(500, [
        'success' => false,
        'error' => $exception->getMessage(),
    ]);
});

if (!extension_loaded('curl')) {
    respond(500, ['success' => false, 'error' => 'The cURL extension is required.']);
}

$botToken = getenv('TELEGRAM_BOT_TOKEN') ?: '';
$primaryChatId = getenv('TELEGRAM_CHAT_ID') ?: '1724444067';
$adminChatId = getenv('TELEGRAM_ADMIN_CHAT_ID') ?: '';
$chatIdsFromEnv = getenv('TELEGRAM_CHAT_IDS') ?: '';
$apiBase = getenv('TELEGRAM_API_BASE') ?: "https://api.telegram.org/bot{$botToken}";

if ($botToken === '') {
    respond(500, ['success' => false, 'error' => 'Telegram bot token is not configured.']);
}

$recipientChatIds = [];

if ($chatIdsFromEnv !== '') {
    $recipientChatIds = array_map('trim', explode(',', $chatIdsFromEnv));
} else {
    $recipientChatIds = [$primaryChatId, $adminChatId];
}

$recipientChatIds = array_values(array_unique(array_filter($recipientChatIds, static fn ($value) => $value !== '')));

if (!$recipientChatIds) {
    respond(500, ['success' => false, 'error' => 'No Telegram recipients configured.']);
}

$files = normalizeUploadedFiles($_FILES['files'] ?? $_FILES['file'] ?? null);

if (!$files) {
    respond(400, ['success' => false, 'error' => 'No files uploaded.']);
}

$validatedFiles = validateUploadedFiles($files);
$deliveredCount = 0;

foreach ($recipientChatIds as $chatId) {
    if (count($validatedFiles) === 1) {
        sendSingleDocument($apiBase, $chatId, $validatedFiles[0], buildSingleCaption($validatedFiles[0]));
    } else {
        sendDocumentGroup($apiBase, $chatId, $validatedFiles, buildGroupCaption($validatedFiles));
    }

    $deliveredCount++;
}

respond(200, [
    'success' => true,
    'sent_count' => $deliveredCount,
    'file_count' => count($validatedFiles),
]);

function normalizeUploadedFiles($rawFiles): array
{
    if (!$rawFiles || !is_array($rawFiles) || empty($rawFiles['name'])) {
        return [];
    }

    if (!is_array($rawFiles['name'])) {
        return [[
            'name' => $rawFiles['name'],
            'type' => $rawFiles['type'] ?? '',
            'tmp_name' => $rawFiles['tmp_name'] ?? '',
            'error' => $rawFiles['error'] ?? UPLOAD_ERR_NO_FILE,
            'size' => $rawFiles['size'] ?? 0,
        ]];
    }

    $normalized = [];
    $count = count($rawFiles['name']);

    for ($index = 0; $index < $count; $index++) {
        $normalized[] = [
            'name' => $rawFiles['name'][$index] ?? '',
            'type' => $rawFiles['type'][$index] ?? '',
            'tmp_name' => $rawFiles['tmp_name'][$index] ?? '',
            'error' => $rawFiles['error'][$index] ?? UPLOAD_ERR_NO_FILE,
            'size' => $rawFiles['size'][$index] ?? 0,
        ];
    }

    return $normalized;
}

function validateUploadedFiles(array $files): array
{
    $allowedExtensions = ['pdf', 'xlsx', 'zip'];
    $allowedMimeMap = [
        'pdf' => ['application/pdf', 'application/x-pdf', 'application/octet-stream'],
        'xlsx' => [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/zip',
            'application/octet-stream',
        ],
        'zip' => [
            'application/zip',
            'application/x-zip-compressed',
            'multipart/x-zip',
            'application/octet-stream',
        ],
    ];

    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : false;
    $validatedFiles = [];

    $maxAllowedBytes = 25 * 1024 * 1024; // 25 MB

    foreach ($files as $file) {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            respond(400, [
                'success' => false,
                'error' => uploadErrorMessage((int) $file['error']),
            ]);
        }

        if (empty($file['tmp_name']) || !file_exists($file['tmp_name'])) {
            respond(400, ['success' => false, 'error' => 'Uploaded file is missing from the temporary directory.']);
        }

        if ((int) $file['size'] > $maxAllowedBytes) {
            respond(400, [
                'success' => false,
                'error' => sprintf('File "%s" exceeds the 25 MB size limit.', $file['name']),
            ]);
        }

        $originalName = sanitizeFileName((string) $file['name']);
        $extension = strtolower((string) pathinfo($originalName, PATHINFO_EXTENSION));

        if (!in_array($extension, $allowedExtensions, true)) {
            respond(400, ['success' => false, 'error' => 'Unsupported file format.']);
        }

        $detectedMime = $finfo ? (string) finfo_file($finfo, $file['tmp_name']) : '';
        if ($detectedMime !== '' && !in_array($detectedMime, $allowedMimeMap[$extension], true)) {
            respond(400, [
                'success' => false,
                'error' => sprintf('Uploaded file type could not be verified for %s.', $originalName),
            ]);
        }

        $validatedFiles[] = [
            'name' => $originalName,
            'tmp_name' => $file['tmp_name'],
            'size' => (int) $file['size'],
            'extension' => $extension,
            'mime' => preferredMimeType($extension),
        ];
    }

    return $validatedFiles;
}

function sanitizeFileName(string $fileName): string
{
    $cleanName = preg_replace('/[^\pL\pN\.\-_ ]+/u', '', $fileName) ?: 'document';
    return trim($cleanName) !== '' ? trim($cleanName) : 'document';
}

function preferredMimeType(string $extension): string
{
    return match ($extension) {
        'pdf' => 'application/pdf',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        default => 'application/zip',
    };
}

function buildSingleCaption(array $file): string
{
    return "Yangi a'zolik hujjati\n"
        . "File: {$file['name']}\n"
        . 'Size: ' . formatMegabytes((int) $file['size']);
}

function buildGroupCaption(array $files): string
{
    $names = array_map(static fn (array $file): string => $file['name'], $files);
    $visibleNames = array_slice($names, 0, 6);
    $extraCount = count($names) - count($visibleNames);
    $totalBytes = array_sum(array_map(static fn (array $file): int => (int) $file['size'], $files));

    $caption = "Yangi a'zolik hujjatlari\n";
    $caption .= 'Files: ' . count($files) . "\n";
    $caption .= 'Total size: ' . formatMegabytes($totalBytes);

    if ($visibleNames) {
        $caption .= "\n\n";
        $caption .= implode("\n", array_map(static fn (string $name): string => "- {$name}", $visibleNames));
    }

    if ($extraCount > 0) {
        $caption .= "\n- ... va yana {$extraCount} ta fayl";
    }

    return truncateCaption($caption);
}

function formatMegabytes(int $bytes): string
{
    return round($bytes / 1024 / 1024, 2) . ' MB';
}

function truncateCaption(string $caption, int $maxLength = 1024): string
{
    if (mb_strlen($caption) <= $maxLength) {
        return $caption;
    }

    return mb_substr($caption, 0, $maxLength - 3) . '...';
}

function sendSingleDocument(string $apiBase, string $chatId, array $file, string $caption): void
{
    $payload = [
        'chat_id' => $chatId,
        'document' => new CURLFile($file['tmp_name'], $file['mime'], $file['name']),
        'caption' => $caption,
    ];

    sendTelegramRequest("{$apiBase}/sendDocument", $payload);
}

function sendDocumentGroup(string $apiBase, string $chatId, array $files, string $caption): void
{
    $media = [];
    $payload = ['chat_id' => $chatId];

    foreach ($files as $index => $file) {
        $attachName = "file_{$index}";
        $mediaItem = [
            'type' => 'document',
            'media' => "attach://{$attachName}",
        ];

        if ($index === 0) {
            $mediaItem['caption'] = $caption;
        }

        $media[] = $mediaItem;
        $payload[$attachName] = new CURLFile($file['tmp_name'], $file['mime'], $file['name']);
    }

    $payload['media'] = json_encode($media, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    sendTelegramRequest("{$apiBase}/sendMediaGroup", $payload);
}

function sendTelegramRequest(string $url, array $payload): void
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST            => true,
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_CONNECTTIMEOUT  => 30,
        CURLOPT_TIMEOUT         => 300,
        CURLOPT_POSTFIELDS      => $payload,
        CURLOPT_BUFFERSIZE      => 131072,   // 128 KB chunks — large file friendly
        CURLOPT_TCP_NODELAY     => true,
        CURLOPT_FOLLOWLOCATION  => false,
        CURLOPT_SSL_VERIFYPEER  => true,
        CURLOPT_SSL_VERIFYHOST  => 2,
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($curlError) {
        respond(502, ['success' => false, 'error' => "Telegram cURL error: {$curlError}"]);
    }

    $decodedResponse = is_string($response) ? json_decode($response, true) : null;

    if ($httpCode !== 200 || !is_array($decodedResponse)) {
        respond(502, ['success' => false, 'error' => 'Telegram API returned an invalid response.']);
    }

    if (array_key_exists('ok', $decodedResponse) && empty($decodedResponse['ok'])) {
        respond(502, ['success' => false, 'error' => $decodedResponse['description'] ?? 'Telegram API error.']);
    }
}

function uploadErrorMessage(int $errorCode): string
{
    return match ($errorCode) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'The uploaded file exceeds the server upload limit.',
        UPLOAD_ERR_PARTIAL => 'The file was only partially uploaded.',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
        UPLOAD_ERR_NO_TMP_DIR => 'The temporary upload directory is missing.',
        UPLOAD_ERR_CANT_WRITE => 'The uploaded file could not be written to disk.',
        UPLOAD_ERR_EXTENSION => 'A PHP extension stopped the file upload.',
        default => 'Unknown upload error.',
    };
}

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}
