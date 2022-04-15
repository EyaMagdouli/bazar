<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function index(){
        $category = Category::all();
        return response()->json([
            'status' =>200,
            'category'=> $category
        ]);
    }

    public function edit($id){
        $category = Category::find($id);
        if($category){
            return response()->json([
                'status'=>200,
                'category'=>$category
            ]);
        }
        else{
            return response()->json([
                'status'=>'404',
                'message'=>'No category id found'
            ]);
        }

    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:191',
            'slug' =>'required|max:191|unique:categories,slug'
       ]);

       if($validator->fails()){
           return response()->json([
               'status' =>422,
               'errors' =>$validator->errors()
           ]);
       }
       else {
       $category =  Category::find($id);
       if($category){

       $category->name =  $request->input('name');
       $category->slug =  $request->input('slug');
       $category->description =  $request->input('description');
       $category->save();
       return response()->json([
           'status' =>200,
           'message' =>'Category updated successfully'
       ]);
       }
       else{
        return response()->json([
            'status' =>404,
            'message' =>'No Category ID found '
        ]);
       }
   }

    }





    public function destroy($id){
        $category = Category::find($id);
        if($category){

            $category->delete(); //it will delete the data
            return response()->json([
                'status'=>200,
                'message'=>'Category deleted successfully',
            ]);
        }
        else {
            return response()->json([
                'status'=>'404',
                'message'=>'No category id found'
            ]);
        }

    }



    public function store(Request $request){


        $validator = Validator::make($request->all(),[
             'name' => 'required|max:191',
             'slug' =>'required|max:191|unique:categories,slug'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>400,
                'errors' =>$validator->errors()
            ]);
        }
        else {
        $category = new Category;
        $category->name =  $request->input('name');
        $category->slug =  $request->input('slug');
        $category->description =  $request->input('description');
        $category->save();
        return response()->json([
            'status' =>200,
            'message' =>'Category added successfully'
        ]);
        }




    }

    public function allCategories(){
        $category = Category::get();
        return response()->json([
        'status' =>200,
        'category'=> $category
    ]);
    }


}
