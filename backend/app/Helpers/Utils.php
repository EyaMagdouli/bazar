<?php

use App\Models\Category;
use App\Models\Livreur;
use App\Models\Marketplace;
use App\Models\User;
use Illuminate\Support\Facades\DB;

function getColor($num) {
    $hash = md5('color' . $num); // modify 'color' to get a different palette
    return array(
        hexdec(substr($hash, 0, 2)), // r
        hexdec(substr($hash, 2, 2)), // g
        hexdec(substr($hash, 4, 2))); //b
}

function getMarketPlacesWithProduct() {
    $marketplacesFromDb = Marketplace::with('product')->whereHas('product')->get();
    $marketplaces = [];
    $products = [];
    foreach($marketplacesFromDb as $marketplace) {
        array_push($marketplaces, $marketplace->name);
        array_push($products, $marketplace->product->count());
    }
    return ['marketplaces' => $marketplaces, 'products' => $products];
}


function getCatgeoriesWithProduct(){
    $categoriesFromDb = Category::with('product')->whereHas('product')->get();
    $categories = [];
    $products = [];
    foreach($categoriesFromDb as $category) {
        array_push($categories, $category->name);
        array_push($products, $category->product->count());
    }

    return ['categories' => $categories, 'products' => $products];
}

function getLivreurs(){
    $months = [];
    $total = [];
    $livreurs = Livreur::select(DB::raw('count(*) as count'), DB::raw('month(`created_at`) as month'))->groupBy(DB::raw('month(`created_at`)'))->get();
    foreach($livreurs as $livreur) {

        $dateObj   = DateTime::createFromFormat('!m', $livreur->month);
        $monthName = $dateObj->format('F');
        array_push($months, $monthName);
        array_push($total, $livreur->count);
    }

    return ['months' => $months, 'total' => $total];
}
