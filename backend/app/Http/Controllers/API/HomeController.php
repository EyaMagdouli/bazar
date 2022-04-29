<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
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



    public function showMarket($id){
        $marketplace = Marketplace::where('id',$id)->get();
        //dd($marketplace);
        $products = Product::where('marketplace_id',$id)->get();
        if($marketplace){
            return response()->json([
                'status' => 200,
                'marketplace' => $marketplace,
                'products' => $products

            ]);

        }
    }


    public function productsByCat($id){
        $products = Product::where('category_id',$id)->get();
        return response()->json([
            'status' => 200,
            'productbycategory' => $products
        ]);
    }
}
