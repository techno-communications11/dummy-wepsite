<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

/* ===== JSON RESPONSE ===== */
function respondJson(int $status, array $data): void {
  http_response_code($status);
  header("Content-Type: application/json; charset=UTF-8");
  echo json_encode($data);
  exit;
}

/* ===== REQUEST PAYLOAD ===== */
function getRequestPayload(): array {
  $raw = file_get_contents("php://input");
  $decoded = json_decode($raw, true);
  return is_array($decoded) ? $decoded : $_POST;
}

/* ===== LOAD ENV ===== */
function parseEnv(string $file): array {
  if (!file_exists($file)) return [];

  $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  $env = [];

  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === "" || str_starts_with($line, "#")) continue;

    [$key, $value] = explode('=', $line, 2);
    $env[trim($key)] = trim($value, "\"'");
  }

  return $env;
}

/* ===== SMTP SEND ===== */
function smtpSend(array $env, string $to, string $subject, string $body, string $replyTo): void {

  $host = $env["SMTP_HOST"];
  $port = (int)$env["SMTP_PORT"];
  $user = $env["SMTP_USER"];
  $pass = $env["SMTP_PASS"];
  $secure = strtolower($env["SMTP_SECURE"] ?? "ssl");

  $protocol = $secure === "tls" ? "tcp" : "ssl";

  $context = stream_context_create([
    "ssl" => [
      "verify_peer" => true,
      "verify_peer_name" => true,
      "allow_self_signed" => false
    ]
  ]);

  $stream = stream_socket_client(
    "$protocol://$host:$port",
    $errno,
    $errstr,
    30,
    STREAM_CLIENT_CONNECT,
    $context
  );

  if (!$stream) {
    throw new Exception("SMTP CONNECT FAIL: $errstr ($errno)");
  }

  stream_set_timeout($stream, 10);

  $read = fn() => fgets($stream, 515);
  $write = fn($cmd) => fwrite($stream, $cmd . "\r\n");

  // ✅ FIXED: multi-line SMTP response handler
  $expect = function($codes) use ($read) {
    $res = '';

    while ($line = $read()) {
      $res .= $line;

      // SMTP multi-line ends when 4th char is space
      if (isset($line[3]) && $line[3] === ' ') break;
    }

    $code = (int)substr($res, 0, 3);

    if (!in_array($code, (array)$codes)) {
      throw new Exception("SMTP ERROR: $res");
    }
  };

  // ===== SMTP FLOW =====

  $expect(220);

  $write("EHLO localhost");
  $expect(250);

  if ($secure === "tls") {
    $write("STARTTLS");
    $expect(220);

    if (!stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      throw new Exception("TLS FAILED");
    }

    $write("EHLO localhost");
    $expect(250);
  }

  // AUTH
  $write("AUTH LOGIN");
  $expect(334);

  $write(base64_encode($user));
  $expect(334);

  $write(base64_encode($pass));
  $expect(235); // MUST succeed

  // MAIL
  $write("MAIL FROM:<$user>");
  $expect(250);

  $write("RCPT TO:<$to>");
  $expect([250, 251]);

  $write("DATA");
  $expect(354);

  $headers = [
    "From: <$user>",
    "To: $to",
    "Subject: $subject",
    "Reply-To: $replyTo",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8"
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

  $env = parseEnv(__DIR__ . "/../.env");

  if (empty($env)) {
    respondJson(500, ["error" => ".env file missing"]);
  }

  $required = ["SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS","SMTP_RECIPIENT"];
  foreach ($required as $key) {
    if (empty($env[$key])) {
      respondJson(500, ["error" => "$key missing in .env"]);
    }
  }

  $data = getRequestPayload();

  $name = trim($data["name"] ?? "");
  $email = trim($data["email"] ?? "");
  $subject = trim($data["subject"] ?? "");
  $message = trim($data["message"] ?? "");

  if (!$name || !$email || !$subject || !$message) {
    respondJson(400, ["error" => "All fields required"]);
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respondJson(400, ["error" => "Invalid email"]);
  }

  $body = "Name: $name\nEmail: $email\n\n$message";

  smtpSend(
    $env,
    $env["SMTP_RECIPIENT"],
    "[Contact] $subject",
    $body,
    $email
  );

  respondJson(200, ["success" => true]);

} catch (Throwable $e) {
  respondJson(500, ["error" => $e->getMessage()]);
}