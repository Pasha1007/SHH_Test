<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $answers = json_decode($_POST['answers'], true);

    if (!$email) {
        echo json_encode(["error" => "Неправильна адреса електронної пошти."]);
        exit();
    }

    if (empty($answers) || !is_array($answers)) {
        echo json_encode(["error" => "Відповіді не були надіслані."]);
        exit();
    }

    echo json_encode(["success" => true, "redirect" => "success.php"]);
    exit();
}
?>
