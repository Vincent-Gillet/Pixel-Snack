<!DOCTYPE html>
<html>
<head>
    <title>Nouveau message de contact</title>
</head>
<body>
    <p>Bonjour {{ $details['firstname'] }} {{ $details['lastname'] }},</p>
    <p>Merci pour votre message. Voici un récapitulatif de votre message :</p>
    <p><strong>Message :</strong></p>
    <br>
    <p>{{ $details['message'] }}</p>
    <br>
    <p>Notre équipe Pixel Snack vous contactera dans les plus brefs délais.</p>
    <p>Cordialement,</p>
    <p>L'équipe Pixel Snack</p>
</body>
</html>