<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\sendOrderMail;
use App\Models\Conversation;
use App\Models\Marketplace;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function order(Request $request, $id)
    {
        // $order = Order::where('conversation_id', $id)->first();
        $conversation = Conversation::find($id);
        $marketplace = Marketplace::where('id', $conversation->id)->first();
        // dd($conversation->client->email);

        $order = Order::create(
            [
                'conversation_id' => $id,
                'status' => $request['order']
            ]
        );
        if ($order) {

            if ($request['order'] == 'accept') {
                Mail::to($conversation->client->email)->send(new sendOrderMail($marketplace, $order));

                return response()->json([

                    'status' => 200,
                    'order' => $order,
                    'message' => 'order accepted '
                ]);
            }
            if ($request['order'] == 'decline') {

                Mail::to($conversation->client->email)->send(new sendOrderMail($marketplace, $order));

                return response()->json([
                    'status' => 200,
                    'order' => $order,
                    'message' => 'order declined '
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no conversation found'
            ]);
        }
    }
}
