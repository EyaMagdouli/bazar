<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function store (Request $request){

        $validator= Validator::make($request->all(),[
            'category_id'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
            'price'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
            ]);

        }
        else{
            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->slug = $request->input('slug');
            $product->price = $request->input('price');
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



    public function index(){
        $products = Product::all();
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
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
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
            'price'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
            ]);

        }
        else{
            $product = Product::finc($id);
            if($product){
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->slug = $request->input('slug');
            $product->price = $request->input('price');
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
