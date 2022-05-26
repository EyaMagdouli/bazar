<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Marketplace;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(){


        $user_id = auth()->user()->id;
        $market = Marketplace::where('user_id', $user_id)->first();
        $products = Product::where('marketplace_id', $market->id)->get();
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
    }
    public function store (Request $request){
        //dd(Marketplace::where('user_id',$request->user()->id)->firstOrFail());


        $validator= Validator::make($request->all(),[
            'category_id'=>'required|max:191',
            'name'=>'required|max:191',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
            'price'=>'required',
            'qty'=>'required',
            'qtyUnity'=>'required',
            'priceUnity'=>'required',
            'description' =>'required|max:2000'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
            ]);

        }
        else{

            $user_id = auth()->user()->id;

            // now we will fetch marketplace_id through user_id
            $market = Marketplace::where('user_id', $user_id)->first();    // get marketplace info
            //$marketplace_id = (!empty($market)) ? $market->id : 0; // her we get marketplace_id if not we assign 0
            //return response()->json($marketplace_id);


            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->marketplace_id =$market->id;
            $product->name = $request->input('name');
             $product->price = $request->input('price');
             $product->qty= $request->input('qty');
             $product->qtyUnity= $request->input('qtyUnity');
             $product->priceUnity= $request->input('priceUnity');
            $product->description = $request->input('description');

            //image
            if($request->hasFile('image')){
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName=  time().'.'.$extension;
            $file->move('uploads/product/',$fileName);
            $product->image='uploads/product/'.$fileName;
            }
            $product->save();
            return response()->json([
                'status'=>200,
                'message'=>'Product added successfully'
            ]);
        }

    }


    public function edit($id){
        $product = Product::find($id);
        if($product){
            return response()->json([
                'status'=>200,
                'product'=>$product
            ]);

        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>"No product found"
            ]);
        }
    }



    public function update(Request $request, $id){
        $validator= Validator::make($request->all(),[
            'category_id'=>'required|max:191',
            'name'=>'required|max:191',
            'price'=>'required',
            'qty'=>'required',
            'unity'=>'required',
            'description'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
            ]);

        }
        else{
            $product = Product::find($id);
            if($product){
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->price = $request->input('price');
            $product->qty = $request->input('qty');
            $product->unity = $request->input('unity');
            $product->description = $request->input('description');

            //image
            if($request->hasFile('image')){
                $path=$product->image;
                if(File::exists($path)){
                    File::delete($path);
                }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName=  time().'.'.$extension;
            $file->move('uploads/product/',$fileName);
            $product->image='uploads/product/'.$fileName;
            }
            $product->update();
            return response()->json([
                'status'=>200,
                'message'=>'Product updated successfully'
            ]);
        }

        else{

            return response()->json([
                'status'=>404,
                'message'=>'Product not found'
            ]);
        }
    }
}

public function destroy($id){
   $product = Product::find($id);
    if($product){

        $product->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Product deleted successfully',
        ]);
    }
    else {
        return response()->json([
            'status'=>404,
            'message'=>'No product id found'
        ]);
    }

}
}
