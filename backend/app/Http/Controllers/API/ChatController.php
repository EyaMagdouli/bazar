<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\Message;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request, $id)
    {

        $marketplace = Marketplace::where('id',$id)->first();

        $receiver_id = User::where('id',$marketplace->user_id)->first()->id;
        $receiver = User::where('id',$marketplace->user_id)->first();
        $sender = auth()->user();

        $message = $sender->sentMessages()->create([  //to save the msgs in the db
            'message' => $request->input('message'),
            'receiver_id' => $receiver_id
        ]);
        // dd($message);
        // $time = Carbon::parse($message->created_at)->format('Y-m-d');
        // dd($time);

        event(new  MessageSent($request->input('sender'),$request->input('receiver'), $request->input('message')));
        return response()->json([
            'message' => $message,
            'sender' => $sender,
            'marketplace' => $marketplace,
            'receiver' => $receiver,
            'status'=>200,
            // 'time' => $time,
            // 'message' => 'Message sent successfully'
        ]);
    }


    public function fetchMessages()  //returns a json of all messages along to their users
    {
        return Message::with('sender')->get();
    }



















    // public function conversation($id)
    // {
    //     $product = Product::find($id);
    //     $sender = User::where('id', auth()->user()->id)->first();
    //     $marketplace = Marketplace::where('id', $product->marketplace_id)->get();



    //     if ($product) {
    //         return response()->json([
    //             'status' => 200,
    //             'product' => $product,
    //             'sender' => $sender,
    //             'marketplace' => $marketplace
    //         ]);
    //     } else {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => "No product found"
    //         ]);
    //     }
    // }

    // public function (){

    // }
}
