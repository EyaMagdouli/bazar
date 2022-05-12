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

    public function index(){
        $category = Category::get();
        return response()->json([
        'status' =>200,
        'category'=> $category
    ]);
    }






}
