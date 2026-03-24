<?php

require_once __DIR__ . "/email-smtp.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respondJson(405, ["error" => "POST required."]);
}

$config = loadEmailConfig();
$payload = getRequestPayload();

$name = trim((string) ($payload["name"] ?? ""));
$email = trim((string) ($payload["email"] ?? ""));
$role = trim((string) ($payload["role"] ?? ""));
$message = trim((string) ($payload["message"] ?? ""));
$driveLink = trim((string) ($payload["driveLink"] ?? ""));

if ($name === "" || $email === "" || $role === "" || $message === "" || $driveLink === "") {
  respondJson(400, ["error" => "All fields are required."]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respondJson(400, ["error" => "Please provide a valid email address."]);
}

$body = implode("\n", [
  "Name: {$name}",
  "Email: {$email}",
  "Role: {$role}",
  "Resume Link: {$driveLink}",
  "",
  $message,
]);

$recipient = $config["careers_recipient"] ?? $config["recipient"];

try {
  smtpSend(
    $config,
    $recipient,
    "[Career Interest] {$role}",
    $body,
    $email
  );
} catch (Throwable $error) {
  respondJson(500, ["error" => "Unable to send the application right now."]);
}

respondJson(200, ["success" => true]);
