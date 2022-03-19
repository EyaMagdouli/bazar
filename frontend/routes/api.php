<?php

use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\ProductController;
use App\Models\Marketplace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
//Marketplace api routes
Route::resource('marketplaces',MarketplaceController::class);
Route::get('/marketplaces/search/{name}',[MarketplaceController::class,'search']);
/* Route::get('/marketplaces',[MarketplaceController::class,'index']);
Route::post('/marketplaces',[MarketplaceController::class,'store']); */


//**************/
//Product api routes
Route::resource('products',ProductController::class)->middleware('auth:sanctum');
Route::get('/products/search/{name}',[ProductController::class,'search'])->middleware('auth:sanctum');
/* Route::get('/products',[ProductController::class,'index']);
Route::post('/products',[ProductController::class,'store']); */







Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
