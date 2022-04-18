<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Marketplace;

class Product extends Model
{
    use HasFactory;

    protected $table ='products';
    protected $fillable =
    ['name',
    'slug',
    'category_id',
    'marketplace_id',
    'image',
    'price'];



    protected $with = ['category','marketplace']; //to use with js
    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }


    public function marketplace(){
        $this->belongsTo(Marketplace::class, 'marketplace_id', 'id');
    }
}
