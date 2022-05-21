<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\Message;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request, $id)
    {

        $marketplace = Marketplace::where('id',$id)->first();
        $receiver_id = User::where('id',$marketplace->user_id)->first()->id;
        $receiver = User::where('id',$marketplace->user_id)->first();
        $sender = auth()->user();

        $message = $sender->messages()->create([  //to save the msgs in the db
            'message' => $request->input('message'),
            'receiver_id' => $receiver_id
        ]);
        // dd($message);


        event(new  MessageSent($request->input('sender'),$request->input('receiver'), $request->input('message')));
        return response()->json([
            'message' => $message,
            'sender' => $sender,
            'marketplace' => $marketplace,
            'receiver' => $receiver,
            'status'=>200,
            // 'message' => 'Message sent successfully'
        ]);
    }


    public function fetchMessages()  //returns a json of all messages along to their users
    {
        return Message::with('user')->get();
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
