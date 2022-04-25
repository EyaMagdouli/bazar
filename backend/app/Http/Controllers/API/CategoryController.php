<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Marketplace;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        $market = Marketplace::where('user_id', $user_id)->first();
        $category = Category::where('marketplace_id', $market->id)->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
    public function store(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'slug' => 'required|max:191|unique:categories,slug',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);
        } else {

            $user_id = auth()->user()->id;
            $market = Marketplace::where('user_id', $user_id)->first();    // get marketplace info
            $category = new Category;
            $category->name =  $request->input('name');
            $category->slug =  $request->input('slug');
            $category->marketplace_id = $market->id;
            $category->description =  $request->input('description');
            $category->save();
            return response()->json([
                'status' => 200,

                'message' => 'Category added successfully'
            ]);
        }
    }
    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No category id found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        //     $validator = Validator::make($request->all(),[
        //         'name' => 'required|max:191',
        //         'slug' =>'required|max:191|unique:categories,slug'
        //    ]);

        //    if($validator->fails()){
        //        return response()->json([
        //            'status' =>422,
        //            'errors' =>$validator->errors()
        //        ]);
        //    }
        //    else {
        $category =  Category::find($id);
        if ($category) {

            $category->name =  $request->input('name');
            $category->slug =  $request->input('slug');
            $category->description =  $request->input('description');
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Category updated successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Category ID found '
            ]);
            //}
        }
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        $products = Product::where('id',$id);
        if ($category) {

            $category->delete();
            $products->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Category deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No category id found'
            ]);
        }
    }




    public function allCategories()
    {
        $user_id = auth()->user()->id;
        $market = Marketplace::where('user_id', $user_id)->first();
        $category = Category::where('marketplace_id', $market->id)->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
}
