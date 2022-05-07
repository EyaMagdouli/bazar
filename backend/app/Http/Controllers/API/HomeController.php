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

    public function showProduct($id){
        $product = Product::where('id',$id)->get();
        //dd($marketplace);
        if($product){
            return response()->json([
                'status' => 200,
                'product' => $product

            ]);

        }
    }


    public function productsByCat($id){
        $products = Product::where('category_id',$id)->get();

        if($products){
            return response()->json([
                'status' => 200,
                'productbycategory' => $products
            ]);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => 'No products available in this category yet'
            ]);

        }

    }
}
