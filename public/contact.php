<?php

require_once __DIR__ . "/email-smtp.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  respondJson(405, ["error" => "POST required."]);
}

$config = loadEmailConfig();
$payload = getRequestPayload();

$name = trim((string) ($payload["name"] ?? ""));
$email = trim((string) ($payload["email"] ?? ""));
$subject = trim((string) ($payload["subject"] ?? ""));
$message = trim((string) ($payload["message"] ?? ""));

if ($name === "" || $email === "" || $subject === "" || $message === "") {
  respondJson(400, ["error" => "All fields are required."]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respondJson(400, ["error" => "Please provide a valid email address."]);
}

$content = implode("\n", [
  "Name: {$name}",
  "Email: {$email}",
  "",
  $message,
]);

try {
  smtpSend(
    $config,
    $config["recipient"],
    "[Website Inquiry] {$subject}",
    $content,
    $email
  );
} catch (Throwable $error) {
  respondJson(500, ["error" => "Unable to send the message right now."]);
}

respondJson(200, ["success" => true]);
