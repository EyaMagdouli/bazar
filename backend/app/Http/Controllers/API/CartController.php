<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Conversation;
use App\Models\Marketplace;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addtocart(Request $request){

        if(auth('sanctum')->check()){

            $user_id = auth()->user()->id;
            $product_id = $request->product_id;
            //$product_qty = $request->product_qty;


            $product= Product::where('id',$product_id)->first();
            if($product){

                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists()){
                    return response()->json([
                        'status'=>409,
                        'message'=>$product->name. ' already added to cart'
                    ]);
                }
                else {
                    $conversation = new Conversation;
                    $conversation->client_id = $user_id;
                    $conversation->marketplace_id = $product->marketplace_id;
                    $conversation->save();

                    $cartitem = new Cart;
                    $cartitem->user_id = $user_id;
                    $cartitem->product_id = $product_id;
                    $cartitem->conversation_id = $conversation->id;
                    //$cartitem->product_qty = $product_qty;
                    $cartitem->save();



                    return response()->json([
                        'status'=>201,
                        'message'=>'Added to cart'
                    ]);
                }

            return response()->json([
                'status'=>201,
                'message'=>'Added to cart'
            ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'Product not found'
                ]);

            }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'You have to be logged in first'
            ]);
        }
    }

    public function index(){
        if(auth('sanctum')->check()){
            $user_id = auth()->user()->id;
            $cartitems = Cart::where('user_id',$user_id)->get();



            $marketPlace = [];
            foreach($cartitems as $cartitem) {
                $marketPlace[$cartitem->product->marketplace->name][] = $cartitem;
            }

            return response()->json([
                'status'=>200,
                'cart' => array_values($marketPlace),
            ]);
            /* dd($cartitems); */

        }

    }
    public function delete($cart_id){
        if(auth('sanctum')->check()){
            $user_id = auth()->user()->id;
            $cartitem = Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            if($cartitem){
                $cartitem->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cart item removed Successfully'
                ]);
            }
            else {
                return response()->json([
                    'status'=>404,
                    'message'=>'Cart item not found'
                ]);
            }


        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'You have to be logged in first'
            ]);
        }
    }
}
