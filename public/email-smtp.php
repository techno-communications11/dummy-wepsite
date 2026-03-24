<?php

if (basename(__FILE__) === basename($_SERVER["SCRIPT_FILENAME"])) {
  header("HTTP/1.1 403 Forbidden");
  exit;
}

declare(strict_types=1);

function respondJson(int $status, array $payload): void
{
  http_response_code($status);
  header("Content-Type: application/json; charset=UTF-8");
  echo json_encode($payload);
  exit;
}

function loadEmailConfig(): array
{
  $configPath = __DIR__ . "/email-config.php";

  if (!file_exists($configPath)) {
    respondJson(500, ["error" => "Email configuration file is missing."]);
  }

  $config = include $configPath;

  if (!is_array($config)) {
    respondJson(500, ["error" => "Email configuration file must return an array."]);
  }

  $required = ["smtp_host", "smtp_port", "smtp_user", "smtp_pass", "recipient"];
  foreach ($required as $key) {
    if (empty($config[$key])) {
      respondJson(500, ["error" => "Email configuration is missing '{$key}'."]);
    }
  }

  $config["smtp_secure"] = strtolower($config["smtp_secure"] ?? "ssl");
  $config["sender_name"] = $config["sender_name"] ?? "GAUVARON CORPORATE SOLUTIONS";
  $config["ehlo_domain"] = $config["ehlo_domain"] ?? gethostname();

  return $config;
}

function getRequestPayload(): array
{
  $body = file_get_contents("php://input");

  if ($body === false) {
    return $_POST;
  }

  $decoded = json_decode($body, true);

  if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
    return $decoded;
  }

  return $_POST;
}

function smtpSend(
  array $config,
  string $to,
  string $subject,
  string $body,
  ?string $replyTo = null
): void {
  $secure = $config["smtp_secure"];
  $host = $config["smtp_host"];
  $port = (int) $config["smtp_port"];
  $user = $config["smtp_user"];
  $pass = $config["smtp_pass"];
  $sender = $config["sender_name"];
  $ehlo = $config["ehlo_domain"];

  $protocol = $secure === "tls" ? "tcp" : "ssl";
  $stream = stream_socket_client(
    "{$protocol}://{$host}:{$port}",
    $errno,
    $errstr,
    15,
    STREAM_CLIENT_CONNECT
  );

  if ($stream === false) {
    throw new RuntimeException("Unable to connect to SMTP server ({$errno}): {$errstr}");
  }

  try {
    $response = smtpReadResponse($stream);

    expectCode($response, 220);

    smtpWrite($stream, "EHLO {$ehlo}");
    $response = smtpReadResponse($stream);
    expectCode($response, 250);

    if ($secure === "tls") {
      smtpWrite($stream, "STARTTLS");
      $response = smtpReadResponse($stream);
      expectCode($response, 220);

      $enable = stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
      if ($enable === false) {
        throw new RuntimeException("Failed to negotiate TLS.");
      }

      smtpWrite($stream, "EHLO {$ehlo}");
      $response = smtpReadResponse($stream);
      expectCode($response, 250);
    }

    smtpWrite($stream, "AUTH LOGIN");
    expectCode(smtpReadResponse($stream), 334);
    smtpWrite($stream, base64_encode($user));
    expectCode(smtpReadResponse($stream), 334);
    smtpWrite($stream, base64_encode($pass));
    expectCode(smtpReadResponse($stream), 235);

    smtpWrite($stream, "MAIL FROM:<{$user}>");
    expectCode(smtpReadResponse($stream), 250);

    smtpWrite($stream, "RCPT TO:<{$to}>");
    expectCode(smtpReadResponse($stream), [250, 251]);

    smtpWrite($stream, "DATA");
    expectCode(smtpReadResponse($stream), 354);

    $headers = [
      "From: \"{$sender}\" <{$user}>",
      "To: {$to}",
      "Subject: {$subject}",
      "Reply-To: " . ($replyTo ?? $user),
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
    ];

    $payload = implode("\r\n", $headers) . "\r\n\r\n" . wordwrap($body, 998, "\r\n");

    smtpWrite($stream, $payload . "\r\n.");
    expectCode(smtpReadResponse($stream), 250);

    smtpWrite($stream, "QUIT");
    smtpReadResponse($stream);
  } finally {
    fclose($stream);
  }
}

function smtpWrite($stream, string $command): void
{
  fwrite($stream, $command . "\r\n");
}

function smtpReadResponse($stream): string
{
  $response = "";
  while (($line = fgets($stream, 515)) !== false) {
    $response .= $line;
    if (isset($line[3]) && $line[3] === " ") {
      break;
    }
  }

  if ($response === "") {
    throw new RuntimeException("Unexpected SMTP response.");
  }

  return $response;
}

function expectCode(string $response, $codes): void
{
  $codes = is_array($codes) ? $codes : [$codes];
  $code = (int) substr($response, 0, 3);

  if (!in_array($code, $codes, true)) {
    throw new RuntimeException("SMTP error: {$response}");
  }
}
