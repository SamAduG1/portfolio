<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Honeypot check
    if (!empty($_POST['honeypot'])) {
        header("Location: index.html?status=error");
        exit();
    }

    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $to = "sadugyapong@gmail.com";  // Replace with your actual email
    $subject = "New Contact Form Submission from $name";
    $body = "You have received a new message from your portfolio website:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: index.html?status=success");
    } else {
        header("Location: index.html?status=error");
    }
    exit();
} else {
    echo "<h2>Error: Invalid request</h2>";
}
?>