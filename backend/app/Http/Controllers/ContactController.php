<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactReceived;
use App\Mail\ContactConfirmation;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function getSendEmail(Request $request)
    {
        $details = [
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'message' => $request->message,
        ];

        // Envoyer l'email à vous-même
        Mail::to('pixel-snack@vincentgillet.fr')->send(new ContactReceived($details));

        // Envoyer l'email de confirmation à la personne
        Mail::to($request->email)->send(new ContactConfirmation($details));

        return response()->json(['message' => 'Emails envoyés avec succès!'], 200);
    }
}