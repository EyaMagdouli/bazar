<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ChartController;
use App\Http\Controllers\API\ChatController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\MarketplaceController;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PasswordController;
use App\Http\Controllers\API\UserController;


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
//register
Route::post('register',[AuthController::class, 'register']);

//login
Route::post('login',[AuthController::class, 'login']);

//logout
Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class, 'logout']);
});

//categories
Route::get('categories',[CategoryController::class,'index']);



//products
 Route::middleware('auth:sanctum')->get('viewProduct',[ProductController::class,'index']);
 Route::middleware('auth:sanctum')->post('addProduct',[ProductController::class,'store']);
 Route::get('editProduct/{id}',[ProductController::class,'edit']);
 Route::post('updateProduct/{id}',[ProductController::class,'update']);
 Route::delete('deleteProduct/{id}',[ProductController::class, 'destroy']);


//marketplace
 Route::middleware('auth:sanctum')->post('createMarket',[MarketplaceController::class,'create']);
 Route::middleware('auth:sanctum')->get('viewMarket',[MarketplaceController::class,'index']);
 Route::middleware('auth:sanctum')->get('editMarket',[MarketplaceController::class,'edit']);
 Route::middleware('auth:sanctum')->post('updateMarket',[MarketplaceController::class,'update']);






//home
Route::get('marketplaces',[HomeController::class,'marketplaces']);
Route::get('products',[HomeController::class,'products']);
Route::get('marketplace/{id}',[HomeController::class,'showMarket']);
Route::get('product/{id}',[HomeController::class,'showProduct']);
Route::get('productbycategory/{id}',[HomeController::class,'productsByCat']);


//profile
Route::get('profile',[UserController::class,'index']);
Route::middleware('auth:sanctum')->get('editProfile',[UserController::class, 'edit']);
Route::middleware('auth:sanctum')->post('updateProfile',[UserController::class, 'update']);


//cart
Route::middleware('auth:sanctum')->post('addToCart',[CartController::class,'addtocart']);
Route::get('cart',[CartController::class,'index']);
Route::middleware('auth:sanctum')->delete('deleteCartItem/{cart_id}', [CartController::class,'delete']);



//chat
Route::middleware('auth:sanctum')->post('sendMessages/{id}',[ChatController::class,'sendMessage']);
Route::middleware('auth:sanctum')->get('chats',[ChatController::class,'fetchChats']);
Route::middleware('auth:sanctum')->get('messages/{id}',[ChatController::class,'fetchMessages']);

//order
Route::middleware('auth:sanctum')->post('order/{id}',[OrderController::class,'order']);


//charts
Route::middleware('auth:sanctum')->get('chart',[ChartController::class, 'index']);

//search
Route::get('searchProduct/{key}',[ProductController::class, 'search']);
Route::get('searchMarketplace/{key}',[MarketplaceController::class, 'search']);


//password
Route::post('forgot',[PasswordController::class, 'forgot']);
Route::post('reset',[PasswordController::class, 'reset']);
