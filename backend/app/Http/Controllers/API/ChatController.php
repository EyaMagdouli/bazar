<?php

namespace App\Http\Controllers\API;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
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

        $conversation = Conversation::findOrFail($id);
        if (auth()->user()->kind != 'simpleUser') {
            $receiver_id = $conversation->client_id;
        } else {
            $marketplace = Marketplace::where('id', $conversation->marketplace_id)->first();

            $receiver_id = $marketplace->user_id;
        }
        $message = Message::create(
            [
                'message' => $request->message,
                'conversation_id' => $id,
                'sender_id' => auth()->user()->id,
                'receiver_id' => $receiver_id
            ]
        );

        // event(new  MessageSent($request->input('sender'), $request->input('receiver'), $request->input('message')));
        return response()->json([
            'message' => [
                'sender' => $message->sender,
                'created_at' => $message->created_at,
                'message' => $message->message,
            ],
            'status' => 200,
        ]);


        // $sender = auth()->user();
        // $marketplace = Marketplace::where('id', $id)->first();

        // $receiver_id = $marketplace->user->id;
        // $receiver = User::where('id', $marketplace->user_id)->first();


        // event(new  MessageSent($request->input('sender'), $request->input('receiver'), $request->input('message')));
        // return response()->json([
        //     'message' => $message,
        //     'sender' => $sender,
        //     'marketplace' => $marketplace,
        //     'receiver' => $receiver,
        //     'status' => 200,
        // ]);
    }



    public function fetchMessages($id)
    {

        return Message::where('conversation_id', $id)->get();


        // if (auth()->user()->kind != 'simpleUser') {
        //     $conversation = Conversation::where([
        //         'marketplace_id' => auth()->user()->marketplace->id
        //     ])->get();

        //     $marketplace = Marketplace::where('user_id', auth()->user()->id)->first();
        //     $conversation = Conversation::where('marketplace_id', $marketplace->id)->get();
        // } else {
        //     $conversation = Conversation::where([
        //         'client_id' => auth()->user()->id
        //     ])->get();
        //     $conversation = Conversation::where('client_id', auth()->user()->id)->get();
        // }

        // return Message::where('conversation_id', $id)->get();

        // $marketplace = Marketplace::where('id',$id)->first();
        // $receiver_id = User::where('id',$marketplace->user_id)->first()->id;
        // return Message::with('sender')->where('marketplace_id', $id)->get();
        // return Message::with('receiver')->where('receiver_id',$receiver_id)->get();
    }


    public function fetchChats()
    {

        if (auth()->user()->kind != 'simpleUser') {
            $marketplace_id = Marketplace::where('user_id', auth()->user()->id)->first()->id;
            $chats = Conversation::where('marketplace_id', $marketplace_id)->get();
        } else {
            $chats = Conversation::where('client_id', auth()->user()->id)->get();
        }
        return response()->json([
            'status' => 200,
            'chats' => $chats
        ]);


        // $user_id = auth()->user()->id;
        // $messages = Message::where('sender_id', $user_id)->orWhere()->get();
        // dd($messages->count());

        // $data = array();
        // foreach ($messages as $message) {
        //     if ($message->receiver->kind != 'simpleUser') {
        //         $marketplace = Marketplace::where('user_id', $message->receiver_id)->first();
        //         array_push($data, $marketplace->name);
        //     } else {
        //         array_push($data, $message->receiver->name);
        //     }
        // }

        // $marketplaces = Marketplace::where('id', $messages)->get();
        // dd($marketplaces);

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
