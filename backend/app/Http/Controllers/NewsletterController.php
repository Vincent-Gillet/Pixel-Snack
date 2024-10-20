<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;

class NewsletterController extends Controller
{
    public function getSubcribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter,email',
            'accepted_terms' => 'required|boolean',
        ]);

        $subscriber = new Newsletter();
        $subscriber->email = $request->email;
        $subscriber->accepted_terms = $request->accepted_terms;
        $subscriber->save();

        return response()->json(['message' => 'Inscription réussie à la newsletter'], 200);
    }

    public function index()
    {
        $subscribers = Newsletter::all();
        return response()->json($subscribers);
    }
}