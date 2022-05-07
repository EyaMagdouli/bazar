<?php

namespace App\Http\Controllers\API;

use App\Events\Message;
use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function message(Request $request)
    {

        event(new  Message($request->input('sender'), $request->input('message')));
        return [];
    }

    public function conversation($id)
    {
        $product = Product::find($id);
        $sender = User::where('id', auth()->user()->id)->first();
        $marketplace = Marketplace::where('id', $product->marketplace_id)->get();


        if ($product) {
            return response()->json([
                'status' => 200,
                'product' => $product,
                'sender' => $sender,
                'marketplace' => $marketplace
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No product found"
            ]);
        }
    }

    // public function (){

    // }
}
