<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use App\Jobs\SendMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $userId = auth()->guard('web')->id();
        $user = User::where('id', $userId)->select([
            'id',
            'name',
            'email'
        ])->first();
        return view('home', [
            'user' => $user,
        ]);
    }
    public function messages(): JsonResponse
    {
        $messages = Message::with('user')->get()->append('time');

        return response()->json($messages);
    }
    public function message(Request $request): JsonResponse
    {
        try {
            $userId = auth()->guard('web')->id();
            $message = Message::create([
                'user_id' => $userId,
                'text' => $request->get('text')
            ]);
            // return response()->json([
            //     'success' => true,
            //     'message' => "message created",
            // ]);
            SendMessage::dispatch($message);
            return response()->json([
                'success' => true,
                'messagesended' => $message,
                'message' => "message created and job dispatched",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
