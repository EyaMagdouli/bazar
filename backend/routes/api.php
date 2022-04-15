<?php

use App\Models\Marketplace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\MarketplaceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//**************/
//register api routes
Route::post('register',[AuthController::class, 'register']);

//login api routes
Route::post('login',[AuthController::class, 'login']);

//logout
Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class, 'logout']);
});

//categories
Route::get('viewCategory',[CategoryController::class, 'index']);
Route::post('addCategory',[CategoryController::class, 'store']);
Route::get('editCategory/{id}',[CategoryController::class, 'edit']);
Route::put('updateCategory/{id}', [CategoryController::class, 'update']);
Route::delete('deleteCategory/{id}',[CategoryController::class, 'destroy']);


//products
Route::get('categories',[CategoryController::class, 'allCategories']);
Route::post('addProduct',[ProductController::class,'store']);











Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
