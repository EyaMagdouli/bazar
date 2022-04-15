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
    'image',
    'price'];


    public function category(){
        $this->belongsTo(Category::class);
    }

    public function marketplace(){
        $this->belongsTo(Marketplace::class);
    }
}
