<?php

use App\Models\Marketplace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\API\AuthController;
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




//**************/
//Marketplace api routes
Route::resource('marketplaces',MarketplaceController::class);
Route::get('/marketplaces/search/{name}',[MarketplaceController::class,'search']);



//**************/
//Product api routes
Route::resource('products',ProductController::class);
Route::get('/products/search/{name}',[ProductController::class,'search'])/* ->middleware('auth:sanctum') */;






Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
