<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

/* ===== JSON RESPONSE ===== */
function respondJson(int $status, array $payload): void {
  http_response_code($status);
  header("Content-Type: application/json; charset=UTF-8");
  echo json_encode($payload);
  exit;
}

/* ===== LOAD ENV ===== */
function parseEnvFile(string $path): array {
  if (!file_exists($path)) return [];

  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  $values = [];

  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === "" || str_starts_with($line, "#")) continue;

    [$key, $value] = explode("=", $line, 2);
    $values[trim($key)] = trim($value, "\"'");
  }

  return $values;
}

function loadEmailConfig(): array {
  $env = parseEnvFile(__DIR__ . "/../.env");

  $required = ["SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS","SMTP_RECIPIENT"];

  foreach ($required as $key) {
    if (empty($env[$key])) {
      respondJson(500, ["error" => "$key missing in .env"]);
    }
  }

  return [
    "host" => $env["SMTP_HOST"],
    "port" => (int)$env["SMTP_PORT"],
    "user" => $env["SMTP_USER"],
    "pass" => $env["SMTP_PASS"],
    "secure" => strtolower($env["SMTP_SECURE"] ?? "ssl"),
    "to" => $env["SMTP_CAREERS_RECIPIENT"] ?? $env["SMTP_RECIPIENT"],
    "name" => $env["SENDER_NAME"] ?? "Company",
    "ehlo" => $env["EHLO_DOMAIN"] ?? gethostname()
  ];
}

/* ===== REQUEST PAYLOAD ===== */
function getRequestPayload(): array {
  $raw = file_get_contents("php://input");
  $data = json_decode($raw, true);
  return is_array($data) ? $data : $_POST;
}

/* ===== SMTP SEND ===== */
function smtpSend(array $cfg, string $subject, string $body, string $replyTo): void {

  $protocol = $cfg["secure"] === "tls" ? "tcp" : "ssl";

  $context = stream_context_create([
    "ssl" => [
      "verify_peer" => true,
      "verify_peer_name" => true,
      "allow_self_signed" => false,
    ],
  ]);

  $stream = stream_socket_client(
    "{$protocol}://{$cfg["host"]}:{$cfg["port"]}",
    $errno,
    $errstr,
    30,
    STREAM_CLIENT_CONNECT,
    $context
  );

  if (!$stream) {
    throw new RuntimeException("SMTP CONNECT FAIL: $errno - $errstr");
  }

  stream_set_timeout($stream, 10);

  $read = fn() => fgets($stream, 515);
  $write = fn($cmd) => fwrite($stream, $cmd . "\r\n");

  // ✅ FIXED: multi-line response handler
  $expect = function($expected) use ($read) {
    $res = '';

    while ($line = $read()) {
      $res .= $line;

      // multi-line ends when 4th char is space
      if (isset($line[3]) && $line[3] === ' ') break;
    }

    $code = (int)substr($res, 0, 3);

    if (!in_array($code, (array)$expected)) {
      throw new RuntimeException("SMTP ERROR: $res");
    }
  };

  // handshake
  $expect(220);

  $write("EHLO " . $cfg["ehlo"]);
  $expect(250);

  if ($cfg["secure"] === "tls") {
    $write("STARTTLS");
    $expect(220);

    if (!stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      throw new RuntimeException("TLS FAILED");
    }

    $write("EHLO " . $cfg["ehlo"]);
    $expect(250);
  }

  // auth
  $write("AUTH LOGIN");
  $expect(334);

  $write(base64_encode($cfg["user"]));
  $expect(334);

  $write(base64_encode($cfg["pass"]));
  $expect(235); // MUST be 235

  // mail
  $write("MAIL FROM:<{$cfg["user"]}>");
  $expect(250);

  $write("RCPT TO:<{$cfg["to"]}>");
  $expect([250, 251]);

  $write("DATA");
  $expect(354);

  $headers = [
    "From: \"{$cfg["name"]}\" <{$cfg["user"]}>",
    "To: {$cfg["to"]}",
    "Subject: {$subject}",
    "Reply-To: {$replyTo}",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
  ];

  $message = implode("\r\n", $headers) . "\r\n\r\n" . $body;

  $write($message . "\r\n.");
  $expect(250);

  $write("QUIT");
  fclose($stream);
}

/* ===== MAIN ===== */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respondJson(405, ["error" => "POST required"]);
}

try {

  $cfg = loadEmailConfig();
  $data = getRequestPayload();

  $name = trim($data["name"] ?? "");
  $email = trim($data["email"] ?? "");
  $role = trim($data["role"] ?? "");
  $message = trim($data["message"] ?? "");
  $drive = trim($data["driveLink"] ?? "");

  if (!$name || !$email || !$role || !$message || !$drive) {
    respondJson(400, ["error" => "All fields required"]);
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respondJson(400, ["error" => "Invalid email"]);
  }

  $body = "Name: $name\nEmail: $email\nRole: $role\nResume: $drive\n\n$message";

  smtpSend($cfg, "[Career] $role", $body, $email);

  respondJson(200, ["success" => true]);

} catch (Throwable $e) {
  respondJson(500, ["error" => $e->getMessage()]);
}