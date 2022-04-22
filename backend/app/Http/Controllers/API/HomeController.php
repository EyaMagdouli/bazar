<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function marketplaces(){
        $marketplaces = Marketplace::all();
        return response()->json([
            'status' => 200,
            'marketplaces'=> $marketplaces
        ]);
    }


    public function products(){
        $products = Product::all();
        return response()->json([
            'status'=>200,
            'products'=> $products
        ]);
    }
}
