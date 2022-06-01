<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Marketplace;
use App\Models\Product;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function index(){
        $user_id = auth()->user()->id;
        $marketplace = Marketplace::where('user_id',$user_id)->first();
        $products = Product::where('marketplace_id',$marketplace->id)->count();

        $conversations = Conversation::where('marketplace_id', $marketplace->id)->count();
        return response()->json([
            'status'=>200,
            'products'=>$products,
            'conversations' => $conversations,
        ]);
    }
}
