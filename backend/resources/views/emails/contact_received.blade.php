<!DOCTYPE html>
<html>
<head>
    <title>Nouveau message de contact</title>
</head>
<body>
    <h1>Nouveau message de contact</h1>
    <p><strong>Nom:</strong> {{ $details['firstname'] }} {{ $details['lastname'] }}</p>
    <p><strong>Email:</strong> {{ $details['email'] }}</p>
    <p><strong>Message:</strong> {{ $details['message'] }}</p>
</body>
</html>