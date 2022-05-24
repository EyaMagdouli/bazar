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
        $sender = auth()->user();
        $marketplace = Marketplace::where('id', $id)->first();

        $receiver_id = $marketplace->user->id;
        $receiver = User::where('id', $marketplace->user_id)->first();

        $message = Message::create([  //to save the msgs in the db
            'message' => $request->input('message'),
            'sender_id' => $sender->id,
            'receiver_id' => $receiver_id,
            'marketplace_id' => $marketplace->id
        ]);
        // dd($message);
        // $time = Carbon::parse($message->created_at)->format('Y-m-d');
        // dd($time);

        event(new  MessageSent($request->input('sender'), $request->input('receiver'), $request->input('message')));
        return response()->json([
            'message' => $message,
            'sender' => $sender,
            'marketplace' => $marketplace,
            'receiver' => $receiver,
            'status' => 200,
            // 'time' => $time,
            // 'message' => 'Message sent successfully'
        ]);
    }


    public function fetchMessages($id)  //returns a json of all messages along to their users
    {

        // $marketplace = Marketplace::where('id',$id)->first();
        // $receiver_id = User::where('id',$marketplace->user_id)->first()->id;
        return Message::with('sender')->where('marketplace_id', $id)->get();
        // return Message::with('receiver')->where('receiver_id',$receiver_id)->get();
    }


    public function fetchChats()
    {
        $user_id = auth()->user()->id;
        $messages = Message::where('sender_id', $user_id)->orWhere()->get();
        dd($messages->count());

        $data = array();
        foreach ($messages as $message) {
            if ($message->receiver->kind != 'simpleUser') {
                $marketplace = Marketplace::where('user_id', $message->receiver_id)->first();
                array_push($data, $marketplace->name);
            } else {
                array_push($data, $message->receiver->name);
            }
        }

        // $marketplaces = Marketplace::where('id', $messages)->get();
        // dd($marketplaces);
        return response()->json([
            'status' => 200,
            'chats' => $data
        ]);
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
